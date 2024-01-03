import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chantbot } from "./chatbot/Chatbot";

export default function ChatWithYourFiles() {
  const [file, setFile] = useState<File | undefined>();
  const [apiRes, setApiRes] = useState<boolean | null>(null);

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
    console.log("file", file);
    if (file) {
      console.log("Uploading file...");
      setApiRes(false);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const result = await fetch(`${url}/upload/`, {
          method: "POST",
          body: formData,
        });
        console.log({ result });
        // const data = await result.json();
        // console.log({data});
        if (result?.status === 200) {
          setApiRes(true);
        } else {
          alert("ERROR Check console");
          setApiRes(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const initialDisplay = () => {
    if (apiRes === true) {
      return (
        <>
          <div className="self-start px-2 py-1 bg-neutral-100 dark:bg-neutral-600 rounded-md mx-2">
            {file?.name}- File has been loaded
          </div>
        </>
      );
    } else if (apiRes === false) {
      return (
        <>
          {/* <Divider className="my-2" /> */}
          <div className="self-start px-2 py-1 bg-neutral-200 dark:bg-neutral-600 rounded-md">
            Loading...{file?.name}
          </div>
        </>
      );
    } else {
      <div className="self-start px-2 py-1 bg-neutral-200 dark:bg-neutral-600 rounded-md">
        Error Loading.
      </div>;
    }
  };

  return (
    <div className="flex flex-col h-full px-2">
      <div className="text-center">
        <h1 className="text-xl font-bold text-center mb-2">
          Docs Ingestion Chatbot
        </h1>
        {!file ? (
          <>
            <p className="mb-2 text-left">
              Rivoluziona il modo di interagire con i documenti grazie al nostro
              servizio Chatbot con ingestion di PDF e Word: un'esperienza unica
              dove intelligenza artificiale e comprensione avanzata si fondono
              per trasformare la tua gestione documentale in un dialogo
              intelligente e intuitivo.
            </p>
            <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          </>
        ) : (
          <></>
        )}

        <Dialog>
          <DialogTrigger>
            <button className="bg-red-500 text-white w-fit rounded-xl text-l p-1 px-2">
              Upload File
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <h1>Interroga il tuo documento</h1>
            </DialogHeader>
            <DialogFooter className="flex flex-col items-center">
              <input type="file" onChange={(e) => handleFileChange(e)} />
              {file && (
                <DialogClose>
                  <button
                    onClick={handleUpload}
                    className="bg-red-500 text-white rounded-xl text-l p-1 px-2"
                  >
                    Confirm
                  </button>
                </DialogClose>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-full bg-gray-100 dark:bg-neutral-600 rounded-md my-2 pb-2 box-border overflow-hidden">
        <div className="h-fit">{initialDisplay()}</div>
        <div className="h-full bg-gray-100 dark:bg-neutral-600 rounded-xl p-1 pb-3">
          <Chantbot fileName={file?.name as string} />
        </div>
      </div>
    </div>
  );
}
