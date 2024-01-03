import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";

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
        setConversation((prev) =>
          prev.map((item) => {
            if (item.id === conversation.length) {
              return { ...item, answer: parsedRes.slice(1, -1) };
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

  // const conversationEntries = Object.entries(conversation);

  // const url = "https://amgenaispacebackend.datapartners.ch";
  // // const urlTest = "http://127.0.0.1:8000/";

  // useEffect(() => {
  //   scrollToBottom();
  // }, [conversation]);

  // useEffect(() => {
  //   setUserQuestion("");
  // }, [conversation]);

  // const scrollToBottom = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  // // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // //     setInputValue(e.target.value);
  // // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (userQuestion.trim() !== "") {
  //     setConversation((prev) => {
  //       return {
  //         ...prev,
  //         [userQuestion]: "Loading...",
  //       };
  //     });
  //     const res = await fetch(`${url}/va/?va=${userQuestion}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json; charset=UTF-8",
  //       },
  //     });
  //     // setUserQuestion("");
  //     const parsedRes = await res.text();

  //     if (parsedRes.slice(0, 9) !== "<!DOCTYPE") {
  //       setConversation((prev) => {
  //         return {
  //           ...prev,
  //           [userQuestion]: parsedRes.slice(1, -1),
  //         };
  //       });
  //     } else {
  //       alert("console");
  //       console.log(parsedRes);
  //     }
  //   }
  // };
  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="grow py-1 px-2 overflow-auto text-ellipsis">
        <div className="self-start px-2 py-1 bg-neutral-100 border rounded-md mr-8 dark:bg-neutral-600">
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
                <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 border rounded-md mr-8">
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
            placeholder="Please Enter"
            className="bg-gray-300 dark:bg-neutral-600 w-full h-full rounded-l p-1 px-2 focus:outline-0"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
          <button
            className="bg-gray-300 dark:bg-neutral-600 rounded-r px-2"
            type="submit"
          >
            <IoMdSend size={25} />
          </button>
        </div>
      </form>
    </div>
  );
};
export default AiBot;
