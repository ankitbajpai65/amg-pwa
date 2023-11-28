import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/appComponents/Header";
import Footer from "../components/appComponents/Footer";

function Layout() {
  const root = document.querySelector(":root");

  useEffect(() => {
    const value = localStorage.getItem("theme");
    console.log("local storage", value);
    if (value === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  });
  return (
    <div className="w-screen h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
