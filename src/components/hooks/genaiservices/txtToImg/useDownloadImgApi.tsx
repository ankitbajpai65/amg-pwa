import { useState } from "react";

const BASE_URL = "https://genaiservices-be.datapartners.ch";

export default function useDownloadImgApi() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const accessToken = localStorage.getItem("AccessToken");

  async function handleImageDownload(fileUrl: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/generate/download_image/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken as string,
        },
        body: JSON.stringify({
          image_url: fileUrl,
        }),
      });

      const res = await response.blob();
      console.log(res);

      const url = URL.createObjectURL(res);

      const a = document.createElement("a");
      a.href = url;
      a.download = "img";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log("Error in downloading file:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { isDownloadImgLoading: isLoading, handleImageDownload };
}
