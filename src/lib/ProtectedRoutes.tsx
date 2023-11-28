import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
interface loginState {
  loginReducer: {
    isLoggedIn: boolean;
  };
}

export const ProtectedRoutes: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const loginReducerData = useSelector(
    (state: loginState) => state?.loginReducer
  );
  const user = loginReducerData.isLoggedIn;

  if (user === true) {
    return children;
  } else {
    alert("Unauthorised");
    return <Navigate to="/" />;
  }
};
