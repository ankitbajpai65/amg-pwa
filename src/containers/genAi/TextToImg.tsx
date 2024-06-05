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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import userLogo from "@/assets/user.png";
import logo from "@/assets/loghi-03.png";
// import {

// const url = "https://amgenaispacebackend.datapartners.ch";
const url = "https://genaiservices-be.datapartners.ch";

export default function TextToImg(props: {
  openedThread: threadDataType;
  setOpenedThread?: React.Dispatch<
    React.SetStateAction<threadDataType | undefined>
  >;
  handleNewThread?: (file: File | null, service: string) => void;
  setIsUploadModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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
    updateThreadArray,
  } = props;
  const accessToken = localStorage.getItem("AccessToken");
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "", image_name: "" },
  ]);
  const [textToImageInput, setTextToImageInput] = useState({
    model: "",
    quality: "",
  });
  // const { handleAllLogAiApi } = useHandleAllLogAiAPI();

  // useEffect(() => {
  //   console.log(openedThread);
  //   if (openedThread) setConversation(openedThread.data);
  // }, [openedThread]);

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

  // useEffect(() => {
  //   console.log(openedThread);
  //   if (openedThread && openedThread.data) {
  //     setConversation(
  //       openedThread.data.map((item, index) => ({
  //         id: index,
  //         question: item.prop ?? item.question,
  //         answer: item.image_url ?? item.answer,
  //       }))
  //     );
  //   }
  // }, [openedThread]);

  useEffect(() => {
    console.log(openedThread);
    if (openedThread?.data) {
      const newConversation: conversationType = openedThread.data.map(
        (item, index) => ({
          id: index,
          question: item.prop ?? item.question ?? "",
          answer: item.image_url ?? item.answer ?? "",
          image_name: "",
        })
      );
      setConversation(newConversation);
    }
  }, [openedThread]);

  const handleGenerateImageFromText = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("handleGenerateImageFromText runs");

    const { model, quality } = textToImageInput;
    const modelQuery = model.toLowerCase().replace(/\s/g, "-");

    // setConversation((prev) => {
    //   console.log(prev);
    //   if (prev) {
    //     return [
    //       ...prev,
    //       { id: prev.length, question: userQuestion, answer: "Loading..." },
    //     ];
    //   } else {
    //     return [{ id: 0, question: userQuestion, answer: "Loading..." }];
    //   }
    // });

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

      // setApiResThreadId(response.id);

      updateThreadArray(
        response.id,
        userQuestion,
        response.response.image_url,
        "text_to_image"
      );

      setConversation((prev) => {
        console.log(prev);
        if (prev && prev.length > 0) {
          return [
            ...prev,
            {
              id: prev.length,
              question: userQuestion,
              answer: response.response?.image_url,
              image_name: "",
            },
          ];
        } else {
          return [
            {
              id: 0,
              question: userQuestion,
              answer: response.response?.image_url,
              image_name: "",
            },
          ];
        }
      });

      // handleAllLogAiApi({
      //   question: response.response.prop,
      //   answer: response.response?.image_url,
      //   step: "GENAI_TXT2IMG",
      //   fileName: "",
      //   fileSize: 0,
      //   reaction: "",
      //   tokensIn: "",
      //   tokensOut: "",
      //   wordsIn: response.response.prop.length,
      //   wordsOut: "",
      // });
    } catch (error) {
      console.log("Error generating image from text:", error);
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
      {/* {!conversation ? (
        <div className="py-4 px-5 text-text-blue">
          <p className="text-lg font-semibold">Gpt Prompt</p>
          <p>
            Ask our chatbot anything by typing your question in the space below.
          </p>
        </div>
      ) : ( */}
      <div
        style={{ minWidth: "85%", margin: "auto" }}
        className="grow py-1 px-2 overflow-auto text-ellipsis flex"
      >
        <div className="p-2 mt-auto">
          {conversation &&
            conversation.map((item, index) => (
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
                  </>
                )}
                <div ref={scrollContainerRef}></div>
              </div>
            ))}
        </div>
      </div>
      {/* )} */}

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
    </div>
  );
}
