import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useThemeContext } from "@/lib/context/themeContext";

const AppSetting = () => {
  const [themeState, setThemeState] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const root = document.querySelector(":root");
  const { setTheme } = useThemeContext();

  useEffect(() => {
    handleSetTheme();
  }, [themeState]);

  const handleSetTheme = () => {
    localStorage.setItem("theme", themeState ? "dark" : "light");
    setTheme(themeState ? "dark" : "light");
    if (themeState) root?.classList.add("dark");
    else root?.classList.remove("dark");
  };

  return (
    <div className="p-2 flex justify-center items-center">
      <label htmlFor="theme-switch">Dark Mode</label>
      <Switch
        id="theme-switch"
        checked={themeState}
        onClick={() => {
          setThemeState(!themeState);
        }}
      />
    </div>
  );
};
export default AppSetting;
