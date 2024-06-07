import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoHelpCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const PwaSettings = () => {
  const navigate = useNavigate();

  const { setUserDetails } = useUserDetails();

  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("email");
    setUserDetails(null);
  };
  return (
    <div>
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Settings</p>
        <p>Change your settings and information.</p>
      </div>
      <div>
        <div
          className="flex items-center justify-between px-8 py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/pwa/profile")}
        >
          <div className="flex items-center text-lg">
            <FaUser style={{ marginRight: "8px" }} size={20} />
            <p>Profile</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className="flex items-center justify-between px-8 py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/changePassword")}
        >
          <div className="flex items-center text-lg">
            <RiLockPasswordFill style={{ marginRight: "8px" }} size={20} />
            <p>Change Password</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className="flex items-center justify-between px-8 py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/pwa/privacy&security")}
        >
          <div className="flex items-center text-lg">
            <MdPrivacyTip style={{ marginRight: "8px" }} size={20} />
            <p>Privacy and Security</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className="flex items-center justify-between px-8 py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/pwa/notificationSetting")}
        >
          <div className="flex items-center text-lg">
            <IoMdNotifications style={{ marginRight: "8px" }} size={20} />
            <p>Notifications</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className="flex items-center justify-between px-8 py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/pwa/help&support")}
        >
          <div className="flex items-center text-lg">
            <IoHelpCircle style={{ marginRight: "8px" }} size={20} />
            <p>Help And Support</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>

        <div className="px-8 py-3 border-b border-border-light-gray">
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-lg">
                  <RiLogoutBoxFill style={{ marginRight: "8px" }} size={20} />
                  <p>Logout</p>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="border rounded-md">
              <DialogHeader>
                <h1>Logout</h1>
              </DialogHeader>

              <DialogDescription>
                Do you want to log out of your account?
              </DialogDescription>
              <DialogFooter className="flex-row justify-center">
                <DialogClose>
                  <button
                    onClick={() => handleLogout()}
                    className="bg-text-red text-white rounded-md text-l p-1 m-2 px-2"
                  >
                    Logout
                  </button>
                </DialogClose>
                <DialogClose>
                  <button className="bg-white text-text-blue border border-text-blue rounded-md text-l p-1 m-2 px-2">
                    Cancel
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default PwaSettings;
