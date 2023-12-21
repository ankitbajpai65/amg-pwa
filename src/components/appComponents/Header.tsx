import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaMapLocation } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { CiBarcode } from "react-icons/ci";
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
  const { userDetails, setUserDetails } = useUserDetails();
  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("email");
    setUserDetails(null);
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

                <DropdownMenuItem onClick={() => navigate("/pwa/profile")}>
                  <FaUser style={{ paddingRight: "5px" }} size={25} />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/pwa/privacy")}>
                  <MdPrivacyTip style={{ paddingRight: "5px" }} size={25} />
                  Privacy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/changePassword")}>
                  <RiLockPasswordFill
                    style={{ paddingRight: "5px" }}
                    size={25}
                  />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/pwa/pwaMap")}>
                  <FaMapLocation style={{ paddingRight: "5px" }} size={25} />
                  Map
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IoMdNotifications
                    style={{ paddingRight: "5px" }}
                    size={25}
                  />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/pwa/qrScan")}>
                  <CiBarcode style={{ paddingRight: "5px" }} size={25} />
                  Scanner
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RiNotificationBadgeFill
                    style={{ paddingRight: "5px" }}
                    size={25}
                  />
                  Sicurezze
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogout()}>
                  <RiLogoutBoxFill style={{ paddingRight: "5px" }} size={25} />
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
