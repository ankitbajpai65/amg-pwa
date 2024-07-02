import { useEffect, useRef, useState } from "react";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import textIcon from "@/assets/icons/textIcon.png";
import faqIcon from "@/assets/icons/faq.png";
import cwyfIcon from "@/assets/icons/cwyf.png";
import imgTxtIcon from "@/assets/icons/imgTxt.png";
import { PiFileImage } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa6";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import share from "@/assets/icons/share.png";
import { conversationType, threadDataType } from "./type";
import ReactMarkdown from "react-markdown";
import UploadFileModal from "./UploadFileModal";
import userLogo from "@/assets/user2.png";
import logo from "@/assets/logo.png";
import Gallery from "./Gallery/Gallery";
import useHandleAllLogAiAPI from "@/components/hooks/logAi/handleAllLogAi";
import { successAlert } from "@/components/appComponents/appAlert";

export default function ImgToText(props: {
  openedThread?: threadDataType | undefined;
  setOpenedThread: React.Dispatch<
    React.SetStateAction<threadDataType | undefined>
  >;
  handleNewThread?: (file: File | null, service: string) => void;
  threadArray: threadDataType[] | undefined;
  updateThreadArray: (
    id: string,
    question: string,
    answer: string,
    service: string,
    fileUrl?: string
  ) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFile: File | undefined;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) {
  console.log("imag to text renders");
  const {
    openedThread,
    setOpenedThread,
    handleNewThread,
    threadArray,
    updateThreadArray,
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadedFile,
    setUploadedFile,
  } = props;
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "", image_name: "" },
  ]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const [flag, setFlag] = useState<boolean>(false);

  const { handleAllLogAiApi } = useHandleAllLogAiAPI();

  useEffect(() => {
    console.log(openedThread);
    if (openedThread?.data) {
      const newConversation: conversationType = openedThread.data.map(
        (item, index) => ({
          id: item.id ?? index,
          question: item.prop ?? item.question ?? "",
          answer: item.image_url ?? item.answer ?? "",
          image_name: item.image_name ?? "",
          created_at: item.created_at ?? "",
        })
      );
      setConversation(newConversation);
    }
  }, [openedThread]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
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
      setConversation([{ id: +"", question: "", answer: "", image_name: "" }]);
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
    const selectedReaction = reaction === "OK" ? "upvote" : "downvote";
    setActiveReaction(selectedReaction);

    const answer =
      openedThread?.data?.[0]?.response ??
      openedThread?.data?.[0]?.answer ??
      "";
    const wordsOut = answer.length.toString();

    handleAllLogAiApi({
      question: userQuestion,
      answer,
      step: "GENAI_IMG2TXT",
      fileName: uploadedFile?.name ?? "",
      fileSize: uploadedFile?.size ?? 0,
      reaction: selectedReaction === "upvote" ? "OK" : "KO",
      tokensIn: "",
      tokensOut: "",
      wordsIn: userQuestion.length.toString(),
      wordsOut,
    });
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      {showGallery ? (
        <Gallery
          setShowGallery={setShowGallery}
          activeServiceType="image_to_text"
          threadArray={threadArray}
          // uploadedFileDetails={uploadedFileDetails}
        />
      ) : (
        <>
          {!conversation ? (
            <div className="py-4 px-5 text-text-blue">
              <p className="text-lg font-semibold">Image to text</p>
              <p>
                Ask our chatbot anything by typing your question in the space
                below.
              </p>
            </div>
          ) : (
            openedThread &&
            openedThread.data && (
              <div className="w-full sm:w-[85%] grow py-1 px-2 overflow-auto text-ellipsis flex sm:m-auto">
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
                  <div className="flex flex-col">
                    {openedThread &&
                      openedThread?.data[0] &&
                      openedThread._id && (
                        <>
                          <div
                            className={`flex items-center justify-between sm:justify-normal sm:gap-20 my-3 mt-4`}
                          >
                            <div className={`flex items-center gap-2`}>
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
                            {openedThread.created_at && (
                              <p className="text-sm sm:text-base">
                                {formatDate(openedThread.created_at)}
                              </p>
                            )}
                          </div>
                          <div className="min-h-[200px] w-full">
                            <img
                              src={
                                openedThread?.data[0].image_path ?? undefined
                              }
                              alt="Image"
                              className="mb-3 ml-3 h-auto w-5/6 sm:w-80"
                            />
                          </div>
                        </>
                      )}
                    {openedThread &&
                      openedThread?.data[0] &&
                      openedThread._id && (
                        <>
                          <div
                            className={`flex items-center justify-between sm:justify-normal sm:gap-20 my-3 mt-4`}
                          >
                            <div className="flex items-center gap-2 my-3">
                              <div className="h-8 w-8">
                                <img
                                  src={logo}
                                  alt=""
                                  className="h-full w-full"
                                />
                              </div>
                              <div className="text-md sm:text-lg font-semibold mt-2">
                                GenAI Space
                              </div>
                            </div>
                            {openedThread.created_at && (
                              <p className="text-sm sm:text-base">
                                {formatDate(openedThread.created_at)}
                              </p>
                            )}
                          </div>

                          <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 border border-border-light-gray rounded-md mr-8">
                            <ReactMarkdown
                              children={
                                openedThread.data[0].response ??
                                openedThread.data[0].answer
                              }
                            ></ReactMarkdown>
                          </div>
                          <button
                            className="h-10 w-10 mt-2 flex justify-center items-center bg-gray-200 hover:bg-red-200 rounded-full p-2"
                            onClick={() =>
                              openedThread &&
                              openedThread.data &&
                              handleCopyBtnClick(
                                openedThread.data[0].response ??
                                  (openedThread.data[0].answer as string)
                              )
                            }
                          >
                            <FaRegCopy size={18} className="text-red-600" />
                          </button>
                        </>
                      )}
                    <div ref={scrollContainerRef}></div>

                    {(openedThread.data[0].response ||
                      openedThread.data[0].answer) &&
                      (openedThread.data[0].response !== "Loading..." ||
                        openedThread.data[0].answer !== "Loading...") &&
                      flag && (
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
                </div>
              </div>
            )
          )}

          <form className="mt-auto">
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
                  disabled={true}
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
          serviceType="image_to_text"
          setConversation={setConversation}
          setOpenedThread={setOpenedThread}
          updateThreadArray={updateThreadArray}
          setFlag={setFlag}
        />
      )}
    </div>
  );
}
