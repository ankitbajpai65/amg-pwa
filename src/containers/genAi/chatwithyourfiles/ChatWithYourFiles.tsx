import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/appComponents/Loader";

export default function ChatWithYourFiles() {
  const [file, setFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = "https://amgenaispacebackend.datapartners.ch";
  //   const urlTestLocal = "http://127.0.0.1:8000";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("outer", e.target.files);
    if (e.target.files) {
      console.log("inner", e.target.files);
      setFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    setIsLoading(() => true);
    console.log("file", file);
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);
      try {
        const result = await fetch(`${url}/upload/`, {
          method: "POST",
          body: formData,
        });
        // const data = await result.json();
        // console.log({data});
        if (result?.status === 200) {
          setIsLoading(() => false);
          navigate("/pwa/gen-ai/chat-with-your-files/cwyfchat", {
            state: { fileName: file?.name as string, fileSize: file?.size },
          });
        } else {
          alert("ERROR Check console");
          setIsLoading(() => false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full px-2">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">Chat wih your File</h1>

        <p className="mb-2 text-left">
          Revolutionize the way you interact with documents with our Chatbot
          service with PDF and Word ingestion-a unique experience where
          artificial intelligence and advanced understanding come together to
          transform your document management into an intelligent and intuitive
          dialogue.
        </p>
        {/* <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" /> */}

        <Dialog>
          <DialogTrigger className="w-full mt-8">
            <button className="bg-red-500 text-white w-full rounded-md text-l p-1 px-2">
              Upload File
              <span className="px-2">
                <Loader size={4} status={isLoading} />
              </span>
            </button>
          </DialogTrigger>

          <DialogContent className="border rounded-md">
            <DialogHeader>
              <h1>Interroga il tuo documento</h1>
            </DialogHeader>
            <DialogFooter className="flex flex-col items-center">
              <input
                className="block text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-bg-btn-gray file:text-white
        text-center"
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
              {file && (
                <DialogClose>
                  <button
                    onClick={handleUpload}
                    className="bg-red-500 text-white rounded-md text-l p-1 m-2 px-2"
                  >
                    Confirm
                  </button>
                </DialogClose>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* <div className="h-full dark:bg-neutral-600 rounded-md my-2 box-border overflow-hidden flex flex-col">
        <div className="h-fit">{initialDisplay()}</div>
        <div className="h-full dark:bg-neutral-600 rounded-xl">
          <Chantbot fileName={file?.name as string} />
        </div>
      </div> */}
    </div>
  );
}
