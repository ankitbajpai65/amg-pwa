import image from "../../assets/loghi-03.png";
import msgIcon from "../../assets/icons/msg icon.png";
import notificationIcon from "../../assets/icons/Notifications icon.png";
import settingsIcon from "../../assets/icons/Settings icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";

import NativeIcons from "./NativeIcons";
import { useNotificationContext } from "@/lib/context/notificationContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
// import { useEffect } from "react";

const Header = (props: { toggleSidebar?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  const { toggleSidebar } = props;
  const { notificationList } = useNotificationContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
  };

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

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button>
              <MdLanguage size={18} className="mt-2" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-6 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul className="py-1 text-gray-700">
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer text-center"
                    onClick={() => changeLanguage("en")}
                  >
                    en
                  </li>
                  <li
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer text-center"
                    onClick={() => changeLanguage("it")}
                  >
                    it
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
