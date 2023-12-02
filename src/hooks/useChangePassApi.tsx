import { errorAlert, warnAlert } from "@/components/appComponents/appAlert";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type apidatatype = {
  userChangePassStatus: resDataType | undefined;
  getChangePassStatus: (reqBody: {
    email: string;
    passold: string;
    passnew: string;
  }) => Promise<void>;
};
type resDataType = {
  status: string | number | boolean;
  pin: string;
  error: string;
  title: string;
};

export default function useChangePassApi(): apidatatype {
  const navigate = useNavigate();
  const [data, setData] = useState<resDataType | undefined>();
  const url =
    "https://amg.datapartners.ch/Amg/ws/AMG_Security/Login/ChangePassword";

  const getChangePassStatus = async (reqBody: {
    email: string;
    passold: string;
    passnew: string;
  }) => {
    if (reqBody) {
      const changePassRes = await axios.post(url, {
        headers: {
          "Content-Type": "application/json",
        },
        
          customer: "AMGDEMO",
          user: reqBody.email,
          passold: reqBody.passold,
          passnew: reqBody.passnew,
        
        // {
        // customer: "AMGDEMO",
        // user: data.email,
        // passold: data.password,
        // passnew:""
        // }
      });

      const resData = changePassRes.data;
      console.log(resData);
      setData(resData);
      if (resData?.status === true) {
        warnAlert(3000, "Password Change Success");
        navigate("/");
      } else if (resData?.status === 400) {
        errorAlert(5000, resData?.title);
      } else {
        errorAlert(5000, resData?.title);
      }
    }
  };
  return { userChangePassStatus: data, getChangePassStatus };
}
