import { useState } from "react";
import axios from "axios";
import { userDetailsType } from "@/lib/types";
import { useUserDetails } from "@/lib/context/userDetailsContext";
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
      const urlRes = await axios.post(url, {
        headers: {
          content: "application/json",
        },
        customer: "AMGDEMO",
        user: reqBody,
      });
      setData(urlRes.data);
      setUserDetails(urlRes.data); //? setting user details context
      // if (urlRes?.data) {
      //   if (urlRes?.data.startList.users[0].privacyDate === "") {
      //     navigate("/privacy");
      //   } else {
      //     navigate(`/home/${urlRes?.data.startList.users[0].email}`);
      //   }
      // }
    }
  };
  return { apiUserDetails: data, getUserDetails };
}
