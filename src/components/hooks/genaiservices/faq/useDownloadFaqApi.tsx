import { useState } from "react";

const BASE_URL = "https://genaiservices-be.datapartners.ch";

export default function useDownloadFaqApi() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFaqDownload = async (tid:string|undefined) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/get_faq_pdf/?uuid=${tid}`
      );

      const res = await response.blob();
      console.log(res);

      const url = URL.createObjectURL(res);

      const a = document.createElement("a");
      a.href = url;
      a.download = "faq";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log("Error in downloading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isDownloadFaqLoading:isLoading,handleFaqDownload };
}
