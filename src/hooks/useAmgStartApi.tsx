import { useState } from "react";
import axios from "axios";

type apidatatype = {
  userDetails: userDetailsType | undefined;
  getUserDetails: (reqBody: string) => Promise<void>;
};
type userDetailsType = {
  error: string;
  startList: {
    baseData: string;
    branches: string;
    cards: {
      backcolor: string;
      code: string;
      description: string;
      forecolor: string;
      html: string;
      rif1: string;
      rif2: string;
      rif3: string;
      title: string;
    }[];
    companies: string;
    groups: string;
    roles: string;
    tables: string;
    users: [
      {
        email: string;
        nickName: string;
      }
    ];
  };
  status: string;
};
export default function useAmgStartApi(): apidatatype {
  const [data, setData] = useState<userDetailsType | undefined>();
  const url = "https://amg.datapartners.ch/Amg/ws/AMG_WS/AMG_start/";
  //   {
  //     "customer": "cust01",
  //     "user": "gg@dp.com",
  //   }

  const getUserDetails = async (reqBody: string) => {
    if (reqBody) {
      console.log("yo");

      const urlRes = await axios.post(url, {
        headers: {
          content: "application/json",
        },
        customer: "AMGDEMO",
        user: reqBody,
      });

      setData(urlRes.data);

      console.log(urlRes);
    }
  };
  return { userDetails: data, getUserDetails };
}
