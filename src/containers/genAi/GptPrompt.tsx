import { useEffect, useRef, useState } from "react";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import textIcon from "@/assets/icons/textIcon.png";
import faqIcon from "@/assets/icons/faq.png";
import cwyfIcon from "@/assets/icons/cwyf.png";
import imgTxtIcon from "@/assets/icons/imgTxt.png";
import share from "@/assets/icons/share.png";
import { PiFileImage } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import {
  conversationType,
  gptPromptMultiResponseType,
  threadDataType,
} from "./type";
import ReactMarkdown from "react-markdown";
import UploadFileModal from "./UploadFileModal";
import userLogo from "@/assets/user2.png";
import logo from "@/assets/logo.png";
import Gallery from "./Gallery/Gallery";
import Drafts from "./Drafts";
import useHandleAllLogAiAPI from "@/components/hooks/logAi/handleAllLogAi";
import useGptMultiApi from "@/components/hooks/genaiservices/gptPrompt/useGptMultiApi";
import { successAlert } from "@/components/appComponents/appAlert";

const url = "https://genaiservices-be.datapartners.ch";

export default function GptPrompt(props: {
  openedThread?: threadDataType | undefined;
  setOpenedThread?: React.Dispatch<
    React.SetStateAction<threadDataType | undefined>
  >;
  handleNewThread?: (file: File | null, service: string) => void;
  threadArray?: threadDataType[] | undefined;
  setThreadArray?: React.Dispatch<
    React.SetStateAction<threadDataType[] | undefined>
  >;
  updateThreadArray?: (
    id: string,
    question: string,
    answer: string,
    service: string,
    fileUrl?: string
  ) => void;
  isUploadModalOpen?: boolean;
  setIsUploadModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFile?: File | undefined;
  setUploadedFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
}) {
  const {
    openedThread,
    setOpenedThread,
    handleNewThread,
    threadArray,
    setThreadArray,
    updateThreadArray,
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadedFile,
    setUploadedFile,
  } = props;
  const accessToken = sessionStorage.getItem("AccessToken");
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [conversation, setConversation] = useState<conversationType>([
    { id: 0, question: "", answer: "", image_name: "" },
  ]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [showOtherDrafts, setShowOtherDrafts] = useState<boolean>(false);
  const [gptMultiResponses, setGptMultiResponse] =
    useState<gptPromptMultiResponseType>();
  // const [flag,setFlag] = useState<boolean>(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const { fetchGptMultiRes, gptMultiRes } = useGptMultiApi();
  // const { handleAllLogAiApi } = useHandleAllLogAiAPI();
  const { handleAllLogAiApi } = useHandleAllLogAiAPI();

  useEffect(() => {
    console.log(openedThread);
    if (openedThread && openedThread.data) {
      const newConversation: conversationType = openedThread.data.map(
        (item) => ({
          id: item.id || 0,
          question: item.question || "",
          answer: item.answer || "",
          image_name: item.image_name || "",
          // created_at: item.created_at || "",
        })
      );
      setConversation(newConversation);
    }
  }, [openedThread]);

  useEffect(() => {
    scrollToBottom();
    const length = conversation?.length;
    if (length) {
      if (conversation[length - 1].answer !== '"Loading..."') {
        setUserQuestion("");
      }
    }
  }, [conversation]);

  useEffect(() => {
    if (gptMultiRes) {
      setGptMultiResponse(gptMultiRes);
    }
  }, [gptMultiRes]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    scrollToBottom();
    e.preventDefault();

    setActiveReaction(null);

    const threadId = openedThread?._id;
    if (userQuestion.trim() !== "") {
      setConversation((prev) => {
        console.log(prev);
        if (prev) {
          return [
            ...prev,
            {
              id: prev.length,
              question: userQuestion,
              answer: "Loading...",
              image_name: "",
            },
          ];
        } else {
          return [
            {
              id: 0,
              question: userQuestion,
              answer: "Loading...",
              image_name: "",
            },
          ];
        }
      });
      const res = await fetch(
        `${url}/prop/?prop=${userQuestion}&tid=${threadId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: accessToken as string,
          },
        }
      );
      const resData = await res.json();
      console.log(resData);

      const parsedRes = await resData?.response;

      if (parsedRes) {
        const formatedText = parsedRes.answer;
        console.log("updateThreadArray called from handleSubmit *********");

        updateThreadArray &&
          updateThreadArray(
            resData.id,
            userQuestion,
            resData.response.answer,
            "propchat"
          );

        setConversation((prev) => {
          console.log(prev);
          return prev.map((item) => {
            return {
              ...item,
              answer: formatedText,
              created_at: new Date().toISOString(),
            };
          });
        });

        console.log(parsedRes);

        fetchGptMultiRes(resData.id as string, userQuestion as string);

        handleAllLogAiApi({
          question: userQuestion,
          answer: parsedRes.answer,
          step: "GENAI_GPT",
          fileName: "",
          fileSize: 0,
          reaction: "",
          tokensIn: "",
          tokensOut: "",
          wordsIn: `${userQuestion.length}`,
          wordsOut: resData.response.answer.length,
        });
      } else {
        alert("console");
        console.log(parsedRes);
      }
    }
  };

  function handleCreateNewThread(serviceType: string) {
    console.log("handleCreateNewThread runs", serviceType);
    setShowOtherDrafts(false);

    if (handleNewThread) handleNewThread(null, serviceType);

    if (setOpenedThread)
      setOpenedThread({
        _id: "",
        service: serviceType,
      });

    if (
      serviceType === "image_to_text" ||
      serviceType === "faq" ||
      serviceType === "cwyf"
    )
      setIsUploadModalOpen && setIsUploadModalOpen(true);
    else
      setConversation([{ id: +"", question: "", answer: "", image_name: "" }]);
  }

  const handleDraftsSelection = (question: string, response: string) => {
    console.log(response);
    setConversation((prevConversation) => {
      const updatedConversation = [...prevConversation];
      updatedConversation[updatedConversation.length - 1].answer = response;
      return updatedConversation;
    });

    setThreadArray &&
      setThreadArray((prev) => {
        return prev
          ? prev.map((thread) => {
              if (openedThread) {
                if (thread._id === openedThread._id) {
                  const updatedData = thread.data ? [...thread.data] : [];
                  if (updatedData.length > 0) {
                    updatedData[updatedData.length - 1] = {
                      ...updatedData[updatedData.length - 1],
                      answer: response,
                    };
                  }
                  return {
                    ...thread,
                    data: updatedData,
                  };
                }
              }
              return thread;
            })
          : [];
      });

    handleUpdateGptResponse(question, response);
    // debouncedHandleUpdateGptResponse(question, response);
  };

  async function handleUpdateGptResponse(
    question: string,
    selectedResponse: string,
    reaction?: string
  ) {
    try {
      const response = await fetch(`${url}/prop_update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: accessToken as string,
        },
        body: JSON.stringify({
          tid: openedThread && openedThread._id,
          question: question,
          answer: selectedResponse,
          reaction: reaction ?? "",
        }),
      });
      const res = await response.json();
      console.log(res);

      handleAllLogAiApi({
        question: userQuestion,
        answer: selectedResponse,
        step: "GENAI_GPT",
        fileName: "",
        fileSize: 0,
        reaction: reaction ?? "",
        tokensIn: "",
        tokensOut: "",
        wordsIn: `${userQuestion.length}`,
        wordsOut: `${selectedResponse.length}`,
      });
    } catch (error) {
      console.log("Error updating response:", error);
    }
  }

  const handleCopyBtnClick = (answer: string) => {
    navigator.clipboard
      .writeText(answer)
      .then(() => {
        successAlert(1000, "Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  function handleUpateReactions(reaction: string) {
    if (reaction === "OK") setActiveReaction("upvote");
    else setActiveReaction("downvote");

    handleAllLogAiApi({
      question: userQuestion ?? conversation[conversation.length - 1].question,
      answer: conversation[conversation.length - 1].answer,
      step: "GENAI_GPT",
      fileName: "",
      fileSize: 0,
      reaction: `${reaction === "OK" ? "OK" : "KO"}`,
      tokensIn: "",
      tokensOut: "",
      wordsIn: `${
        userQuestion.length ??
        conversation[conversation.length - 1].question.length
      }`,
      wordsOut: conversation[conversation.length - 1].answer.length.toString(),
    });
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      {showGallery ? (
        <Gallery
          setShowGallery={setShowGallery}
          activeServiceType="propchat"
          threadArray={threadArray}
          // uploadedFileDetails={uploadedFileDetails}
        />
      ) : (
        <>
          {!conversation ? (
            <div className="py-4 px-5 text-text-blue">
              <p className="text-lg font-semibold">Gpt Prompt</p>
              <p>
                Ask our chatbot anything by typing your question in the space
                below.
              </p>
            </div>
          ) : (
            <div
              style={{ width: "85%", margin: "auto" }}
              className="grow py-1 px-2 overflow-auto text-ellipsis flex"
            >
              <div className="p-2 mt-auto w-full">
                <div
                  className="flex justify-between fixed top-20 right-0"
                  style={{ width: "82%" }}
                >
                  <button
                    onClick={() => setShowGallery(true)}
                    // disabled={showGalleryBtn}
                    className="ml-auto mr-2 bg-slate-400 disabled:bg-slate-100 rounded-lg h-8 w-8 p-2 cursor-pointer"
                  >
                    <img src={share} alt="" className="h-full w-full" />
                  </button>
                </div>
                {conversation.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    {item.question && (
                      <>
                        <div className={`flex items-center mt-4 gap-2 my-3`}>
                          <div className="h-8 w-8">
                            <img
                              src={userLogo}
                              alt=""
                              className="h-full w-full"
                            />
                          </div>
                          <div className="text-lg font-semibold">User</div>
                        </div>
                        <div className="self-start px-2 py-1 my-2 bg-blue-600 border rounded-md text-white">
                          {item.question}
                        </div>
                      </>
                    )}

                    {index === conversation.length - 1 &&
                      gptMultiResponses &&
                      threadArray &&
                      threadArray[0].data &&
                      threadArray[0].data[0].question !== "New Thread" && (
                        <div className="">
                          <button
                            onClick={() => setShowOtherDrafts(!showOtherDrafts)}
                            className="flex items-center gap-2 ml-auto mb-3"
                          >
                            {!showOtherDrafts ? "Show drafts" : "Hide drafts"}
                            <FaChevronDown
                              size={15}
                              className={`text-red-600 transform transition-transform duration-300 ${
                                showOtherDrafts ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {showOtherDrafts && (
                            <div className="flex gap-1 sm:gap-4 sm:px-8">
                              {["gemini_res", "groq_res", "duck_res"].map(
                                (res, index) => {
                                  const label = `Draft ${index + 1}`;
                                  const response =
                                    gptMultiResponses.response[
                                      res as keyof typeof gptMultiResponses.response
                                    ];
                                  const isSelected =
                                    conversation[conversation.length - 1]
                                      .answer === response;

                                  return (
                                    <Drafts
                                      key={index}
                                      response={response}
                                      label={label}
                                      isSelected={isSelected}
                                      onClick={() =>
                                        handleDraftsSelection(
                                          conversation[conversation.length - 1]
                                            .question,
                                          gptMultiResponses.response[
                                            res as keyof typeof gptMultiResponses.response
                                          ]
                                        )
                                      }
                                    />
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      )}

                    {item.answer && (
                      <>
                        {/* <div className="flex justify-between"> */}
                        <div className="flex items-center gap-2 my-3">
                          <div className="h-8 w-8">
                            <img src={logo} alt="" className="h-full w-full" />
                          </div>
                          <div className="text-lg font-semibold">
                            GenAI Space
                          </div>
                        </div>
                        {/* </div> */}
                        <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 border border-border-light-gray rounded-md mr-8">
                          <ReactMarkdown children={item.answer}></ReactMarkdown>
                        </div>
                        <button
                          className="h-10 w-10 mt-2 flex justify-center bg-gray-200 hover:bg-red-200 rounded-full p-2"
                          onClick={() =>
                            handleCopyBtnClick(item.answer as string)
                          }
                        >
                          <FaRegCopy size={18} className="text-red-600 mt-1" />
                        </button>
                      </>
                    )}
                    <div ref={scrollContainerRef}></div>

                    {index === conversation.length - 1 &&
                      conversation[conversation.length - 1].answer &&
                      conversation[conversation.length - 1].answer !==
                        "Loading..." && (
                        <div className="flex gap-6 ml-2 mt-4">
                          <button
                            // ref={upvoteRef}
                            onClick={() => handleUpateReactions("OK")}
                          >
                            <BiSolidLike
                              size={20}
                              className={
                                activeReaction === "upvote"
                                  ? "text-red-500"
                                  : ""
                              }
                            />
                          </button>
                          <button
                            // ref={downvoteRef}
                            onClick={() => handleUpateReactions("KO")}
                          >
                            <BiSolidDislike
                              size={20}
                              className={
                                activeReaction === "downvote"
                                  ? "text-red-500"
                                  : ""
                              }
                            />
                          </button>
                        </div>
                      )}
                  </div>
                  // </div>
                ))}
              </div>
            </div>
          )}

          <form className="mt-auto" onSubmit={(e) => handleSubmit(e)}>
            <div className="flex justify-center gap-6 rounded-b-xl overflow-hidden p-2 h-16 box-border pb-4">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    className="IconButton border-none outline-none"
                    aria-label="Customise options"
                  >
                    <FaPlus
                      className="m-auto bg-gray-300 rounded-full p-2 cursor-pointer"
                      size={30}
                    />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-fit"
                    side="top"
                    align="center"
                    sideOffset={5}
                  >
                    <DropdownMenu.Item
                      onClick={() => handleCreateNewThread("propchat")}
                      className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={textIcon} alt="" className="h-6" />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => handleCreateNewThread("faq")}
                      className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={faqIcon} alt="" className="h-6" />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => handleCreateNewThread("cwyf")}
                      className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={cwyfIcon} alt="" className="h-6" />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => handleCreateNewThread("image_to_text")}
                      className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={imgTxtIcon} alt="" className="h-7" />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => handleCreateNewThread("text_to_image")}
                      className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    >
                      <PiFileImage size={23} className="ml-1" />
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              {/* </div> */}

              <div className="w-4/5 h-full flex">
                <input
                  type="text"
                  placeholder="Ask Me Anything"
                  className="bg-bg-input-gray dark:bg-neutral-600 h-full w-5/6 rounded-l-md p-1 px-2 focus:outline-0"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                />
                <button
                  className="bg-bg-input-gray dark:bg-neutral-600 w-1/6 h-full rounded-r-md px-2"
                  type="submit"
                >
                  <div className="text-text-red flex justify-end">
                    <IoArrowUpCircleSharp size={25} />
                  </div>
                </button>
              </div>
            </div>
          </form>
        </>
      )}

      {isUploadModalOpen && (
        <UploadFileModal
          isOpen={isUploadModalOpen}
          setIsOpen={setIsUploadModalOpen}
          file={uploadedFile}
          setFile={setUploadedFile}
          serviceType="propchat"
          setConversation={setConversation}
          setOpenedThread={setOpenedThread}
          updateThreadArray={updateThreadArray}
        />
      )}
    </div>
  );
}
