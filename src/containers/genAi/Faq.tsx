import useHandleAllLogAiAPI from "@/components/hooks/logAi/handleAllLogAi";
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
import { threadDataType } from "./type";
import UploadFileModal from "./UploadFileModal";
import { errorAlert } from "@/components/appComponents/appAlert";
import Gallery from "./Gallery/Gallery";
import useDownloadFaqApi from "@/components/hooks/genaiservices/faq/useDownloadFaqApi";
import NewLoader from "@/components/appComponents/NewLoader";
type faqResType = {
  Question: string;
  Answer: string;
};

export default function Faq(props: {
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
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [faqResponse, setFaqResponse] = useState<faqResType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "", image_name: "" },
  ]);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const { handleAllLogAiApi } = useHandleAllLogAiAPI();
  const { isDownloadFaqLoading, handleFaqDownload } = useDownloadFaqApi();

  const accessToken = localStorage.getItem("AccessToken");

  const url = "https://genaiservices-be.datapartners.ch";

  useEffect(() => {
    const fetchData = async () => {
      console.log(openedThread);
      if (openedThread && openedThread.data && openedThread.data[0].json_file) {
        const response = await fetch(openedThread.data[0].json_file);
        const res = await response.json();
        console.log(res);

        setFaqResponse(res);
      }
    };

    fetchData();
  }, [openedThread]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    const length = conversation.length;
    if (conversation[length - 1].answer !== '"Loading..."') {
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

  // async function fetchFaqData(url: string) {
  //   try {
  //     const response = await fetch(url);
  //     const res = await response.json();
  //     console.log(res);

  //     setFaqResponse(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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

  async function handleGenerateFaqs(id: string, fileName: string) {
    console.log("handleGenerateFaqs runs", id, fileName);
    setIsLoading(true);
    // setActiveServiceType("faq");

    try {
      const intervalId = setInterval(async () => {
        try {
          const response = await fetch(`${url}/response_faq/?uuid=${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: accessToken as string,
            },
          });

          const res = await response.json();
          console.log(res);

          if (res !== "pending") {
            if (res === "failed") {
              console.log(res);
              errorAlert(1000, "Can't upload the same file");
              return;
            }
            setFaqResponse(res.faq_qa);
            clearInterval(intervalId);
            setIsLoading(false);

            updateThreadArray(res.id, fileName, "", "faq", res.file_path);

            handleAllLogAiApi({
              question: "",
              answer: JSON.stringify(res),
              step: "GENAI_FAQ",
              fileName: uploadedFile?.name ?? "",
              fileSize: uploadedFile?.size ?? 0,
              reaction: "",
              tokensIn: "",
              tokensOut: "",
              wordsIn: "",
              wordsOut: "",
            });
            // setIsLoading(false);
            return;
          }
        } catch (error) {
          console.log("Error while fetching FAQs", error);
        }
      }, 20000);
    } catch (error) {
      console.log("Error while generating FAQs", error);
    }
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      {showGallery ? (
        <Gallery
          setShowGallery={setShowGallery}
          activeServiceType="faq"
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
              style={{ minWidth: "85%", margin: "auto" }}
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
                {faqResponse && faqResponse?.length > 0 && (
                  <div className="m-1 sm:m-5 mt-12">
                    <div className="flex justify-between">
                      <h1 className="font-bold text-3xl mb-3">Generated FAQ</h1>
                      <button
                        onClick={() => handleFaqDownload(openedThread?._id)}
                        className="h-10 w-10 flex justify-center items-center bg-gray-200 hover:bg-red-200 rounded-full p-2"
                      >
                        <BsDownload size={20} className="text-red-600" />
                      </button>
                    </div>
                    {faqResponse &&
                      faqResponse?.map((res: faqResType, index: number) => (
                        <div
                          key={index}
                          className="ankit mb-3 bg-gray-100 py-3 px-4"
                        >
                          <div className="mb-1 font-semibold">
                            {res.Question}
                          </div>
                          <div className="text-justify">{res.Answer}</div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <form>
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
          serviceType="faq"
          setConversation={setConversation}
          handleGenerateFaqs={handleGenerateFaqs}
          updateThreadArray={updateThreadArray}
        />
      )}

      {(isLoading || isDownloadFaqLoading) && <NewLoader />}
    </div>
  );
}
