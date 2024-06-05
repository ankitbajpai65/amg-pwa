import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/appComponents/Header";
import Footer from "../components/appComponents/Footer";
import { useThemeContext } from "@/lib/context/themeContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import useAmgStartApi from "@/components/hooks/AmgMS/useAmgStartApi";
// import Sidebar from "@/containers/genAi/Sidebar";

function Layout() {
  const root = document.querySelector(":root");
  const { theme, setTheme } = useThemeContext();
  const { userDetails } = useUserDetails();

  // console.log(userDetails)

  const { getUserDetails } = useAmgStartApi();
  const userEmail = sessionStorage.getItem("email");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
      getUserDetails({
        emailId: userEmail as string,
        customerId: "AMGDEMO",
      });
    }
  }, [userDetails]);

  return (
    <div className="w-full h-full border-box flex flex-col justify-between">
      <Header toggleSidebar={toggleSidebar} />
      {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      <div className="grow overflow-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
