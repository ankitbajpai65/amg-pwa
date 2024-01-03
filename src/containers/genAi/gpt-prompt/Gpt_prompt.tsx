import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";

export default function Gpt_prompt() {
  const [userQuestion, setUserQuestion] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [conversation, setConversation] = useState([
    { id: 0, question: "", answer: "" },
  ]);

  const url = "https://amgenaispacebackend.datapartners.ch";

  // const urlTestLocal = "http://127.0.0.1:8000";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userQuestion.trim() !== "") {
      setConversation((prev) => {
        return [
          ...prev,
          { id: prev.length, question: userQuestion, answer: "Loading..." },
        ];
      });
      const res = await fetch(`${url}/response/?resp=${userQuestion}`, {
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

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <h1 className="text-xl font-bold text-center">GPT-Prompt</h1>
      {/* <Divider className="my-2" /> */}
      <div className="grow py-1 px-2 overflow-auto text-ellipsis">
        {conversation.length === 0 ? (
          <div className="self-start px-2 py-1 border rounded-xl">
            <p className="self-center top-0 sticky bg-white w-full py-4">
              Scopri il futuro con la nostra sezione demo GENAI: un viaggio
              avvincente attraverso intelligenze artificiali generativa
              all'avanguardia, dove potrai sperimentare direttamente le
              rivoluzionarie capacità di generazione e analisi del testo.
            </p>
          </div>
        ) : (
          <></>
        )}

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
                  <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 border rounded-md mr-8">
                    {item.answer}
                  </div>
                  <div ref={scrollContainerRef}></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex rounded-b-xl overflow-hidden p-2 h-16 box-border pb-4">
          <input
            type="text"
            placeholder="Ask Me Anything"
            className="border-2 border-r-0 bg-neutral-100 dark:bg-neutral-600 w-full h-full rounded-l-xl p-1 px-2 focus:outline-0"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
          <button
            className="bg-neutral-100 dark:bg-neutral-600 border-2 border-l-0 rounded-r-xl px-2"
            type="submit"
          >
            <IoMdSend size={25} />
          </button>
        </div>
      </form>
    </div>
  );
}
