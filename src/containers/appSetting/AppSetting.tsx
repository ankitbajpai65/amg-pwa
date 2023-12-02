import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

const AppSetting = () => {
  const [theme, setTheme] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const root = document.querySelector(":root");

  useEffect(() => {
    handleSetTheme();
  }, [theme]);

  const handleSetTheme = () => {
    localStorage.setItem("theme", theme ? "dark" : "light");
    console.log("local storage", theme ? "dark" : "light");
    if (theme) root?.classList.add("dark");
    else root?.classList.remove("dark");
  };

  return (
    <div className="p-2 flex justify-center items-center">
      <label htmlFor="theme-switch">Dark Mode</label>
      <Switch
        id="theme-switch"
        checked={theme}
        onClick={() => {
          setTheme(!theme);
        }}
      />
    </div>
  );
};
export default AppSetting;
