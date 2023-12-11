import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/appComponents/Header";
import Footer from "../components/appComponents/Footer";
import { useThemeContext } from "@/lib/context/themeContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import useAmgStartApi from "@/hooks/useAmgStartApi";

function Layout() {
  const root = document.querySelector(":root");
  const { theme } = useThemeContext();
  const { userDetails } = useUserDetails();

  const { getUserDetails } = useAmgStartApi();
  const  userEmail  = sessionStorage.getItem('email');

  useEffect(() => {
    if (theme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  });
  useEffect(() => {
    console.log({userDetails})
    if (!userDetails) getUserDetails(userEmail as string);
  }, []);

  return (
    <div className="w-screen h-screen border-box">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
