import { useState } from "react";
import axios from "axios";
import { userDetailsType } from "@/lib/types";

type apidatatype = {
  userDetails: userDetailsType | undefined;

  setUserUpdate: (reqBody: {
    user: string;
    key: string;
    data: string;
  }) => Promise<void>;
};

export default function useAmgUsersApi(): apidatatype {
  const [data, setData] = useState<userDetailsType | undefined>();

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
    }
  };
  return { userDetails: data, setUserUpdate };
}
