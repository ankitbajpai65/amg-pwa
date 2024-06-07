import { useState } from "react";
import axios, { AxiosError } from "axios";
import { errorAlert } from "@/components/appComponents/appAlert";

type responseType = {
  id: string;
  response: {
    question: string;
    answer: string;
  };
  user_id: string;
  created_at: string;
  updated_at: string;
};

export default function useGptApi() {
  const [data, setData] = useState<responseType | null>();
  const accessToken = sessionStorage.getItem("AccessToken");

  const fetchGptRes = async (url: string) => {
    console.log("fetchGptRes runs");
    console.log(url);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: accessToken as string,
        },
      });

      const resData = await res.json();
      console.log(resData);

      setData(resData);
    } catch (e) {
      console.error(e, "AmgStartAPI");
      const error = e as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        errorAlert(1000, error?.response?.data.error);
      }
    }
  };

  return { gptRes: data, fetchGptRes };
}
