import axios, { AxiosError } from "axios";
import { errorAlert } from "@/components/appComponents/appAlert";
import { useState } from "react";

type apidatatype = {
  setNotificationFlagStatusRes: resDataType | undefined;
  setNotificationFlagStatus: (reqBody: reqBodyType) => Promise<void>;
};

type reqBodyType = {
  generalEmailFlag: string;
  generalPushFlag: string;
  newServiceEmailFlag: string;
  newServicePushFlag: string;
};

type resDataType = {
  response: string;
  status: number;
};

export default function useSetNotificationFlagsApi(): apidatatype {
  const [data, setData] = useState<resDataType>();
  // const url = "http://127.0.0.1:8000/getToken/";
  const url = "https://genaiservices-be.datapartners.ch";

  const setNotificationFlagStatus = async (reqBody: reqBodyType) => {
    const accessToken = localStorage.getItem("AccessToken");
    axios.defaults.headers.common["Authorization"] = accessToken;
    const {
      generalEmailFlag,
      generalPushFlag,
      newServiceEmailFlag,
      newServicePushFlag,
    } = reqBody;

    try {
      const urlRes = await axios.post(`${url}/notification_flag/`, {
        generalEmailFlag: generalEmailFlag,
        generalPushFlag: generalPushFlag,
        newServiceEmailFlag: newServiceEmailFlag,
        newServicePushFlag: newServicePushFlag,
      });
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
  return { setNotificationFlagStatusRes: data, setNotificationFlagStatus };
}
