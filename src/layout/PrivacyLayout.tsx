import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import image from "../assets/loghi-03.png";
import { useThemeContext } from "@/lib/context/themeContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import useAmgStartApi from "@/components/hooks/AmgMS/useAmgStartApi";

function PrivacyLayout() {
  const root = document.querySelector(":root");
  const { theme, setTheme } = useThemeContext();
  const { userDetails } = useUserDetails();

  const { getUserDetails } = useAmgStartApi();
  const userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    const getLocalStorageTheme = localStorage.getItem("theme");
    if (getLocalStorageTheme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
    setTheme(getLocalStorageTheme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (theme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    if (!userDetails) {
      getUserDetails(userEmail as string);
    }
  }, [userDetails]);

  return (
    <>
      {/* header---------- */}
      <div className="bg-bg-header-gray px-5 py-1">
        <div className="flex items-center">
          <div className="h-12 sm:h-14">
            <img className="h-full" src={image} />
          </div>
          <p className="flex text-text-blue sm:text-lg font-semibold">
            GEN<span className="text-text-red">A</span>I&nbsp;
            <span className="text-text-gray">SPACE</span>
            <span className="text-text-red">&nbsp;PWA</span>
          </p>
        </div>
      </div>
      {/* header---------- */}
      <Outlet />
      <div className="bg-bg-footer-red h-8 w-full mobile:sticky mobile:top-[100vh] sm:static sm:top-0"></div>
    </>
  );
}
export default PrivacyLayout;
