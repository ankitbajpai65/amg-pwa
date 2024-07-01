import axios, { AxiosError } from "axios";
import { errorAlert} from "@/components/appComponents/appAlert";

export default function useDeviceTokenApi() {
  // const url = "http://127.0.0.1:8000/getToken/";
  const url = "https://genaiservices-be.datapartners.ch";

  const setDeviceToken = async (reqBody: { token: string }) => {
    const accessToken = sessionStorage.getItem("AccessToken");
    axios.defaults.headers.common["Authorization"] = accessToken;
    if (reqBody) {
      try {
        const urlRes = await axios.post(`${url}/get_registration_token/`, {
          token: reqBody.token,
        });
        const res = urlRes.data;
        console.log(res);
        if (res.status === 200) {
          // warnAlert(1000, res.response);
          console.log(res.response);
        }
      } catch (e) {
        console.error(e, "setDeviceToken");
        const error = e as Error | AxiosError;
        if (axios.isAxiosError(error)) {
          // console.log(error?.response?.data);
          errorAlert(1000, error?.response?.data.error);
        }
      }
    } else {
      console.error("Req body empty setDeviceToken");
    }
  };
  return { setDeviceToken };
}
