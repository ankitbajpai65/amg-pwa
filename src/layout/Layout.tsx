import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/appComponents/Header";
import Footer from "../components/appComponents/Footer";
import { useThemeContext } from "@/lib/context/themeContext";

function Layout() {
  const root = document.querySelector(":root");
  const {theme} = useThemeContext()
  useEffect(() => {
    if (theme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  });
  return (
    <div className="w-screen h-screen border-box">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
