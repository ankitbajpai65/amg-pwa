// import useHandleAllLogAiAPI from "@/components/hooks/logAi/handleAllLogAi";
import { useEffect, useRef, useState } from "react";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import textIcon from "@/assets/icons/textIcon.png";
import faqIcon from "@/assets/icons/faq.png";
import cwyfIcon from "@/assets/icons/cwyf.png";
import imgTxtIcon from "@/assets/icons/imgTxt.png";
import pdfIcon from "@/assets/icons/pdfIcon.png";
import { PiFileImage } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
import share from "@/assets/icons/share.png";
import { conversationType, threadDataType } from "./type";
import ReactMarkdown from "react-markdown";
import UploadFileModal from "./UploadFileModal";
import userLogo from "@/assets/user.png";
import logo from "@/assets/loghi-03.png";
import Gallery from "./Gallery/Gallery";
import { successAlert } from "@/components/appComponents/appAlert";

const url = "https://genaiservices-be.datapartners.ch";

export default function Cwyf(props: {
  openedThread?: threadDataType;
  setOpenedThread?: React.Dispatch<
    React.SetStateAction<threadDataType | undefined>
  >;
  handleNewThread?: (file: File | null, service: string) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFile: File | undefined;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
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
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadedFile,
    setUploadedFile,
    threadArray,
    updateThreadArray,
  } = props;
  const accessToken = localStorage.getItem("AccessToken");
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "", image_name: "" },
  ]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [uploadedFileId, setUploadFileId] = useState<string>("");

  console.log("cwyf renders");
  // const { handleAllLogAiApi } = useHandleAllLogAiAPI();

  useEffect(() => {
    console.log(openedThread);
    if (openedThread?.data) {
      if (openedThread.data.length > 0 && openedThread.data[0].qa) {
        const newConversation: conversationType = openedThread.data[0].qa.map(
          (item, index) => ({
            id: index,
            question: item.question,
            answer: item.answer,
            image_name: "",
            // created_at: "",
          })
        );
        setConversation(newConversation);
      } else {
        const newConversation: conversationType = openedThread.data.map(
          (item, index) => ({
            id: item.id || index,
            question: item.question || "",
            answer: item.answer || "",
            image_name: item.image_name || "",
            // created_at: item.created_at || "",
          })
        );
        setConversation(newConversation);
      }
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

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  async function handleChatWithFile(
    e: React.FormEvent<HTMLFormElement>,
    threadId: string
  ) {
    e.preventDefault();
    threadId = threadId || openedThread?._id || "";

    const sanitizedQuestion = userQuestion.trim();

    if (!sanitizedQuestion) return;

    if (userQuestion.trim() !== "") {
      setConversation((prev) => {
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
      });
    }

    try {
      const queryResponse = await fetch(
        `${url}/generate/load_qa_pdf_chat/?tid=${threadId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: accessToken as string,
          },
          body: JSON.stringify({ question: sanitizedQuestion }),
        }
      );

      const queryData = await queryResponse.json();
      console.log("queryData", queryData);

      updateThreadArray(
        threadId,
        userQuestion,
        queryData?.answer.output_text,
        "cwyf"
      );

      setConversation((prev) => {
        console.log(prev);
        return prev.map((item) => {
          if (+item.id === conversation.length) {
            return {
              ...item,
              answer: queryData?.answer?.output_text,
              created_at: new Date().toISOString(),
            };
          }
          return item;
        });
      });

      // handleAllLogAiApi({
      //   question: userQuestion,
      //   answer: queryData?.answer.output_text,
      //   step: "GENAI_CHATFILE",
      //   fileName: uploadedFile?.name ?? "",
      //   fileSize: uploadedFile?.size ?? 0,
      //   reaction: "",
      //   tokensIn: "",
      //   tokensOut: "",
      //   wordsIn: `${userQuestion.length}`,
      //   wordsOut: queryData?.answer.output_text.length,
      // });
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  }

  function handleCreateNewThread(serviceType: string) {
    console.log("handleCreateNewThread runs", serviceType);
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

  function handleOpenFile() {
    if (openedThread && openedThread.data) {
      const a = document.createElement("a");
      a.href = openedThread.data[0].file_path ?? "";
      // a.setAttribute("href",openedThread.data[0].file_path);
      a.setAttribute("target", "_blank");

      a.click();
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

  return (
    <div className="flex flex-col h-full overflow-auto">
      {showGallery ? (
        <Gallery
          setShowGallery={setShowGallery}
          activeServiceType="cwyf"
          threadArray={threadArray}
          // uploadedFileDetails={uploadedFileDetails}
        />
      ) : (
        <>
          {!conversation ? (
            <div className="py-4 px-5 text-text-blue">
              <p className="text-lg font-semibold">Chat with yout files</p>
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
              <div className="p-2 mt-auto">
                {conversation.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    {item.question && (
                      <>
                        <div className={`flex items-center mt-4 gap-1`}>
                          <div className="h-14 w-14">
                            <img
                              src={userLogo}
                              alt=""
                              className="h-full w-full"
                            />
                          </div>
                          <div className="text-lg font-semibold">User</div>
                        </div>
                        {index === 0 && (
                          <div
                            onClick={handleOpenFile}
                            className="h-48 w-64 sm:h-56 sm:w-72 bg-gray-200 border hover:border-gray-500 flex justify-center items-center rounded-xl mt-1 mb-2 ml-3 cursor-pointer"
                          >
                            <img src={pdfIcon} alt="pdfIcon" className="h-10" />
                          </div>
                        )}
                        <div className="self-start px-2 py-1 my-2 bg-blue-600 border rounded-md text-white">
                          {item.question}
                        </div>
                      </>
                    )}
                    {item.answer && (
                      <>
                        {/* <div className="flex justify-between"> */}
                        <div className="flex items-center gap-0.25">
                          <div className="h-14 w-14">
                            <img src={logo} alt="" className="h-full w-full" />
                          </div>
                          <div className="text-lg font-semibold mt-2">
                            GenAI Space
                          </div>
                        </div>
                        {/* </div> */}
                        <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 border border-border-light-gray rounded-md mr-8">
                          <ReactMarkdown children={item.answer}></ReactMarkdown>
                        </div>
                        <button
                          className="h-10 w-10 mt-2 flex justify-center items-center bg-gray-200 hover:bg-red-200 rounded-full p-2"
                          onClick={() =>
                            handleCopyBtnClick(item.answer as string)
                          }
                        >
                          <FaRegCopy size={18} className="text-red-600"/>
                        </button>
                      </>
                    )}
                    <div ref={scrollContainerRef}></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={(e) => handleChatWithFile(e, uploadedFileId)}>
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

      {isUploadModalOpen && (
        <UploadFileModal
          isOpen={isUploadModalOpen}
          setIsOpen={setIsUploadModalOpen}
          file={uploadedFile}
          setFile={setUploadedFile}
          serviceType="cwyf"
          setConversation={setConversation}
          handleChatWithFile={handleChatWithFile}
          setUploadFileId={setUploadFileId}
          updateThreadArray={updateThreadArray}
        />
      )}
    </div>
  );
}
