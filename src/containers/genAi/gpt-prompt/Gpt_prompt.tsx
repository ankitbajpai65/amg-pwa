import { useEffect, useRef, useState } from "react";

export default function Gpt_prompt() {
  const [userQuestion, setUserQuestion] = useState("");
  const [conversation, setConversation] = useState({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const conversationEntries = Object.entries(conversation);

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

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setInputValue(e.target.value);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userQuestion.trim() !== "") {
      setConversation((prev) => {
        return {
          ...prev,
          [userQuestion]: "Loading...",
        };
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
        setConversation((prev) => {
          return {
            ...prev,
            [userQuestion]: parsedRes.slice(1, -1),
          };
        });
      } else {
        alert("console");
        console.log(parsedRes);
      }
    }
  };
  return (
    <div className="flex flex-col grow mb-16 overflow-auto">
      <h1 className="text-xl font-bold text-center">Gpt-Prompt</h1>
      {/* <Divider className="my-2" /> */}
      <div className="grow py-1 px-2 overflow-auto text-ellipsis">
        {conversationEntries.length === 0 ? (
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
          {conversationEntries.map(([key, value], index) => (
            <div key={index} className="flex flex-col gap-y-4 ">
              <div className="self-end px-2 py-1 bg-blue-600 border rounded-md text-white ml-8 break-words ">
                {key}
              </div>
              <div className="self-start px-2 py-1 bg-neutral-100 border rounded-md mr-8">
                {value as string}
              </div>
              <div ref={scrollContainerRef}></div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex rounded-b-xl overflow-hidden p-2 h-16 box-border pb-4">
          <input
            type="text"
            placeholder="Ask Me Anything"
            className="border-2 bg-neutral-100  w-full h-full rounded-xl p-1 px-2 focus:outline-0"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
