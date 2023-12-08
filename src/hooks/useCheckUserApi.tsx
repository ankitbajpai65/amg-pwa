import { errorAlert } from "@/components/appComponents/appAlert";
import axios from "axios";
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
      const urlRes = await axios.post(url, {
        customer: "AMGDEMO",
        user: reqBody.user,
        pass: reqBody.pass,
      });

      const resData = await urlRes.data;
      setData(resData);
      if (resData?.status === true) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("email", reqBody.user);
        getUserDetails(reqBody.user);
      } else if (resData?.status === 400) {
        errorAlert(5000, resData?.title);
      } else {
        sessionStorage.setItem("isLoggedIn", "false");
        errorAlert(5000, resData?.error);
      }
    }
  };
  return { userLoginStatus: data, getUserLoginStatus };
}
