import axios from "axios";
import { useState } from "react";

type apidatatype = {
  userLoginStatus: resDataType | undefined;
  getSendMailStatus: (reqBody: {
    user: string;
    cc: string;
    sub: string;
    body: string;
  }) => Promise<void>;
};
type resDataType = {
  status: string | number | boolean;
  pin: string;
  error: string;
  title: string;
};

export default function useSendMailApi(): apidatatype {
  const [data, setData] = useState<resDataType | undefined>();
  const url = "https://amg.datapartners.ch/Amg/ws/PIP_Ws/InvioMail/InvioFast";
  //   {
  //   "customer":"AMGDEMO",
  //   "from":"noreply@datapartners.ch",
  //   "to":"email@dp.ch",
  //   "cc":"",
  //   "sub":"invio pin",
  //   "body":"12321",
  //   "sendType":"MAIL"
  // }

  const getSendMailStatus = async (reqBody: {
    user: string;
    cc: string;
    sub: string;
    body: string;
  }) => {
    if (reqBody) {
      const urlRes = await axios.post(url, {
        customer: "AMGDEMO",
        from: "noreply@datapartners.ch",
        to: reqBody.user,
        cc: reqBody.cc,
        sub: reqBody.sub,
        body: reqBody.body,
        sendType: "MAIL",
      });

      const resData = await urlRes.data;
      setData(resData);
    }
  };
  return { userLoginStatus: data, getSendMailStatus };
}
