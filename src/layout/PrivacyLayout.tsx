import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import image from "../assets/loghi-03.png";
import { useThemeContext } from "@/lib/context/themeContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import useAmgStartApi from "@/hooks/useAmgStartApi";

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
      <div className="bg-red-600 rounded h-20 text-white font-semibold mb-2 w-full text-center rounded-b-xl">
        <div className="flex justify-center items-center ">
          <p className="text-4xl font-bold">AMG</p>
          <img className="h-16" src={image}></img>
        </div>
      </div>
      <Outlet />
      <div className="rounded-t-xl bg-red-600 h-8 w-full mobile:sticky mobile:top-[100vh] sm:static sm:top-0"></div>
    </>
  );
}
export default PrivacyLayout;
