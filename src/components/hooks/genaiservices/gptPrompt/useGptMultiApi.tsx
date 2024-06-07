import { useState } from "react";
import axios, { AxiosError } from "axios";
import { errorAlert } from "@/components/appComponents/appAlert";
// import { threadArrayType } from "@/containers/b2b/type";

const url = "https://genaiservices-be.datapartners.ch";

export default function useGptMultiApi() {
  const [data, setData] = useState();
  const accessToken = sessionStorage.getItem("AccessToken");

  const fetchGptMultiRes = async (tid: string,prop: string) => {
    try {
      const res = await axios.get(
        `${url}/prop_multi/?tid=${tid}&prop_multi=${prop}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      const resData = await res.data;
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

  return { gptMultiRes: data, fetchGptMultiRes };
}
