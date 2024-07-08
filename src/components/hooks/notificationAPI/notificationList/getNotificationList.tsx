import axios, { AxiosError } from "axios";
import { errorAlert } from "@/components/appComponents/appAlert";
import { useState } from "react";

type apidatatype = {
  getNotificationListRes: resDataType | undefined;
  getNotificationListApi: () => Promise<void>;
};

type resDataType = {
  notificationID: string;
  notificationMsg: string;
  notificationTitle: string;
}[];

export default function useGetNotificationListApi(): apidatatype {
  const [data, setData] = useState<resDataType>();
  // const url = "http://127.0.0.1:8000/getToken/";
  const url = "https://genaiservices-be.datapartners.ch";

  const getNotificationListApi = async () => {
    const accessToken = localStorage.getItem("AccessToken");
    axios.defaults.headers.common["Authorization"] = accessToken;

    try {
      const urlRes = await axios.get(`${url}/notifications/`);
      const res = urlRes.data;
    //   console.log(res);
      setData(res);
    } catch (e) {
      console.error(e, "getNotificationList");
      const error = e as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        // console.log(error?.response?.data);
        errorAlert(1000, error?.response?.data.error);
      }
    }
  };
  return { getNotificationListRes: data, getNotificationListApi };
}
