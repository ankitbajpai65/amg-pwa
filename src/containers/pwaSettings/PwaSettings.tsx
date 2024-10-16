import { FaUser } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoHelpCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
// import { useUserDetails } from "@/lib/context/userDetailsContext";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import useAuthApi from "@/components/hooks/useAuthApi";
import Loader from "@/components/appComponents/Loader";
import { successAlert } from "@/components/appComponents/appAlert";
import { useTranslation } from "react-i18next";

const PwaSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { loading, logout } = useAuthApi();

  const handleLogout = async () => {
    const res = await logout();
    if (res.status === 200) {
      successAlert(1000, "Logged out successfully!");
      navigate("/");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("userName");
      localStorage.removeItem("userMobile");
    }
  };

  return (
    <div>
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">{t("settings.title")}</p>
        <p>{t("settings.desc")}</p>
      </div>
      <div>
        <div
          className="flex items-center justify-between px-8 py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/pwa/profile")}
        >
          <div className="flex items-center text-lg">
            <FaUser style={{ marginRight: "8px" }} size={20} />
            <p>{t("settings.options.profile")}</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        {/* <div
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
        </div> */}
        <div
          className="flex items-center justify-between px-8 py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/pwa/privacy&security")}
        >
          <div className="flex items-center text-lg">
            <MdPrivacyTip style={{ marginRight: "8px" }} size={20} />
            <p>{t("settings.options.privacySecurity")}</p>
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
            <p>{t("settings.options.notifications")}</p>
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
            <p>{t("settings.options.help")}</p>
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
                  <p>{t("settings.options.logout")}</p>
                </div>
                <div>
                  <IoIosArrowForward />
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="border rounded-md bg-white">
              <DialogHeader>
                <h1>{t("settings.options.logout")}</h1>
              </DialogHeader>

              <DialogDescription>
                {t("settings.logout.message")}
              </DialogDescription>
              <DialogFooter className="flex-row justify-center">
                <DialogClose>
                  <button
                    onClick={() => handleLogout()}
                    className="bg-text-red text-white rounded-md text-l p-1 m-2 px-2"
                  >
                    {t("settings.logout.title")}
                    {loading && (
                      <span className="px-2">
                        <Loader status={loading} size={4} />
                      </span>
                    )}
                  </button>
                </DialogClose>
                <DialogClose>
                  <button className="bg-white text-text-blue border border-text-blue rounded-md text-l p-1 m-2 px-2">
                    {t("settings.logout.btn2")}
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
