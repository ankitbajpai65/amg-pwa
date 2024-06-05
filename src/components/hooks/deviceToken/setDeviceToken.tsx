import axios, { AxiosError } from "axios";
import { errorAlert} from "@/components/appComponents/appAlert";


export default function useDeviceTokenApi() {
  const url = "http://127.0.0.1:8000/getToken/";

  const setDeviceToken = async (reqBody: { user: string; token: string }) => {
    if (reqBody) {
      try {
        const urlRes = await axios.post(url, {
          headers: {
            content: "application/json",
          },
          userEmail: reqBody.user,
          token: reqBody.token,
        });
        const res = urlRes.data;
        console.log(res);
      } catch (e) {
        console.error(e, "setDevideToken");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    } else {
      console.error("Req body empty setDeviceToken");
    }
  };
  return { setDeviceToken };
}
