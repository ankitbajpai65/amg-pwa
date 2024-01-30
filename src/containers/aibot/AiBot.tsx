import { useEffect, useRef, useState } from "react";
import { IoArrowUpCircleSharp } from "react-icons/io5";

const AiBot = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "" },
  ]);

  const url = "https://amgenaispacebackend.datapartners.ch";
  // const urlTest = "http://127.0.0.1:8000/";

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    setUserQuestion("");
  }, [conversation]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userQuestion.trim() !== "") {
      setConversation((prev) => {
        return [
          ...prev,
          { id: prev.length, question: userQuestion, answer: "Loading..." },
        ];
      });
      const res = await fetch(`${url}/va/?va=${userQuestion}`, {
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
              return { ...item, answer: cleanResponse};
            }
            return item;
          })
        );
      } else {
        alert("console");
        console.log(parsedRes);
      }
    }
  };

  return (
    <div className="flex flex-col h-full overflow-auto px-1">
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Datapartners Chat</p>
        <p>Talk to us, get to know us, make an appointment and more.</p>
      </div>
      <div className="grow py-1 px-2 overflow-auto text-ellipsis">
        <div className="self-start px-2 py-1 bg-neutral-100 rounded-md mr-8 dark:bg-neutral-600">
          👋 Want to chat about DataPartners? I'm an AI chatbot here to help you
          find your way.
        </div>
        <div className="p-2">
          {conversation.map((item, index) => (
            <div key={index} className="flex flex-col gap-y-4 ">
              {item.question && (
                <div className="self-end px-2 py-1 bg-blue-600 border rounded-md text-white ml-8 break-words ">
                  {item.question}
                </div>
              )}
              {item.answer && (
                <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 rounded-md mr-8">
                  {item.answer}
                </div>
              )}
              <div ref={scrollContainerRef}></div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex rounded-b-xl overflow-hidden p-2 h-16 box-border pb-4">
          <input
            type="text"
            placeholder="Type your question.."
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
export default AiBot;
