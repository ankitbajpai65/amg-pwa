import { useSelector } from "react-redux";
import Login from "./containers/login/Login";
import { useEffect } from "react";

interface loginState {
  loginReducer: {
    theme: string;
  };
}
function App() {
  const root = document.querySelector(":root");
  const loginReducerData = useSelector(
    (state: loginState) => state?.loginReducer
  );

  useEffect(() => {
    const value = localStorage.getItem("theme");
    console.log("local storage", value);
    if (value === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  }, []);

  useEffect(() => {
    console.log(loginReducerData);
    const value = loginReducerData.theme;
    if (value === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  }, [loginReducerData]);

  return (
    <div className="border-box m-2 h-screen flex items-center">
      <Login />
    </div>
  );
}

export default App;
