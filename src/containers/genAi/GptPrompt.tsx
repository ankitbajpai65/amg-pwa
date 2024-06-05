// import useHandleAllLogAiAPI from "@/components/hooks/logAi/handleAllLogAi";
import { useEffect, useRef, useState } from "react";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import textIcon from "@/assets/icons/textIcon.png";
import faqIcon from "@/assets/icons/faq.png";
import cwyfIcon from "@/assets/icons/cwyf.png";
import imgTxtIcon from "@/assets/icons/imgTxt.png";
import { PiFileImage } from "react-icons/pi";
import { conversationType, threadDataType } from "./type";
import ReactMarkdown from "react-markdown";
import UploadFileModal from "./UploadFileModal";
import userLogo from "@/assets/user.png";
import logo from "@/assets/loghi-03.png";
// import {
//   HamburgerMenuIcon,
//   DotFilledIcon,
//   CheckIcon,
//   ChevronRightIcon,
// } from '@radix-ui/react-icons';

const url = "https://genaiservices-be.datapartners.ch";

export default function GptPrompt(props: {
  openedThread?: threadDataType | undefined;
  setOpenedThread?: React.Dispatch<
    React.SetStateAction<threadDataType | undefined>
  >;
  // threadArray: threadDataType[];
  // setThreadArray: React.Dispatch<React.SetStateAction<threadDataType[]>>;
  handleNewThread?: (file: File | null, service: string) => void;
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
  // handleChatWithFile: (e, tid: string) => void;
}) {
  console.log("GPT prompt renders");

  const {
    openedThread,
    setOpenedThread,
    // threadArray,
    // setThreadArray,
    handleNewThread,
    updateThreadArray,
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadedFile,
    setUploadedFile,
    // handleChatWithFile,
  } = props;
  const accessToken = localStorage.getItem("AccessToken");
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [conversation, setConversation] = useState<conversationType>([
    { id: 0, question: "", answer: "", image_name: "" },
  ]);
  // const { handleAllLogAiApi } = useHandleAllLogAiAPI();

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

        // handleAllLogAiApi({
        //   question: userQuestion,
        //   answer: parsedRes.slice(1, -1),
        //   step: "GENAI_GPT",
        //   fileName: "",
        //   fileSize: 0,
        //   reaction: "",
        //   tokensIn: "",
        //   tokensOut: "",
        //   wordsIn: `${userQuestion.length}`,
        //   wordsOut: `${parsedRes.slice(1, -1).length}`,
        // });
      } else {
        alert("console");
        console.log(parsedRes);
      }
    }
  };

  function handleCreateNewThread(serviceType: string) {
    console.log("handleCreateNewThread runs", serviceType);
    if (handleNewThread) handleNewThread(null, serviceType);

    // setOpenedThread(threadArray[0]);
    // setConversation([{ id: "", question: "", answer: "", image_name: "" }]);
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
        <div
          style={{ width: "85%", margin: "auto" }}
          className="grow py-1 px-2 overflow-auto text-ellipsis flex"
        >
          <div className="p-2 mt-auto w-full">
            {conversation.map((item, index) => (
              <div key={index} className="flex flex-col">
                {item.question && (
                  <>
                    <div className={`flex items-center mt-4 gap-1`}>
                      <div className="h-14 w-14">
                        <img src={userLogo} alt="" className="h-full w-full" />
                      </div>
                      <div className="text-lg font-semibold">User</div>
                    </div>
                    <div className="self-start px-2 py-1 my-2 bg-blue-600 border rounded-md text-white">
                      {item.question}
                    </div>
                  </>
                )}
                {item.answer && (
                  <>
                    <div className="flex items-center gap-0.25">
                      <div className="h-14 w-14">
                        <img src={logo} alt="" className="h-full w-full" />
                      </div>
                      <div className="text-lg font-semibold mt-2">
                        GenAI Space
                      </div>
                    </div>
                    <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 border border-border-light-gray rounded-md mr-8">
                      <ReactMarkdown children={item.answer}></ReactMarkdown>
                    </div>
                  </>
                )}
                <div ref={scrollContainerRef}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form className="mt-auto" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex justify-center gap-6 rounded-b-xl overflow-hidden p-2 h-16 box-border pb-4">
          {/* <button className="w-1/5">
            <FaPlus
              className="m-auto bg-gray-300 rounded-full p-2 cursor-pointer"
              size={30}
            />
          </button> */}
          {/* <div className="w-1/5"> */}
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
          // handleChatWithFile={handleChatWithFile}
        />
      )}
    </div>
  );
}
