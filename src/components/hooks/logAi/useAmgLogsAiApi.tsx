import axios from "axios";
import { useState } from "react";

type apidatatype = {
  dbLogUpdateStatus: resDataType | undefined;
  getLogsAiStatus: (reqBody: {
    userEmail: string;
    question: string;
    answer: string;
    result: string;
    step: string;
    fileName: string;
    fileSize: number;
    tokensIn: string;
    tokensOut: string;
    wordsIn: string;
    wordsOut: string;
  }) => Promise<void>;
};
type resDataType = {
  status: string | number | boolean;
  pin: string;
  error: string;
  title: string;
};

export default function useAmgLogsAiApi(): apidatatype {
  const [data, setData] = useState<resDataType | undefined>();
  const url = "https://amg.datapartners.ch/Amg/ws/AMG_WS/AMG_LOGS/logsAi";

  const getLogsAiStatus = async (reqBody: {
    userEmail: string;
    question: string;
    answer: string;
    result: string;
    step: string;
    fileName: string;
    fileSize: number;
    tokensIn: string;
    tokensOut: string;
    wordsIn: string;
    wordsOut: string;
  }) => {
    if (reqBody) {
      try {
        const urlRes = await axios.post(url, {
          customer: "AMGDEMO",
          user: reqBody.userEmail,
          type: "I",
          keyc: "|",
          data: `Origin;UserEmail;question;answer;result;step;Filename;FileSize;tokensIn;tokensOut;WordsIn;WordsOut|'AMG';'${reqBody.userEmail}';'${reqBody.question}';'${reqBody.answer}';'${reqBody.result}';'${reqBody.step}';'${reqBody.fileName}';'${reqBody.fileSize}';'${reqBody.tokensIn}';'${reqBody.tokensOut}';'${reqBody.wordsIn}';'${reqBody.wordsOut}'`,
        });

        const resData = await urlRes.data;
        console.log(resData);
        setData(() => resData);
      } catch (e) {
        console.error("useAmgLogsApi", e);
      }
    }
  };
  return { dbLogUpdateStatus: data, getLogsAiStatus };
}
