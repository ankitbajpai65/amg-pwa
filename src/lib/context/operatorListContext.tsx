import { createContext, useContext, useState } from "react";
import {  OperatorsListType } from "../types";

type operatorListProviderType = {
  children: React.ReactNode;
};

type operatorListContextType = {
  operatorList: OperatorsListType;
  setOperatorList: React.Dispatch<React.SetStateAction<OperatorsListType>>;
};

export const operatorListContext =
  createContext<operatorListContextType | null>(null);

export default function OperatorListProvider({
  children,
}: operatorListProviderType) {
  const [operatorList, setOperatorList] = useState<OperatorsListType>(null);

  return (
    <operatorListContext.Provider value={{ operatorList, setOperatorList }}>
      {children}
    </operatorListContext.Provider>
  );
}

export function useOperatorListContext() {
  const context = useContext(operatorListContext);
  if (!context) {
    throw new Error(
      "usePatientListContext must be used within the context provider."
    );
  }
  return context;
}
