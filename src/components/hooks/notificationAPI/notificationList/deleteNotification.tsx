import axios, { AxiosError } from "axios";
import { errorAlert } from "@/components/appComponents/appAlert";
import { useState } from "react";

type apidatatype = {
  deleteNotificationRes: resDataType | undefined;
  deleteNotification: (reqBody: reqBodyType) => Promise<void>;
};

type reqBodyType = {
  notificationId: string;
};

type resDataType = {
  response: string;
  status: 200;
};

export default function useDeleteNotificationsApi(): apidatatype {
  const [data, setData] = useState<resDataType>();
  // const url = "http://127.0.0.1:8000/getToken/";
  const url = "https://genaiservices-be.datapartners.ch";

  const deleteNotification = async (reqBody: reqBodyType) => {
    const accessToken = localStorage.getItem("AccessToken");
    axios.defaults.headers.common["Authorization"] = accessToken;
    if (reqBody.notificationId) {
      try {
        const urlRes = await axios.delete(
          `${url}/notifications/?id=${reqBody.notificationId}`
        );
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
    }
  };
  return { deleteNotificationRes: data, deleteNotification };
}
