import { useState } from "react";
import axios, { AxiosError } from "axios";
import { errorAlert, successAlert } from "@/components/appComponents/appAlert";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useLocation } from "react-router-dom";

type apidatatype = {
  userUpdateRes: resDataType | undefined;
  setUserUpdate: (reqBody: {
    user: string;
    key: string;
    data: string;
  }) => Promise<void>;
};
type resDataType = {
  error: string;
  status: string;
};

export default function useAmgUsersApi(): apidatatype {
  const [data, setData] = useState<resDataType | undefined>();
  const { setUserDetails } = useUserDetails();
  const location = useLocation();

  const url = "https://amg.datapartners.ch/Amg/ws/AMG_WS/AMG_Users/";
  //   {
  //     "customer": "cust01",
  //     "user": "gg@dp.com",
  //      "type":'U',
  //      "keyc":ckeyC,
  //      "data": cdata,
  //   }

  const setUserUpdate = async (reqBody: {
    user: string;
    key: string;
    data: string;
  }) => {
    if (reqBody) {
      try {
        const urlRes = await axios.post(url, {
          headers: {
            content: "application/json",
          },
          customer: "AMGDEMO",
          user: reqBody.user,
          type: "U",
          keyc: reqBody.key,
          data: reqBody.data,
        });
        setData(() => urlRes.data);
        if (urlRes?.data.status === "I") {
          if (location.pathname === "/policy/privacy2") {
            successAlert(1000, "I consensi sono stati archiviati");
          } else {
            successAlert(1000, "UserDetails Updated");
          }
        } else {
          if (location.pathname === "/policy/privacy2") {
            errorAlert(1000, "Policy Acceptance Failed");
          } else {
            errorAlert(1000, "Update Failed");
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("email");
            setUserDetails(null);
          }
        }
      } catch (e) {
        console.error(e, "useAmgUSersAPi");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          setData(() => error?.response?.data);
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    } else {
      console.error("Req body empty useAmgUsersApi");
    }
  };
  return { userUpdateRes: data, setUserUpdate };
}
