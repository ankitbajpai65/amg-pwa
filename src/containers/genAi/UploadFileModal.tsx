import { FormEvent, useEffect, useState } from "react";
import Modal from "@/components/appComponents/Modal";
import { Button } from "@/components/ui/button";
import { errorAlert, successAlert } from "@/components/appComponents/appAlert";
import uploadIcon from "@/assets/icons/uploadIcon.png";
import { IoClose } from "react-icons/io5";
import { conversationType, threadDataType } from "./type";

export default function UploadFileModal(props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean> | undefined;
  file: File | undefined;
  setFile: React.Dispatch<File | undefined> | undefined;
  serviceType: string;
  setConversation: React.Dispatch<React.SetStateAction<conversationType>>;
  setOpenedThread?: React.Dispatch<
    React.SetStateAction<threadDataType | undefined>
  >;
  updateThreadArray: (
    id: string,
    question: string,
    answer: string,
    service: string,
    fileUrl?: string
  ) => void | undefined;
  handleChatWithFile?: (e: FormEvent<HTMLFormElement>, tid: string) => void;
  handleGenerateFaqs?: (tid: string, fileName: string) => void;
  setUploadFileId?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    isOpen,
    setIsOpen,
    file,
    setFile,
    serviceType,
    setConversation,
    setOpenedThread,
    updateThreadArray,
    handleChatWithFile,
    handleGenerateFaqs,
    setUploadFileId,
  } = props;
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState(
    "https://genaiservices-be.datapartners.ch/generate/upload_langqa/"
  );

  const accessToken = localStorage.getItem("AccessToken");

  let uploadButtonText: string;

  useEffect(() => {
    if (serviceType === "faq") {
      setApiUrl("https://genaiservices-be.datapartners.ch/upload_faq/");
    } else if (serviceType === "image_to_text") {
      setApiUrl(
        "https://genaiservices-be.datapartners.ch/generate/image_to_text/"
      );
    }
  }, [serviceType]);

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0] || null;
    if (file && setFile) setFile(file);
  }

  async function onUploadButtonClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(file);

    if (!file) return;

    setIsFileUploading(true);
    const formData = new FormData();
    file.type === "application/pdf"
      ? formData.append("file", file)
      : formData.append("image", file);

    try {
      const result = await fetch(`${apiUrl}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: accessToken as string,
        },
      });

      const data = await result.json();
      console.log(data);

      if (result?.status !== 200) throw new Error(data);

      // if (activeServiceType === "cwyf")
      //   setUploadedFileDetails({
      //     file_name: data.response.response.file_name,
      //     file_url: data.response.response.file_path,
      //   });
      // setSelectedThread(data.id);
      // setApiResThreadId(data.id);

      if (serviceType === "faq" && handleGenerateFaqs) {
        handleGenerateFaqs(data, file.name);
        return;
      } else if (serviceType === "cwyf") {
        if (setUploadFileId) setUploadFileId(data.response.id);

        console.log("handleChatFile runs from uploadFilemodal");
        if (handleChatWithFile) handleChatWithFile(e, data.response.id);

        // console.log("conversation state sets from uploadFilemodal");
        setConversation([
          {
            id: +"",
            question: file.name,
            answer: "Ask me a question now",
            image_name: "",
            created_at: new Date().toISOString(),
          },
        ]);
      }
      // updateThreadArray(
      //   data.response.id,
      //   data.response.response.file_name,
      //   "Ask me a question now",
      //   "cwyf",
      //   data?.response?.response?.file_path
      // );
      //   return;
      // } else {
      else if (serviceType === "image_to_text") {
        updateThreadArray(
          data.id,
          data.Image_name,
          data.response,
          "image_to_text",
          data.image_path
        );
        setOpenedThread &&
          setOpenedThread({
            _id: data.id,
            service: "image_to_text",
            data: [
              {
                response: data.response,
                image_path: data.image_path,
              },
            ],
          });
        setConversation([
          {
            id: +"",
            question: data.image_path,
            answer: data.response,
            image_name: data.Image_name,
            created_at: new Date().toISOString(),
          },
        ]);
      }

      // }
      successAlert(1000, "File uploaded successfully");
    } catch (error) {
      errorAlert(1000, "Error please check console");
      console.error(error);
    } finally {
      setIsFileUploading(false);
      if (setIsOpen) setIsOpen(false);
      // setFile(null);
    }
  }

  if (isFileUploading) {
    uploadButtonText = "Caricamento in corso...";
  } else {
    uploadButtonText = "Carica file";
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="border w-88 p-5 flex-col justify-center gap-4 rounded-lg px-4 flex items-center bg-white relative z-50">
          <IoClose
            size={25}
            onClick={() => setIsOpen && setIsOpen(false)}
            className="absolute top-3 right-4 font-extrabold cursor-pointer text-red-500 text-bold p-1 hover:bg-red-200 rounded-full"
          />
          {/* {activeServiceType === "faq" ? (
            <h1 className="text-lg font-semibold mb-4">
              Upload file to generate FAQs
            </h1>
          ) : activeServiceType === "cwyf" ? (
            <h1 className="text-lg font-semibold mb-4">Upload file to chat</h1>
          ) : (
            <h1 className="text-lg font-semibold mb-4">Upload image</h1>
          )} */}
          <h1 className="text-lg font-semibold mb-4">Upload image</h1>
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={onUploadButtonClick}
          >
            <label htmlFor="file" className="text-center">
              <input
                key="input-when-file-present"
                onChange={onInputChange}
                type="file"
                name="file"
                id="file"
                className="w-3/4"
                // accept={
                //   activeServiceType === "cwyf" || activeServiceType === "faq"
                //     ? ".pdf"
                //     : "image/*"
                // }
              />
            </label>
            <Button
              type="submit"
              disabled={isFileUploading}
              variant="destructive"
              className="w-[293px] flex gap-2 disabled:opacity-50 "
            >
              <img src={uploadIcon} alt="upload file" />
              {uploadButtonText}
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
