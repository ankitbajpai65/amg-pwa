import { warnAlert } from "@/components/appComponents/appAlert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { messaging } from "@/firebase";
import { getToken } from "firebase/messaging";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceTokenApi from "@/components/hooks/deviceToken/setDeviceToken";

const Home = () => {
  const { setDeviceToken } = useDeviceTokenApi();

  const { userDetails } = useUserDetails();
  const userEmail = sessionStorage.getItem("email");

  const navigate = useNavigate();

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const permissioin = await Notification.requestPermission();
    if (permissioin === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BJiGpffy-15nEOP6tGHpaPE7JEqkdcdPKXEZ7ZABEyRGDllvIFMjv6cOi3m2oBDXq5r7fUa58Fq0lFZiScuWj7k",
      });
      console.log(token);
      if (userEmail)
        setDeviceToken({
          user: userEmail,
          token: token,
        });
    } else if (permissioin === "denied") {
      warnAlert(2000, "You have denied notification permissions!!");
    }
  };

  const handleCardClick = (card: {
    code: string;
    html: string;
    linkType: string;
  }) => {
    if (card.linkType === "EXTERNAL_LINK") {
      window.open(card.html, "_blank", "noreferrer");
    } else if (card.linkType === "IFRAME_LINK") {
      navigate("/pwa/iframePg", { state: { iframeLink: card.html } });
    } else {
      if (card.linkType === "INTERNAL_LINK") {
        if (card.code === "AMGDEMO_GENAI") {
          navigate("/pwa/gen-ai/gpt-prompt");
        } else if (card.code === "AMGPWA_PATBOOK") {
          navigate("/pwa/Booking/patientMeetings");
        } else {
          alert("card code error");
        }
      } else {
        alert("card linktype error");
      }
    }
  };

  return (
    <div className="p-2 h-max pb-14">
      <div className="px-4 py-2 text-lg font-semibold">
        Welcome {userDetails?.startList.users[0].nickName},
      </div>
      <div className="p-2 flex justify-center flex-wrap gap-5 mobile:max-sm:gap-1 mobile:max-sm:p-1">
        {userDetails?.startList?.cards?.map((item, key) => {
          return (
            <Card
              className="rounded-xl bg-card-light-gray m-2 shadow-lg w-full"
              key={key}
            >
              <div className="px-4 pt-2">
                <CardHeader>
                  <div className="text-sm font-semibold text-text-light-gray">
                    {item.code}
                  </div>
                  <CardTitle className="text-text-blue">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {item.description}
                </CardContent>
              </div>
              <CardFooter>
                <button
                  className="bg-text-red p-3 px-8 rounded-md sm:text-xl text-white"
                  onClick={() => handleCardClick(item)}
                >
                  Start
                </button>
              </CardFooter>
            </Card>
          );
        })}
        {/* <Card className="w-[250px] h-[350px]  ">
          <CardHeader className="bg-red-600 ">
            <CardTitle>GEN-AI</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum nulla
            perspiciatis veniam mollitia cupiditate libero debitis error, itaque
            ipsum impedit deserunt, distinctio vel ratione saepe natus nesciunt
            labore, corrupti facilis?
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};
export default Home;
