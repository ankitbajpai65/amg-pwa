import {createContext, useContext, useState } from "react";
import { userDetailsType } from "../types";

type useUserDetailsProviderType = {
  children: React.ReactNode;
};

type userDetailsContextType = {
  userDetails: userDetailsType;
  setUserDetails: React.Dispatch<React.SetStateAction<null>>;
};

export const userDetailsContext = createContext<userDetailsContextType|null>(null)

export default function UserDetailsProvider({children}:useUserDetailsProviderType){
const [userDetails, setUserDetails] = useState(null);

    return(
        <userDetailsContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </userDetailsContext.Provider>
    )
}

export function useUserDetails(){
     const context = useContext(userDetailsContext);
  if (!context) {
    throw new Error(
      "useEraserDetail must be used within the context provider."
    );
  }
  return context;
}
