import { useState } from "react";
import axios, { AxiosError } from "axios";
import { OperatorsListType } from "@/lib/types";
import { useOperatorListContext } from "@/lib/context/operatorListContext";
import { errorAlert } from "@/components/appComponents/appAlert";


type apidatatype = {
  getOperatorsListRes: resDataType | undefined;
  getOperatorsList: (reqBody: reqBodyType) => Promise<void>;
};
type reqBodyType = {
  userEmail: string;
};
type resDataType = OperatorsListType;

export default function useGetOperatorsListAPI(): apidatatype {
  const [data, setData] = useState<resDataType>();
  const {setOperatorList} = useOperatorListContext()

  const url = "https://amg.datapartners.ch/Amg/ws/AMG_BOOKING/BOOK_Operators/";

  const getOperatorsList = async (reqBody: reqBodyType) => {
    // console.log({ reqBody });
    if (reqBody) {
      try {
        const urlRes = await axios.post(url, {
          headers: {
            "Content-type": "application/json",
          },
          customer: "AMGDEMO",
          user: reqBody.userEmail,
          type: "S",
          keyc: "*|",
          data: "*|",
        });
        const resData = urlRes.data;
        // console.log(resData);
        setData(() => resData);
        if (resData && resData.status === "I") {
         setOperatorList(resData);
        } else {
          console.error(resData);
          errorAlert(1000, resData?.error.split("***")[1]);
        }
      } catch (e) {
        console.error(e, "useGetOperator");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          setData(() => error?.response?.data);
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    }
  };
  return { getOperatorsListRes: data, getOperatorsList };
}
