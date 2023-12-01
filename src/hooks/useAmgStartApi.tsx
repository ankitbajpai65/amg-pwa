import { useState } from "react";

type apidatatype = {
  userDetails: string | undefined;
  getUserDetails: (reqBody: string) => Promise<void>;
};

export default function useAmgStartApi(): apidatatype {

  const [data, setData] = useState<string | undefined>();
  const url = "https://amg.datapartners.ch/Amg/ws/AMG_WS/AMG_start/";
  //   {
  //     "customer": "cust01",
  //     "user": "gg@dp.com",
  //   }

  const getUserDetails = async (reqBody: string) => {
    if (reqBody) {
      console.log("yo");
      const urlRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: "AMGDEMO",
          user: reqBody,
        }),
      });

      const resData = await urlRes.json();
      setData(resData);

      console.log(resData);
    }
  };
  return { userDetails: data, getUserDetails };
}
