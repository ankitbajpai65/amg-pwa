import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";

export const Chantbot = (props: { fileName: string }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [userQuestion, setUserQuestion] = useState("");

  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "" },
  ]);

  const url = "https://amgenaispacebackend.datapartners.ch";

  // const urlTestLocal = "http://127.0.0.1:8000";

  useEffect(() => {
    setConversation([{ id: 0, question: "", answer: "" }]);
  }, [props.fileName]);

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
    if (props.fileName) {
      if (userQuestion.trim() !== "") {
        setConversation((prev) => {
          return [
            ...prev,
            { id: prev.length, question: userQuestion, answer: "Loading..." },
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
    } else {
      setUserQuestion("");
      alert("Please Upload File first!!");
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <>
      <div className="flex justify-center h-full px-2">
        <div className="flex-1 flex flex-col justify-between overflow-auto mb-2 w-full">
          <div className="flex flex-col gap-y-4 my-4">
            {conversation.map((item, index) => (
              <div key={index} className="flex flex-col gap-y-4">
                {item.question && (
                  <div className="self-end px-2 py-1 bg-blue-600 border rounded-md text-white ml-8">
                    {item.question}
                  </div>
                )}
                {item.answer && (
                  <>
                    <div className="self-start px-2 py-1 bg-neutral-200 border rounded-md mr-8">
                      {item.answer}
                    </div>
                    <div ref={scrollContainerRef}></div>
                  </>
                )}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="w-full bottom-0 sticky flex"
          >
            <input
              type="text"
              value={userQuestion}
              placeholder="Ask Me Anything"
              className="w-full border-2 border-r-0 bg-neutral-100 p-2 rounded-l-xl"
              onChange={(e) => setUserQuestion(e.target.value)}
            />
            <button
              className="bg-neutral-100 border-2 border-l-0 rounded-r-xl px-2"
              type="submit"
            >
              <IoMdSend size={25} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
