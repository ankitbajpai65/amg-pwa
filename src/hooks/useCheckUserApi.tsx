import { errorAlert } from "@/components/appComponents/appAlert";
import { setIsLoggedIn } from "@/containers/login/loginSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAmgStartApi from "./useAmgStartApi";
import { useDispatch } from "react-redux";

type apidatatype = {
  userLoginStatus: resDataType | undefined;
  getUserLoginStatus: (reqBody: {
    user: string;
    pass: string;
  }) => Promise<void>;
};
type resDataType = {
  status: string|number|boolean;
  pin: string;
  error: string;
  title: string;
};

export default function useCheckUserApi(): apidatatype {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails, getUserDetails } = useAmgStartApi();
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
      console.log("yo");
      const urlRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: "AMGDEMO",
          user: reqBody.user,
          pass: reqBody.pass,
        }),
      });

      const resData = await urlRes.json();
      console.log(resData);
      setData(resData);
      if (resData?.status === true) {
        dispatch(setIsLoggedIn(true));
        getUserDetails(reqBody?.user);
        console.log(userDetails);
        navigate("/home");
      } else if (resData?.status === 400) {
        errorAlert(5000, resData?.title);
      } else {
        dispatch(setIsLoggedIn(false));
        errorAlert(5000, resData?.error);
      }
    }
  };
  return { userLoginStatus: data, getUserLoginStatus };
}
