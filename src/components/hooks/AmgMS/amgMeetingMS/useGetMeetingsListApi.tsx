import { useState } from "react";
import axios, { AxiosError } from "axios";
import { AppointmentsListType } from "@/lib/types";
import { useMeetingListContext } from "@/lib/context/meetingsListContext";
import { errorAlert } from "@/components/appComponents/appAlert";



type apidatatype = {
  getMeetingsListRes: resDataType | undefined;
  getMeetingsListApi: (reqBody: reqBodyType) => Promise<void>;
};
type reqBodyType = {
  userEmail: string;
  patientId?: string;
};
type resDataType = AppointmentsListType;

export default function useGetMeetingsListAPI(): apidatatype {
  const [data, setData] = useState<resDataType>();
  const {setMeetingList} = useMeetingListContext();

  const url = "https://amg.datapartners.ch/Amg/ws/AMG_BOOKING/BOOK_Meetings/";



  const getMeetingsListApi = async (reqBody: reqBodyType) => {
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
          keyc: `IdPatient|${reqBody.patientId}`,
          data: "*|",
        });
        const resData = urlRes.data;
        // console.log(resData);
        setData(() => resData);
        if (resData && resData.status === "I") {
          setMeetingList(resData)
        } else {
          console.error(resData);
          errorAlert(1000, resData?.error.split("***")[1]);
        }
      } catch (e) {
        console.error(e, "useGetMeetings");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          setData(() => error?.response?.data);
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    }
  };
  return { getMeetingsListRes: data, getMeetingsListApi };
}
