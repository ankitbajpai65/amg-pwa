import axios, { AxiosError } from "axios";
import { errorAlert } from "@/components/appComponents/appAlert";
import { useState } from "react";

type apidatatype = {
  getNotificationFlagStatusRes: resDataType | undefined;
  getNotificationFlagStatus: () => Promise<void>;
};

type resDataType = {
  response: {
    general_email: string;
    general_push: string;
    chat_email: string;
    chat_push: string;
  };
  status: number;
};

export default function useGetNotificationFlagsApi(): apidatatype {
  const [data, setData] = useState<resDataType>();
  // const url = "http://127.0.0.1:8000/getToken/";
  const url = "https://genaiservices-be.datapartners.ch";

  const getNotificationFlagStatus = async () => {
    const accessToken = sessionStorage.getItem("AccessToken");
    axios.defaults.headers.common["Authorization"] = accessToken;

    try {
      const urlRes = await axios.get(`${url}/notification_flag/`)
      const res = urlRes.data;
      console.log(res);
      setData(res);
    } catch (e) {
      console.error(e, "setDeviceToken");
      const error = e as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        // console.log(error?.response?.data);
        errorAlert(1000, error?.response?.data.error);
      }
    }
  };
  return { getNotificationFlagStatusRes: data, getNotificationFlagStatus };
}
