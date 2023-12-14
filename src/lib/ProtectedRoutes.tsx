import { errorAlert } from "@/components/appComponents/appAlert";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const ProtectedRoutes: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
const user = sessionStorage.getItem("isLoggedIn");
  if (user === "true") {
    return children;
  } else {
    errorAlert(3000, "Un-Authorised");
    return <Navigate to="/" />;
  }
};
