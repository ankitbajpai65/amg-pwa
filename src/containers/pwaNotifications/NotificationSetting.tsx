import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { successAlert } from "@/components/appComponents/appAlert";
import useSetNotificationFlagsApi from "@/components/hooks/notificationAPI/notificationFlag/updateNotificationFlag";
import { Switch } from "@/components/ui/switch";
import { useNotificationFlagContext } from "@/lib/context/notificationFlagContext";
import { primaryBtnStyle } from "@/lib/cssTailwind";
import { useEffect, useState } from "react";

const NotificationSetting = () => {
  const { notificationFlag, setNotificationFlag } =
    useNotificationFlagContext();
  const [notificationFlaglocal, setNotificationFlaglocal] = useState<{
    newServiceFlagEmail: boolean;
    newServiceFlagPush: boolean;
    generalFlagEmail: boolean;
    generalFlagPush: boolean;
  }>({
    newServiceFlagEmail: notificationFlag?.newServiceFlagEmail ?? false,
    newServiceFlagPush: notificationFlag?.newServiceFlagPush ?? false,
    generalFlagEmail: notificationFlag?.generalFlagEmail ?? false,
    generalFlagPush: notificationFlag?.generalFlagPush ?? false,
  });

  const [changeControlFlag, setChangeControlFlag] = useState(false);

  // const { getNotificationFlagStatusRes, getNotificationFlagStatus } =
  //   useGetNotificationFlagsApi();

  const { setNotificationFlagStatus, setNotificationFlagStatusRes } =
    useSetNotificationFlagsApi();

  let timer: NodeJS.Timeout;

  // useEffect(() => {
  //   if (notificationFlag) {
  //     setNotificationFlaglocal(() => notificationFlag);
  //   }
  // }, []);

  // useEffect(() => {
  //   getNotificationFlagStatus();
  // }, []);

  // useEffect(() => {
  //   if (getNotificationFlagStatusRes?.status === 200) {
  //     setNotificationFlag(() => ({
  //       newServiceFlagEmail:
  //         getNotificationFlagStatusRes.response.chat_email === "true"
  //           ? true
  //           : false,
  //       newServiceFlagPush:
  //         getNotificationFlagStatusRes.response.chat_push === "true"
  //           ? true
  //           : false,
  //       generalFlagEmail:
  //         getNotificationFlagStatusRes.response.general_email === "true"
  //           ? true
  //           : false,
  //       generalFlagPush:
  //         getNotificationFlagStatusRes.response.general_push === "true"
  //           ? true
  //           : false,
  //     }));
  //   }
  // }, [getNotificationFlagStatusRes]);

  useEffect(() => {
    if (
      notificationFlag &&
      (notificationFlaglocal.generalFlagEmail !==
        notificationFlag.generalFlagEmail ||
        notificationFlaglocal.generalFlagPush !==
          notificationFlag.generalFlagPush ||
        notificationFlaglocal.newServiceFlagEmail !==
          notificationFlag.newServiceFlagEmail ||
        notificationFlaglocal.newServiceFlagPush !==
          notificationFlag.newServiceFlagPush)
    ) {
      console.log(
        notificationFlaglocal.generalFlagEmail !==
          notificationFlag.generalFlagEmail ||
          notificationFlaglocal.generalFlagPush !==
            notificationFlag.generalFlagPush ||
          notificationFlaglocal.newServiceFlagEmail !==
            notificationFlag.newServiceFlagEmail ||
          notificationFlaglocal.newServiceFlagPush !==
            notificationFlag.newServiceFlagPush
      );
      setChangeControlFlag(true);
    }
  }, [notificationFlaglocal]);

  useEffect(() => {
    if (
      setNotificationFlagStatusRes?.response === "notification flag updated"
    ) {
      successAlert(1000, "Notification Setting Updated");
      setNotificationFlag(() => notificationFlaglocal);
    }
  }, [setNotificationFlagStatusRes]);

  const updateNotificationSettings = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setNotificationFlagStatus({
        generalEmailFlag: notificationFlaglocal.generalFlagEmail.toString(),
        generalPushFlag: notificationFlaglocal.generalFlagPush.toString(),
        newServiceEmailFlag:
          notificationFlaglocal.newServiceFlagEmail.toString(),
        newServicePushFlag: notificationFlaglocal.newServiceFlagPush.toString(),
      });
    }, 1000);
  };

  return (
    <div>
      <BodyBackBtn btnText="Notifications" />
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Notifications</p>
        <p>Choose what to be updated on.</p>
      </div>
      <div className="px-5 py-1">
        {/* <div className="flex justify-between">
          <label htmlFor="faceId">Use Face ID for access</label>
          <Switch id="faceId" name="faceId" />
        </div> */}
        {/* Notifications about new services */}
        <div className="mb-2 py-3 flex flex-col">
          <div className="text-text-light-gray py-2">
            <div className="flex items-center">
              <p>Notifications about new services</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="email">Email</label>
            <Switch
              id="email"
              name="email"
              checked={notificationFlaglocal?.generalFlagEmail}
              onClick={() =>
                setNotificationFlaglocal((prev) => ({
                  ...prev,
                  generalFlagEmail: !prev?.generalFlagEmail,
                }))
              }
            />
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="push">Push</label>
            <Switch
              id="push"
              name="push"
              checked={notificationFlaglocal?.generalFlagPush}
              onClick={() =>
                setNotificationFlaglocal((prev) => ({
                  ...prev,
                  generalFlagPush: !prev?.generalFlagPush,
                }))
              }
            />
          </div>
        </div>
        {/* Notifications about chat */}

        {/* <div className="mb-2 py-3 flex flex-col">
          <div className="text-text-light-gray py-2">
            <div className="flex items-center">
              <p>Notifications about chat Copy</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="email">Email</label>
            <Switch
              id="email"
              name="email"
              checked={notificationFlag?.generalFlagEmail}
              onClick={() =>
                setNotificationFlag((prev) => ({
                  ...prev,
                  generalFlagEmail: !prev?.generalFlagEmail,
                }))
              }
            />
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="push">Push</label>
            <Switch
              id="push"
              name="push"
              checked={notificationFlag?.generalFlagPush}
              onClick={() =>
                setNotificationFlag((prev) => ({
                  ...prev,
                  generalFlagPush: !prev?.generalFlagPush,
                }))
              }
            />
          </div>
        </div> */}

        <div className="w-full px-4 py-12">
          <button
            className={`${primaryBtnStyle}hover:border hover:border-black focus:bg-red-500 disabled:opacity-25`}
            onClick={() => updateNotificationSettings()}
            disabled={!changeControlFlag}
          >
            Save Edits
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotificationSetting;
