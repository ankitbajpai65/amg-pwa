import { errorAlert } from "@/components/appComponents/appAlert";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import axios, { AxiosError } from "axios";
import { useState } from "react";

type apidatatype = {
  sendMailAPIRes: resDataType | undefined;
  getSendMailAPI: (reqBody: {
    user: string;
    cc: string;
    sub: string;
    body: string;
    sendType: string;
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
  const { userDetails } = useUserDetails();
  const url = "https://amg.datapartners.ch/Amg/ws/PIP_Ws/InvioMail/InvioFast";
  const urlSMS = "https://amg.datapartners.ch/Amg/ws/PIP_Ws/InvioSms/InvioFas";
  //   {
  //   "customer":"AMGDEMO",
  //   "from":"noreply@datapartners.ch",
  //   "to":"email@dp.ch",
  //   "cc":"",
  //   "sub":"invio pin",
  //   "body":"12321",
  //   "sendType":"MAIL"
  // }

  const getSendMailAPI = async (reqBody: {
    user: string;
    cc: string;
    sub: string;
    body: string;
    sendType: string;
  }) => {
    if (reqBody) {
      try {
        const urlRes = await axios.post(
          reqBody.sendType === "SMS" ? urlSMS : url,
          {
            customer: "AMGDEMO",
            from: userDetails?.startList.baseData.find(
              (item) => item.code === "MAILFROM"
            )?.itemValue,
            to: reqBody.user,
            cc: reqBody.cc,
            sub: reqBody.sub,
            body: reqBody.body,
            sendType: reqBody.sendType,
          }
        );

        const resData = await urlRes.data;
        setData(resData);
      } catch (e) {
        console.error(e, "useSenMailApi");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          setData(() => error?.response?.data);
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    }
  };
  return { sendMailAPIRes: data, getSendMailAPI };
}
