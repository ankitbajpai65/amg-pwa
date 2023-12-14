import { useState } from "react";
import axios from "axios";
import { errorAlert, warnAlert } from "@/components/appComponents/appAlert";
import { useNavigate } from "react-router-dom";

type apidatatype = {
  userPolicy: resDataType | undefined;
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
  const navigate = useNavigate();

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
      setData(urlRes.data);
      if (urlRes?.data.status === "I") {
        warnAlert(2000, "Privacy Policy accepted");
        navigate(`/home/${sessionStorage.getItem("email")}`);
      } else {
        errorAlert(2000, "Policy not Accepted");
        navigate("/");
        sessionStorage.removeItem("isLoggedIn");
      }
    } else {
      console.error("Req body empty useAmgUsersApi");
    }
  };
  return { userPolicy: data, setUserUpdate };
}
