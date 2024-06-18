import { createContext, useContext, useState } from "react";

type notificaitonDataType =
  | {
      id: string;
      title: string;
      body: string;
    }[]
  | null;

type notificationProviderType = {
  children: React.ReactNode;
};

type notificationContextType = {
  notificationList: notificaitonDataType;
  setNotificationList: React.Dispatch<
    React.SetStateAction<notificaitonDataType>
  >;
};

export const notificationContext =
  createContext<notificationContextType | null>(null);

export default function NotificationProvider({
  children,
}: notificationProviderType) {
  const [notificationList, setNotificationList] =
    useState<notificaitonDataType>(null);

  return (
    <notificationContext.Provider
      value={{ notificationList, setNotificationList }}
    >
      {children}
    </notificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(notificationContext);
  if (!context) {
    throw new Error(
      "notif must be used within the context provider."
    );
  }
  return context;
}
