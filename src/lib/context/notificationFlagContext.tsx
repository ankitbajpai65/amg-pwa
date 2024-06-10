import { createContext, useContext, useState } from "react";

type notificaitonFlagType = {
  newServiceFlagEmail: boolean;
  newServiceFlagPush: boolean;
  generalFlagEmail: boolean;
  generalFlagPush: boolean;
} | null;

type notificationFlagProviderType = {
  children: React.ReactNode;
};

type notificationFlagContextType = {
  notificationFlag: notificaitonFlagType;
  setNotificationFlag: React.Dispatch<
    React.SetStateAction<notificaitonFlagType>
  >;
};

export const notificationFlagContext =
  createContext<notificationFlagContextType | null>(null);

export default function NotificationFlagProvider({
  children,
}: notificationFlagProviderType) {
  const [notificationFlag, setNotificationFlag] =
    useState<notificaitonFlagType>(null);

  return (
    <notificationFlagContext.Provider
      value={{ notificationFlag, setNotificationFlag }}
    >
      {children}
    </notificationFlagContext.Provider>
  );
}

export function useNotificationFlagContext() {
  const context = useContext(notificationFlagContext);
  if (!context) {
    throw new Error("notif must be used within the context provider.");
  }
  return context;
}
