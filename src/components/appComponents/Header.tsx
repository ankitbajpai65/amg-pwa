import image from "../../assets/loghi-03.png";
import msgIcon from "../../assets/icons/msg icon.png";
import notificationIcon from "../../assets/icons/Notifications icon.png";
import settingsIcon from "../../assets/icons/Settings icon.png";
import { GiHamburgerMenu } from "react-icons/gi";

import { useLocation, useNavigate } from "react-router-dom";

import NativeIcons from "./NativeIcons";
import { useNotificationContext } from "@/lib/context/notificationContext";
import { useEffect } from "react";

const Header = (props: { toggleSidebar: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSidebar } = props;
  const { notificationList } = useNotificationContext();

  useEffect(() => {
    console.log(notificationList);
  }, [notificationList]);
  return (
    <>
      <div className="bg-bg-header-gray px-2.5 py-2 flex items-center justify-between">
        <div className="flex items-center">
          {location.pathname.endsWith("genaiservices/gpt-prompt") && (
            <GiHamburgerMenu
              onClick={toggleSidebar}
              className="cursor-pointer"
            />
          )}
          <div className="h-12 sm:h-14">
            <img className="h-full" src={image} />
          </div>
          <p className="flex text-text-blue sm:text-lg font-semibold">
            GEN<span className="text-text-red">A</span>I&nbsp;
            <span className="text-text-gray">SPACE</span>
            <span className="text-text-red">&nbsp;PWA</span>
          </p>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              navigate("/pwa/aibot/");
            }}
          >
            <NativeIcons image={msgIcon} px={2} size={4} />
          </button>
          <button
            onClick={() => {
              navigate("/pwa/settings/");
            }}
          >
            <NativeIcons image={settingsIcon} px={2} size={5} />
          </button>
          <button
            onClick={() => {
              navigate("/pwa/notifications/");
            }}
            className="relative"
          >
            <NativeIcons image={notificationIcon} px={2} size={5} />
            {notificationList && notificationList?.length > 0 && (
              <div className="absolute -top-2 right-1 text-xs bg-red-500 rounded-full h-4 w-4 flex items-center justify-center">
                {notificationList?.length}
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;
