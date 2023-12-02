import { useEffect } from "react";
import Login from "./containers/login/Login";
import { useThemeContext } from "./lib/context/themeContext";

function App() {
  const root = document.querySelector(":root");
  const {setTheme } = useThemeContext();

  useEffect(() => {
    const getLocalStorageTheme = localStorage.getItem("theme");
    if (getLocalStorageTheme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
    setTheme(getLocalStorageTheme==='dark' ? 'dark' : "light");
  }, []);
  return (
    <div className="border-box sm:m-2 h-screen flex items-center mobile:m-0">
      <Login />
    </div>
  );
}

export default App;
