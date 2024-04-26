import { createContext, useContext, useState } from "react";
import { PatientsListType } from "../types";

type patientListProviderType = {
  children: React.ReactNode;
};

type patientListContextType = {
  patientList: PatientsListType;
  setPatientList: React.Dispatch<React.SetStateAction<PatientsListType>>;
};

export const patientListContext = createContext<patientListContextType | null>(
  null
);

export default function PatientListProvider({
  children,
}: patientListProviderType) {
  const [patientList, setPatientList] = useState<PatientsListType>(null);

  return (
    <patientListContext.Provider value={{ patientList, setPatientList }}>
      {children}
    </patientListContext.Provider>
  );
}

export function usePatientListContext() {
  const context = useContext(patientListContext);
  if (!context) {
    throw new Error(
      "usePatientListContext must be used within the context provider."
    );
  }
  return context;
}
