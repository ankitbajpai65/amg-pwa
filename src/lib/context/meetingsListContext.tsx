import { createContext, useContext, useState } from "react";
import { AppointmentsListType } from "../types";

type meetingListProviderType = {
  children: React.ReactNode;
};

type meetingListContextType = {
  meetingList: AppointmentsListType;
  setMeetingList: React.Dispatch<React.SetStateAction<AppointmentsListType>>;
};

export const meetingListContext = createContext<meetingListContextType | null>(
  null
);

export default function MeetingListProvider({
  children,
}: meetingListProviderType) {
  const [meetingList, setMeetingList] = useState<AppointmentsListType>(null);

  return (
    <meetingListContext.Provider value={{ meetingList, setMeetingList }}>
      {children}
    </meetingListContext.Provider>
  );
}

export function useMeetingListContext() {
  const context = useContext(meetingListContext);
  if (!context) {
    throw new Error(
      "usePatientListContext must be used within the context provider."
    );
  }
  return context;
}
