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
import { threadDataType } from "./type";
import UploadFileModal from "./UploadFileModal";
import { errorAlert } from "@/components/appComponents/appAlert";
// import Loader from "@/components/appComponents/Loader";
// import ReactMarkdown from "react-markdown";
// import {
//   HamburgerMenuIcon,
//   DotFilledIcon,
//   CheckIcon,
//   ChevronRightIcon,
// } from '@radix-ui/react-icons';

type faqResType = {
  Question: string;
  Answer: string;
};

export default function Faq(props: {
  openedThread?: threadDataType;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFile: File | undefined;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
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
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadedFile,
    setUploadedFile,
    updateThreadArray,
  } = props;
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [faqResponse, setFaqResponse] = useState<faqResType[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "" },
  ]);
  const { handleAllLogAiApi } = useHandleAllLogAiAPI();

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

  async function handleGenerateFaqs(id: string, fileName: string) {
    console.log("handleGenerateFaqs runs", id, fileName);
    // setIsLoading(true);
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
            // setIsLoading(false);

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
      {!conversation ? (
        <div className="py-4 px-5 text-text-blue">
          <p className="text-lg font-semibold">Gpt Prompt</p>
          <p>
            Ask our chatbot anything by typing your question in the space below.
          </p>
        </div>
      ) : (
        <div className="grow py-1 px-2 overflow-auto text-ellipsis flex">
          <div className="p-2 mt-auto">
            {/* {conversation.map((item, index) => (
              <div key={index} className="flex flex-col">
                {item.question && (
                  <div className="self-end px-2 py-1 my-2 bg-blue-600 border rounded-md text-white ml-8">
                    {item.question}
                  </div>
                )}
                {item.answer && (
                  <>
                    <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 border border-border-light-gray rounded-md mr-8">
                      <ReactMarkdown children={item.answer}></ReactMarkdown>
                    </div>
                  </>
                )}
                <div ref={scrollContainerRef}></div>
              </div>
            ))} */}
            {faqResponse && faqResponse?.length > 0 && (
              <div className="m-1 sm:m-5 mt-12">
                <h1 className="font-bold text-3xl mb-3">Generated FAQ</h1>
                {faqResponse &&
                  faqResponse?.map((res: faqResType, index: number) => (
                    <div
                      key={index}
                      className="ankit mb-3 bg-gray-100 py-3 px-4"
                    >
                      <div className="mb-1 font-semibold">{res.Question}</div>
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
          {/* <button className="w-1/5">
            <FaPlus
              className="m-auto bg-gray-300 rounded-full p-2 cursor-pointer"
              size={30}
            />
          </button> */}
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
                <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                  <img src={textIcon} alt="" className="h-6" />
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                  <img src={faqIcon} alt="" className="h-6" />
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                  <img src={cwyfIcon} alt="" className="h-6" />
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                  <img src={imgTxtIcon} alt="" className="h-7" />
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
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

      {isUploadModalOpen && (
        <UploadFileModal
          isOpen={isUploadModalOpen}
          setIsOpen={setIsUploadModalOpen}
          file={uploadedFile}
          setFile={setUploadedFile}
          serviceType="faq"
          setConversation={setConversation}
          handleGenerateFaqs={handleGenerateFaqs}
          // setUploadFileId={setUploadFileId}
          // setOpenedThread={setOpenedThread}
          updateThreadArray={updateThreadArray}
        />
      )}

      {/* {isLoading && <Loader />} */}
    </div>
  );
}
