import { useState } from "react";
import axios, { AxiosError } from "axios";
import { errorAlert } from "@/components/appComponents/appAlert";
import { PatientsListType } from "@/lib/types";
import { usePatientListContext } from "@/lib/context/patientListContext";

type apidatatype = {
  getPatientsListRes: resDataType | undefined;
  getPatientsList: (reqBody: reqBodyType) => Promise<void>;
};
type reqBodyType = {
  userEmail: string;
};
type resDataType = PatientsListType;

export default function useGetPatientsListAPI(): apidatatype {
  const [data, setData] = useState<resDataType>();
  const { setPatientList } = usePatientListContext();

  const url = "https://amg.datapartners.ch/Amg/ws/AMG_BOOKING/BOOK_Patients/";

  const getPatientsList = async (reqBody: reqBodyType) => {
    console.log({ reqBody });
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
          setPatientList(resData);
        } else {
          console.error(resData);
          errorAlert(1000, resData?.error.split("***")[1]);
        }
      } catch (e) {
        console.error(e, "usegetPatients");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          setData(() => error?.response?.data);
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    }
  };
  return { getPatientsListRes: data, getPatientsList };
}
