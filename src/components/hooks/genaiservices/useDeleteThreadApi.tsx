import { useState } from "react";
import axios, { AxiosError } from "axios";
import { errorAlert, successAlert } from "@/components/appComponents/appAlert";
// import { threadDataType } from "@/containers/genAi/type";

const url = "https://genaiservices-be.datapartners.ch";

// type resBodyType = {
//   status: number;
//   user_history: threadDataType[];
// };

export default function useDeleteThreadApi() {
  //   const [data, setData] = useState<resBodyType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accessToken = sessionStorage.getItem("AccessToken");

  const deleteThread = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    threadId: string,
    service: string,
    toggleSidebar: () => void
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${url}/delete_thread/?tid=${threadId}&service=${service}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      const resData = await res.data;
      console.log(resData);

      if (resData.status === 200) {
        successAlert(1000, "Thread deleted successfully!");
        toggleSidebar();
      }
    } catch (e) {
      console.error(e, "AmgStartAPI");
      const error = e as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        errorAlert(1000, error?.response?.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteThread, isLoading };
}
