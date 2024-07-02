import { useEffect, useRef, useState } from "react";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import textIcon from "@/assets/icons/textIcon.png";
import faqIcon from "@/assets/icons/faq.png";
import cwyfIcon from "@/assets/icons/cwyf.png";
import imgTxtIcon from "@/assets/icons/imgTxt.png";
import { PiFileImage } from "react-icons/pi";
import { BsDownload } from "react-icons/bs";
import share from "@/assets/icons/share.png";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { conversationType, threadDataType } from "./type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import userLogo from "@/assets/user2.png";
import logo from "@/assets/logo.png";
import Gallery from "./Gallery/Gallery";
import useHandleAllLogAiAPI from "@/components/hooks/logAi/handleAllLogAi";
import useDownloadImgApi from "@/components/hooks/genaiservices/txtToImg/useDownloadImgApi";
import NewLoader from "@/components/appComponents/NewLoader";

const url = "https://genaiservices-be.datapartners.ch";

export default function TextToImg(props: {
  openedThread: threadDataType;
  setOpenedThread?: React.Dispatch<
    React.SetStateAction<threadDataType | undefined>
  >;
  handleNewThread?: (file: File | null, service: string) => void;
  setIsUploadModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  threadArray: threadDataType[] | undefined;
  updateThreadArray: (
    id: string,
    question: string,
    answer: string,
    service: string,
    fileUrl?: string
  ) => void;
}) {
  const {
    openedThread,
    setOpenedThread,
    handleNewThread,
    setIsUploadModalOpen,
    threadArray,
    updateThreadArray,
  } = props;
  const accessToken = sessionStorage.getItem("AccessToken");
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [conversation, setConversation] = useState<conversationType>([
    { id: 0, question: "", answer: "", image_name: "", created_at: "" },
  ]);
  const [isInputFieldDisable, setIsInputFieldDisable] =
    useState<boolean>(false);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [textToImageInput, setTextToImageInput] = useState({
    model: "",
    quality: "",
  });
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const [flag, setFlag] = useState<boolean>(false);

  const { isDownloadImgLoading, handleImageDownload } = useDownloadImgApi();
  const { handleAllLogAiApi } = useHandleAllLogAiAPI();

  useEffect(() => {
    scrollToBottom();
    const length = conversation?.length;
    if (length && conversation[length - 1]?.answer !== '"Loading..."') {
      setUserQuestion("");
    }
  }, [conversation]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    console.log(openedThread);
    if (openedThread?.data) {
      const newConversation: conversationType = openedThread.data.map(
        (item, index) => ({
          id: index,
          question: item.prop ?? item.question ?? "",
          answer: item.image_url ?? item.answer ?? "",
          image_name: "",
          created_at: item.created_at ?? openedThread.created_at,
        })
      );
      setConversation(newConversation);
    }
  }, [openedThread]);

  function formatDate(inputDate: string) {
    // Parse the input date string
    const date = new Date(inputDate);
    const today = new Date();

    // Check if the date is today
    if (date.toDateString() === today.toDateString()) {
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `Oggi alle ${hours}:${minutes}`;
    }

    // Get day, month, year, and time
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    // Format the date
    const formattedDate = `${day} ${month}, ${year} ${hours}:${minutes}`;

    // console.log("formattedDate", formattedDate);
    return formattedDate;
  }

  const handleGenerateImageFromText = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("handleGenerateImageFromText runs");

    const { model, quality } = textToImageInput;
    const modelQuery = model.toLowerCase().replace(/\s/g, "-");

    if (!model || !quality) {
      alert("Please select model and quality!");
      return;
    }
    if (!userQuestion) {
      alert("Please provide the question!");
      return;
    }

    setIsInputFieldDisable(true);
    setFlag(true);

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
            created_at: new Date().toISOString(),
          },
        ];
      } else {
        return [
          {
            id: 0,
            question: userQuestion,
            answer: "Loading...",
            image_name: "",
            created_at: new Date().toISOString(),
          },
        ];
      }
    });

    const threadId = openedThread?._id;

    try {
      const res = await fetch(
        `${url}/generate/text_to_img/?prompt=${userQuestion}&model=${modelQuery}&quality=${quality.toLowerCase()}&tid=${threadId}`,
        {
          method: "GET",
          headers: {
            Authorization: accessToken as string,
          },
        }
      );

      const response = await res.json();
      console.log(response);

      updateThreadArray(
        response.id,
        userQuestion,
        response.response.image_url,
        "text_to_image"
      );

      // setConversation((prev) => {
      //   console.log(prev);
      //   if (prev && prev.length > 0) {
      //     return [
      //       ...prev,
      //       {
      //         id: prev.length,
      //         question: userQuestion,
      //         answer: response.response?.image_url,
      //         image_name: "",
      //       },
      //     ];
      //   } else {
      //     return [
      //       {
      //         id: 0,
      //         question: userQuestion,
      //         answer: response.response?.image_url,
      //         image_name: "",
      //       },
      //     ];
      //   }
      // });

      setConversation((prev) => {
        console.log(prev);
        return prev.map((item) => {
          console.log(`item.id = ${item.id} and prev.length = ${prev.length}`);
          if (+item.id === prev.length - 1)
            return {
              ...item,
              answer: response.response?.image_url,
              created_at: new Date().toISOString(),
            };
          else return item;
        });
      });

      handleAllLogAiApi({
        question: response.response.prop,
        answer: response.response?.image_url,
        step: "GENAI_TXT2IMG",
        fileName: "",
        fileSize: 0,
        reaction: "",
        tokensIn: "",
        tokensOut: "",
        wordsIn: response.response.prop.length,
        wordsOut: "",
      });
    } catch (error) {
      console.log("Error generating image from text:", error);
    } finally {
      setIsInputFieldDisable(false);
    }
  };

  function handleCreateNewThread(serviceType: string) {
    console.log("handleCreateNewThread runs", serviceType);
    if (handleNewThread) handleNewThread(null, serviceType);

    if (setOpenedThread)
      setOpenedThread({
        _id: "",
        created_at: new Date().toISOString(),
        service: serviceType,
      });

    if (
      serviceType === "image_to_text" ||
      serviceType === "faq" ||
      serviceType === "cwyf"
    )
      setIsUploadModalOpen && setIsUploadModalOpen(true);
    else
      setConversation([
        { id: +"", question: "", answer: "", image_name: "", created_at: "" },
      ]);
  }

  function handleUpateReactions(reaction: string) {
    if (reaction === "OK") setActiveReaction("upvote");
    else setActiveReaction("downvote");

    handleAllLogAiApi({
      question: userQuestion ?? conversation[conversation.length - 1].question,
      answer: conversation[conversation.length - 1].answer,
      step: "GENAI_TXT2IMG",
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
          activeServiceType="text_to_image"
          threadArray={threadArray}
          // uploadedFileDetails={uploadedFileDetails}
        />
      ) : (
        <>
          <div
            style={{ minWidth: "85%", margin: "auto" }}
            className="grow py-1 px-2 overflow-auto text-ellipsis flex"
          >
            <div className="p-2 mt-auto relative w-full">
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
              {conversation &&
                conversation.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    {item.question && (
                      <>
                        <div className="flex items-center justify-between sm:justify-normal sm:gap-20">
                          <div className={`flex items-center mt-4 gap-2 my-3`}>
                            <div className="h-8 w-8">
                              <img
                                src={userLogo}
                                alt=""
                                className="h-full w-full"
                              />
                            </div>
                            <div className="text-md sm:text-lg font-semibold">
                              User
                            </div>
                          </div>
                          <p className="text-sm sm:text-base">
                            {item.created_at
                              ? formatDate(item.created_at)
                              : formatDate(openedThread?.created_at)}
                          </p>
                        </div>
                        <div className="self-start px-2 py-1 my-2 bg-blue-600 border rounded-md text-white">
                          {item.question}
                        </div>
                      </>
                    )}
                    {item.answer && (
                      <>
                        <div className="flex items-center justify-between sm:justify-normal sm:gap-20">
                          <div className="flex items-center gap-2 my-3">
                            <div className="h-8 w-8">
                              <img
                                src={logo}
                                alt=""
                                className="h-full w-full"
                              />
                            </div>
                            <div className="text-md sm:text-lg font-semibold">
                              GenAI Space
                            </div>
                          </div>
                          <p className="text-sm sm:text-base">
                            {item.created_at
                              ? formatDate(item.created_at)
                              : formatDate(openedThread?.created_at)}
                          </p>
                        </div>

                        <div className="min-h-[200px] w-full">
                          {item.answer.startsWith("http") ? (
                            <img
                              src={item.answer}
                              alt="Image"
                              className="mb-3 ml-3 h-auto w-5/6 sm:w-80"
                            />
                          ) : (
                            <p>{item.answer}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleImageDownload(item.answer)}
                          className="h-10 w-10 ml-3 flex justify-center items-center bg-gray-200 hover:bg-red-200 rounded-full p-2"
                        >
                          <BsDownload size={20} className="text-red-600" />
                        </button>
                      </>
                    )}
                    <div ref={scrollContainerRef}></div>

                    {index === conversation.length - 1 &&
                      conversation[conversation.length - 1].answer &&
                      conversation[conversation.length - 1].answer !==
                        "Loading..." &&
                      flag && (
                        <div className="flex gap-6 ml-4 mt-4">
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
                ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <div className="w-32">
              <Select
                onValueChange={(e: string) =>
                  setTextToImageInput((prev) => ({
                    ...prev,
                    model: e,
                  }))
                }
                value={textToImageInput.model}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>

                <SelectContent id="model">
                  {["Dall E 2", "Dall E 3"]?.map((item, idx) => {
                    return (
                      <SelectItem value={item} key={idx}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="w-32">
              <Select
                onValueChange={(e: string) =>
                  setTextToImageInput((prev) => ({
                    ...prev,
                    quality: e,
                  }))
                }
                value={textToImageInput.quality}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>

                <SelectContent id="quality">
                  {["HD", "Standard"]?.map((item, idx) => {
                    return (
                      <SelectItem value={item} key={idx}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <form onSubmit={(e) => handleGenerateImageFromText(e)}>
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
              <div className="w-4/5 h-full flex">
                <input
                  type="text"
                  placeholder="Ask Me Anything"
                  className="bg-bg-input-gray dark:bg-neutral-600 h-full w-5/6 rounded-l-md p-1 px-2 focus:outline-0"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  disabled={isInputFieldDisable}
                />
                <button
                  className="bg-bg-input-gray dark:bg-neutral-600 w-1/6 h-full rounded-r-md px-2"
                  type="submit"
                >
                  <div className="text-text-red">
                    <IoArrowUpCircleSharp size={25} />
                  </div>
                </button>
              </div>
            </div>
          </form>
        </>
      )}

      {isDownloadImgLoading && <NewLoader />}
    </div>
  );
}
