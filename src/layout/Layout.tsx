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
// import { useNotificationContext } from "@/lib/context/notificationContext.tsx";
import { notificationToast } from "@/components/appComponents/appAlert.tsx";

function Layout() {
  const [trigger, setTrigger] = useState(false);
  const [triggerData, setTriggerData] = useState({
    title: "",
    body: "",
  });
  const root = document.querySelector(":root");
  const { theme, setTheme } = useThemeContext();
  const { userDetails } = useUserDetails();

  const { getUserDetails } = useAmgStartApi();
  const { updateNotificationContext } = useUpdateNotificationContext();
  // const { notificationList } = useNotificationContext();

  const userEmail = sessionStorage.getItem("email");

  onMessage(messaging, (payload) => {
    console.log("yyo", payload);
    if (payload.notification) {
      const data = payload.notification;
      if (data?.title && data.body) {
        setTrigger(true);
        setTriggerData({
          title: data?.title,
          body: data.body,
        });
        notificationToast(data.title, data.body, 2000);
      }
    }
  });

  useEffect(() => {
    navigator.serviceWorker.ready.then((regisation) => {
      regisation.getNotifications().then((notif) => console.log(notif));
    });
  }, []);

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
      getUserDetails(userEmail as string);
    }
  }, [userDetails]);

  useEffect(() => {
    // console.log({ notificationList });
    if (trigger) {
      updateNotificationContext(triggerData);
      setTrigger(false);
    }
  }, [trigger]);

  return (
    <div className="w-full h-full border-box flex flex-col justify-between">
      <Header />
      <div className="grow overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
