import { useState } from "react";
import axios, { AxiosError } from "axios";
import { userDetailsType } from "@/lib/types";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { errorAlert } from "@/components/appComponents/appAlert";
// import { useNavigate } from "react-router-dom";

type apidatatype = {
  apiUserDetails: userDetailsType | undefined;
  getUserDetails: (reqBody: string) => Promise<void>;
};

export default function useAmgStartApi(): apidatatype {
  const [data, setData] = useState<userDetailsType | undefined>();
  const { setUserDetails } = useUserDetails();
  // const navigate = useNavigate();

  const url = "https://amg.datapartners.ch/Amg/ws/AMG_WS/AMG_start/";
  //   {
  //     "customer": "cust01",
  //     "user": "gg@dp.com",
  //   }

  const getUserDetails = async (reqBody: string) => {
    if (reqBody) {
      try {
        const urlRes = await axios.post(url, {
          headers: {
            content: "application/json",
          },
          customer: "AMGDEMO",
          user: reqBody,
          Origin: "PWA", //!CHANGE TO PWA
          
        });
        const resData = urlRes.data;
        setData(resData);
        setUserDetails(resData); //? setting user details context}
        console.log(resData);
      } catch (e) {
        console.error(e, "useAMGStartMS");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          setData(() => error?.response?.data);
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    }
  };
  return { apiUserDetails: data, getUserDetails };
}
