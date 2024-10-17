import { warnAlert } from "@/components/appComponents/appAlert";
import { messaging } from "@/firebase";
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import useDeviceTokenApi from "@/components/hooks/notificationAPI/deviceToken/setDeviceToken";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [printToken, setToken] = useState("");

  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("userName");

  const { setDeviceToken } = useDeviceTokenApi();
  const { t } = useTranslation();

  useEffect(() => {
    requestPermission();
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        // Register the service worker as soon as the app loads
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js", {
            scope: "/firebase-cloud-messaging-push-scope",
          })
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            );
            if (registration.installing) {
              console.log("Service worker installing");
            } else if (registration.waiting) {
              console.log("Service worker installed");
            } else if (registration.active) {
              console.log("Service worker active");
            }
            // Include below mentioned validations
            if (!("PushManager" in window)) {
              console.log("Push messaging isn't supported.");
              return;
            }
            //
            if (Notification.permission === "denied") {
              console.log("The user has blocked notifications.");
              return;
            }
          })
          .catch((err) => {
            console.log("Service worker registration failed, error:", err);
          });
      });
    }
  }, []);

  const requestPermission = async () => {
    console.log("YOYO-REQ");
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BJiGpffy-15nEOP6tGHpaPE7JEqkdcdPKXEZ7ZABEyRGDllvIFMjv6cOi3m2oBDXq5r7fUa58Fq0lFZiScuWj7k",
        }).catch(async (err) => {
          const error =
            "AbortError: Failed to execute 'subscribe' on 'PushManager': Subscription failed - no active Service Worker";
          if (err.toString() === error) {
            const token = await getToken(messaging, {
              vapidKey:
                "BJiGpffy-15nEOP6tGHpaPE7JEqkdcdPKXEZ7ZABEyRGDllvIFMjv6cOi3m2oBDXq5r7fUa58Fq0lFZiScuWj7k",
            });
            return token;
          } else {
            throw err;
          }
        });
        if (token) {
          setToken(token);
          console.log(":::currentToken1", token);
          setDeviceToken({
            token: token,
          });
        } else {
          console.log("No registration token available.");
          requestPermission();
        }
      } else if (permission === "denied") {
        warnAlert(2000, "You have denied notification permissions!!");
      }
    }
    console.log(":::currentToken2", printToken, userEmail);
  };

  return (
    <div className="h-full p-2">
      <div className="h-full flex items-center justify-center px-4 py-2 text-lg font-semibold">
        <h1 className="text-center text-4xl mb-8">
          {t("greetings")} {userName}
        </h1>
      </div>
      <div className="p-2 flex justify-center flex-wrap gap-5 mobile:max-sm:gap-1 mobile:max-sm:p-1"></div>
    </div>
  );
};
export default Home;
