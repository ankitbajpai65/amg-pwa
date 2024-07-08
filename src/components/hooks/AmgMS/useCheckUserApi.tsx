import { errorAlert } from "@/components/appComponents/appAlert";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import useAmgStartApi from "./useAmgStartApi";

type apidatatype = {
  userLoginStatus: resDataType | undefined;
  getUserLoginStatus: (reqBody: {
    user: string;
    pass: string;
  }) => Promise<void>;
};
type resDataType = {
  status: string | number | boolean;
  pin: string;
  error: string;
  title: string;
};

export default function useCheckUserApi(): apidatatype {
  const { getUserDetails } = useAmgStartApi();
  const [data, setData] = useState<resDataType | undefined>();
  const url = "https://amg.datapartners.ch/Amg/ws/AMG_Security/Login/CheckUser";
  // {
  //   "customer": "AMGDEMO",
  // "user": "rajat.khandelwal@datapartners.ch",
  // "pass": "RLpDgADH"
  // }

  const getUserLoginStatus = async (reqBody: {
    user: string;
    pass: string;
  }) => {
    if (reqBody) {
      try {
        const urlRes = await axios.post(url, {
          customer: "AMGDEMO",
          user: reqBody.user,
          pass: reqBody.pass,
        });

        const resData = await urlRes.data;
        setData(() => resData);
        console.log(resData);
        if (resData?.status === true) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("email", reqBody.user);
          // getUserDetails(reqBody.user);
          getUserDetails({
            emailId: reqBody.user as string,
            customerId: "AMGDEMO",
          });
        } else if (resData?.status === 400) {
          errorAlert(5000, resData?.title);
        } else {
          localStorage.setItem("isLoggedIn", "false");
          errorAlert(5000, resData?.error);
        }
      } catch (e) {
        console.error(e, "useCheckUserAPI");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          setData(() => error?.response?.data);
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    }
  };
  return { userLoginStatus: data, getUserLoginStatus };
}
