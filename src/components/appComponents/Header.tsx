import image from "../../assets/loghi-03.png";
import msgIcon from "../../assets/icons/msg icon.png";
import notificationIcon from "../../assets/icons/Notifications icon.png";
import settingsIcon from "../../assets/icons/Settings icon.png";

import { useNavigate } from "react-router-dom";

import NativeIcons from "./NativeIcons";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-bg-header-gray px-2.5 py-2 flex items-center justify-between">
        <div className="flex items-center">
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
          >
            <NativeIcons image={notificationIcon} px={2} size={5} />
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;
