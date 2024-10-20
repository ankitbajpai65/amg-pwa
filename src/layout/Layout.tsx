import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/appComponents/Header";
import Footer from "../components/appComponents/Footer";
import { useThemeContext } from "@/lib/context/themeContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import useAmgStartApi from "@/components/hooks/AmgMS/useAmgStartApi.tsx";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase.tsx";
import useUpdateNotificationContext from "../components/hooks/updateNotificationContext/notif.tsx";
import { notificationToast } from "@/components/appComponents/appAlert.tsx";
import useGetNotificationListApi from "@/components/hooks/notificationAPI/notificationList/getNotificationList.tsx";
import { useNotificationContext } from "@/lib/context/notificationContext.tsx";
import useGetNotificationFlagsApi from "@/components/hooks/notificationAPI/notificationFlag/getNotificationFlagStatus";
import { useNotificationFlagContext } from "@/lib/context/notificationFlagContext";

function Layout() {
  const [trigger, setTrigger] = useState(false);
  const [backgroundListnerControlFlag, setBackgroundListnerControlFlag] =
    useState(true);
  const [triggerData, setTriggerData] = useState({
    id: "",
    title: "",
    body: "",
  });
  const root = document.querySelector(":root");
  const { theme, setTheme } = useThemeContext();
  const { userDetails } = useUserDetails();

  // console.log(userDetails)

  const { getUserDetails } = useAmgStartApi();
  const { updateNotificationContext } = useUpdateNotificationContext();
  const { getNotificationListApi, getNotificationListRes } =
    useGetNotificationListApi();
  const { setNotificationList } = useNotificationContext();

  const userEmail = localStorage.getItem("email");
  const { getNotificationFlagStatus, getNotificationFlagStatusRes } =
    useGetNotificationFlagsApi();
  const { setNotificationFlag } = useNotificationFlagContext();

  try {
    onMessage(messaging, (payload) => {
      console.log("yyo", payload);
      if (payload.data) {
        const data = payload.data;
        if (data?.title && data.body) {
          setTrigger(true);
          setTriggerData({
            id: "new Notification",
            title: data?.title,
            body: data.body,
          });
          notificationToast(data.title, data.body, 2000);
        }
      }
    });
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    getNotificationFlagStatus();
  }, []);

  // const navigate = useNavigate();

  useEffect(() => {
    if (getNotificationFlagStatusRes?.status === 200) {
      setNotificationFlag(() => ({
        newServiceFlagEmail:
          getNotificationFlagStatusRes?.response?.chat_email === "true"
            ? true
            : false,
        newServiceFlagPush:
          getNotificationFlagStatusRes?.response?.chat_push === "true"
            ? true
            : false,
        generalFlagEmail:
          getNotificationFlagStatusRes?.response?.general_email === "true"
            ? true
            : false,
        generalFlagPush:
          getNotificationFlagStatusRes?.response?.general_push === "true"
            ? true
            : false,
      }));
    }
  }, [getNotificationFlagStatusRes]);

  useEffect(() => {
    navigator.serviceWorker.ready.then((regisation) => {
      regisation.getNotifications().then((notif) => console.log(notif));
    });
  }, []);

  useEffect(() => {
    if (backgroundListnerControlFlag || trigger) {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          console.log("Background Listner");
          console.log(document.visibilityState);
          getNotificationListApi();
        }
      });
    }
  }, [trigger]);

  useEffect(() => {
    console.log("foreground Page Change");
    getNotificationListApi();
  }, []);

  useEffect(() => {
    setBackgroundListnerControlFlag(false);
    if (getNotificationListRes && getNotificationListRes?.length > 0) {
      console.log("TRIGGER UPDATE COTEXT");
      console.log(getNotificationListRes);
      const tempNotificationArray = getNotificationListRes.map((item) => {
        return {
          id: item.notificationID,
          title: item.notificationTitle,
          body: item.notificationMsg,
        };
      });
      setNotificationList(tempNotificationArray);
    }
  }, [getNotificationListRes]);

  useEffect(() => {
    const getLocalStorageTheme = localStorage.getItem("theme");
    if (getLocalStorageTheme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
    setTheme(getLocalStorageTheme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (theme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    if (!userDetails) {
      getUserDetails({
        emailId: userEmail as string,
        customerId: "AMGDEMO",
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (trigger) {
      console.log("Foreground");
      updateNotificationContext(triggerData);
      setTrigger(false);
      getNotificationListApi();
    }
  }, [trigger]);

  return (
    <div className="w-full h-full border-box flex flex-col justify-between">
      <Header />
      {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      <div className="grow overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
