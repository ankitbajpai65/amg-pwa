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
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "@/lib/context/userDetailsContext";

const Header = () => {
  const navigate = useNavigate();
  const { userDetails } = useUserDetails();
  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      <div className="sticky top-0 bg-red-600 rounded-b-xl text-white font-semibold pt-1 mb-2 w-full text-center">
        <div className="flex justify-between px-5">
          <h2 className="text-2xl border rounded-full p-1 px-3 m-1 bg-gray-100 text-black">
            {userDetails?.startList.users[0].nickName.slice(0, 1).toUpperCase()}
          </h2>
          <div className="flex w-1/6 justify-around p-2 gap-2 mx-5 w-fit">
            <div className="border border-transparent">
              <IoIosNotificationsOutline size={35} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaRegUser size={30} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>

                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Privacy</DropdownMenuItem>
                <DropdownMenuItem>Change Password</DropdownMenuItem>
                <DropdownMenuItem>Map</DropdownMenuItem>
                <DropdownMenuItem>Notifications</DropdownMenuItem>
                <DropdownMenuItem>Sicurezze</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
