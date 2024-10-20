import { errorAlert, warnAlert } from "@/components/appComponents/appAlert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSendMailApi from "./useSendMailApi";
import axios, { AxiosError } from "axios";

type apidatatype = {
  createPassStatus: resDataType | undefined;
  getCreatePassStatus: (reqBody: { user: string }) => Promise<void>;
};
type resDataType = {
  status: string | number | boolean;
  pin: string;
  error: string;
  title: string;
};

export default function useCreatePassApi(): apidatatype {
  const navigate = useNavigate();
  const { getSendMailAPI } = useSendMailApi();
  const [data, setData] = useState<resDataType | undefined>();
  const url =
    "https://amg.datapartners.ch/Amg/ws/AMG_Security/Login/CreatePassword";

  const getCreatePassStatus = async (reqBody: { user: string }) => {
    if (reqBody) {
      try {
        const createPassRes = await axios.post(url, {
          customer: "AMGDEMO",
          user: reqBody.user,

          // {
          // customer: "AMGDEMO",
          // "user": "rajat.khandelwal@datapartners.ch",
          // "pass": "RLpDgADH"
          // }
        });

        const resData = createPassRes.data;
        setData(resData);
        if (resData?.status === true) {
          warnAlert(
            3000,
            "New Password created, Please check registered Email"
          );
          getSendMailAPI({
            user: reqBody.user,
            to: reqBody.user,
            cc: "",
            sub: "DATAPARTNERS - NEW PASSWORD",
            body: `The new password is - ${resData.psw}`,
            sendType: "MAIL",
          });
          navigate("/");
        } else if (resData?.status === 400) {
          errorAlert(5000, resData?.title);
        } else {
          errorAlert(5000, resData?.error);
        }
      } catch (e) {
        console.error(e, "useCreatePassAPI");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          setData(() => error?.response?.data);
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    }
  };
  return { createPassStatus: data, getCreatePassStatus };
}
