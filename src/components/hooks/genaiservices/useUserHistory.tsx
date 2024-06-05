import { useState } from "react";
import axios, { AxiosError } from "axios";
import { errorAlert } from "@/components/appComponents/appAlert";
import { threadDataType } from "@/containers/genAi/type";

const url = "https://genaiservices-be.datapartners.ch";

type resBodyType = {
  status: number;
  user_history: threadDataType[];
};

export default function useUserHistory() {
  const [usersThread, setUsersThread] = useState<resBodyType>();
  const accessToken = localStorage.getItem("AccessToken");

  const fetchUsersThread = async () => {
    try {
      const res = await axios.get(`${url}/get_user_history/`, {
        headers: {
          Authorization: accessToken,
        },
      });

      const resData = await res.data;
      console.log(resData);

      setUsersThread(resData);
    } catch (e) {
      console.error(e, "AmgStartAPI");
      const error = e as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        errorAlert(1000, error?.response?.data.error);
      }
    }
  };

  return { fetchUserThreadRes: usersThread, fetchUsersThread };
}
