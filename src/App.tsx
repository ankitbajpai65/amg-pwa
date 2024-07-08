import { useEffect } from "react";
import Login from "./containers/login/Login";
import { useThemeContext } from "./lib/context/themeContext";
// import Home from "./containers/home/Home";
import { Navigate } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const root = document.querySelector(":root");
  const { theme, setTheme } = useThemeContext();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const getLocalStorageTheme = localStorage.getItem("theme");
    if (getLocalStorageTheme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
    setTheme(getLocalStorageTheme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (theme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
    // console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  }, [theme]);

  return (
    <div className="w-full h-full">
      {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}> */}
      {/* <Login /> */}
      {!isLoggedIn ? <Login /> : <Navigate to="home/" replace={true} />}
      {/* </GoogleOAuthProvider> */}
    </div>
  );
}

export default App;
