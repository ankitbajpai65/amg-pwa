import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [headerTitle, setHeaderTitle] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem("isLoggedIn");
  };
  useEffect(() => {
    if (pathname.includes("privacy")) {
      setHeaderTitle("Privacy Policy");
    } else if (pathname.includes("home")) {
      setHeaderTitle("Home");
    } else if (pathname.includes("setting")) {
      setHeaderTitle("Setting");
    } else {
      setHeaderTitle("404");
    }
  }, [pathname]);
  return (
    <>
      <div className="sticky top-0 bg-red-600 rounded-b-xl text-white font-semibold pt-1 mb-2 w-full text-center">
        <div className="flex justify-around ">
          <h2 className="text-2xl">AMG</h2>
          <div className="flex w-1/6 justify-around p-1 gap-2">
            <div className="border border-transparent">
              <IoIosNotificationsOutline size={25} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaRegUser size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onClick={() => navigate("/setting")}>
                  Setting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p>{headerTitle}</p>
      </div>
    </>
  );
};
export default Header;
