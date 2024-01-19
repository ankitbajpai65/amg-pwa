import { Html5Qrcode } from "html5-qrcode";
import { useState } from "react";

const UploadScan = () => {
  const [scanRes, setScanRes] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scannerInstance = new Html5Qrcode("reader");
    if (e.target.files) {
      // console.log(e.target.files[0]);
      const imageFile = e.target.files[0];
      scannerInstance
        .scanFile(imageFile, true)
        .then((decodedText: string) => {
          setScanRes(decodedText);
        })
        .catch((err: string) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <input className="block text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-bg-btn-gray file:text-white
        text-center" type="file" id="reader" accept="image/*" onChange={handleUpload} />
       <div>{scanRes}</div>
    </div>
  );
};
export default UploadScan;
