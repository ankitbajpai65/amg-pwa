import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { useEffect, useRef, useState } from "react";
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const CwyfChat = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [userQuestion, setUserQuestion] = useState("");

  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "" },
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  const fileName = location.state?.fileName;
  const url = "https://amgenaispacebackend.datapartners.ch";

  // const urlTestLocal = "http://127.0.0.1:8000";
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    setConversation([{ id: 0, question: "", answer: "" }]);
    if (!fileName) {
      navigate(-1);
    }
  }, [fileName]);

  useEffect(() => {
    const length = conversation.length;
    if (conversation[length - 1].answer !== '"Loading..."') {
      setUserQuestion("");
    }
  }, [conversation]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileName) {
      if (userQuestion.trim() !== "") {
        setConversation((prev) => {
          return [
            ...prev,
            {
              id: prev.length,
              question: userQuestion,
              answer: "Loading...",
            },
          ];
        });
        const res = await fetch(`${url}/query/?q=${userQuestion}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        });
        // setUserQuestion("");
        const parsedRes = await res.text();

        if (parsedRes.slice(0, 9) !== "<!DOCTYPE") {
          const responseText = parsedRes.slice(1, -1);
          const cleanResponse = responseText.replace(
            /(\r\n|\n|\r|\\n|\\|\*)/gm,
            " "
          );
          setConversation((prev) =>
            prev.map((item) => {
              if (item.id === conversation.length) {
                return { ...item, answer: cleanResponse };
              }
              return item;
            })
          );
        } else {
          alert("console");
          console.log(parsedRes);
        }
      }
    } else {
      setUserQuestion("");
      alert("Please Upload File first!!");
    }
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <BodyBackBtn btnText={`${fileName}`} />
      <div className="flex items-center justify-between px-8 py-3">
        <div className="flex items-center text-lg">
          <IoDocumentText style={{ marginRight: "8px" }} size={20} />
          <p className="font-semibold">{fileName}</p>
        </div>
        <div className="flex">
          <div
            className="text-text-light-gray mx-1 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <RiDeleteBin5Fill />
          </div>
          <div className="text-text-green mx-1 cursor-pointer">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      <div className="grow py-1 px-2 overflow-auto text-ellipsis">
        <div className="p-2">
          {conversation.map((item, index) => (
            <div key={index} className="flex flex-col gap-y-4 ">
              {item.question && (
                <div className="self-end px-2 py-1 bg-blue-600 border rounded-md text-white ml-8">
                  {item.question}
                </div>
              )}
              {item.answer && (
                <>
                  <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 border border-border-light-gray rounded-md mr-8">
                    {item.answer}
                  </div>
                  <div ref={scrollContainerRef}></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex rounded-b-xl overflow-hidden p-2 h-16 box-border pb-4">
          <input
            type="text"
            placeholder="Ask Me Anything"
            className="bg-bg-input-gray dark:bg-neutral-600 w-full h-full rounded-l-md p-1 px-2 focus:outline-0"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
          <button
            className="bg-bg-input-gray dark:bg-neutral-600 rounded-r-md px-2"
            type="submit"
          >
            <div className="text-text-red">
              <IoArrowUpCircleSharp size={25} />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};
export default CwyfChat;
