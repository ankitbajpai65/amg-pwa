import { errorAlert } from "@/components/appComponents/appAlert";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const user = localStorage.getItem("isLoggedIn");
  console.log(user);

  if (user === "true") {
    return children;
  } else {
    errorAlert(3000, "You are unauthorized!");
    return <Navigate to="/" />;
  }
};
