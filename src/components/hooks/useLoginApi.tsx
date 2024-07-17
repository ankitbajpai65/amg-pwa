import { errorAlert } from "../appComponents/appAlert";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import useAmgStartApi from "./AmgMS/useAmgStartApi";

type resBodyType = {
  response: string;
  status: number | boolean;
  token: string;
  error?: string;
  pin: string;
};

export default function useLoginApi() {
  const [data, setData] = useState<resBodyType>();
  const { getUserDetails } = useAmgStartApi();

  // const url = "https://amg-pwa-v1.uc.r.appspot.com";
  const url = "https://genaiservices-be.datapartners.ch";

  const getUserLogin = async (reqBody: {
    userEmail: string;
    password: string;
    customer: string;
    serverType: string;
  }) => {
    console.log("getUserLogin runs");

    console.log(reqBody);

    try {
      if (reqBody) {
        const res = await axios.post(`${url}/auth/loginamg/`, {
          user: reqBody.userEmail,
          pass: reqBody.password,
          customer: reqBody.customer,
          serverType: reqBody.serverType,
        });
        const resData = res.data;
        console.log(resData);

        setData(() => resData);
        if (resData?.response === "login successful") {
          getUserDetails({
            emailId: reqBody.userEmail,
            customerId: reqBody.customer,
          });
          // localStorage.setItem("userEmail", reqBody.userEmail);
          // localStorage.setItem("AccessToken", resData.token);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("email", reqBody.userEmail);
          localStorage.setItem("AccessToken", resData.token);
        } else {
          errorAlert(3000, resData?.error);
        }
      }
    } catch (e) {
      console.error(e, "useLoginApi");

      const error = e as Error | AxiosError;
      setData(() => ({
        response: "",
        status: false,
        token: "",
        error: error?.message,
        pin: "",
      }));
      if (axios.isAxiosError(error)) {
        errorAlert(1000, "Error Logging in");
        errorAlert(1000, error?.response?.data.error);
      }
    }
  };
  return { getUserLoginRes: data, getUserLogin };
}
