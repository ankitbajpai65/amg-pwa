import { useState } from "react";
import axios from "axios";
import { errorAlert, successAlert } from "@/components/appComponents/appAlert";
// import { useNavigate } from "react-router-dom";
import { useUserDetails } from "@/lib/context/userDetailsContext";

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
        successAlert(2000, "UserDetails Updated");
      } else {
        errorAlert(2000, "Policy not Accepted");
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("email");
        setUserDetails(null);
      }
    } else {
      console.error("Req body empty useAmgUsersApi");
    }
  };
  return { userUpdateRes: data, setUserUpdate };
}
