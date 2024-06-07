import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CiBarcode } from "react-icons/ci";
// import { FaCalendarDay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";


const Footer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      // navigate(`/pwa/home`);
      navigate("/pwa/genaiservices/gpt-prompt");
    }
  };
  return (
    <>
      <div className="bg-bg-footer-red text-white pt-1 mt-2 py-2 w-full text-center">
        <div className="flex justify-around items-center p-2">
          <div className="flex flex-col items-center">
            <FaHome size={20} onClick={() => handleClick()} title="Home" />
            <p className="text-xs">Home</p>
          </div>
          <div className="flex flex-col items-center">
            <FaLocationDot
              style={{ paddingRight: "5px" }}
              size={20}
              title="Map"
              onClick={() => navigate("/pwa/pwaMap")}
            />
            <p className="text-xs">Map</p>
          </div>
          {/* <div className="flex flex-col items-center">
            <FaCalendarDay
              style={{ paddingRight: "5px" }}
              size={20}
              title="Map"
              onClick={() => navigate("/pwa/calendar")}
            />
            <p className="text-xs">Calendar</p>
          </div> */}
          <div className="flex flex-col items-center">
            <FaLaptopCode
              style={{ paddingRight: "5px" }}
              size={20}
              title="Scanner"
              onClick={() => navigate("/pwa/gen-ai/gpt-prompt")}
            />
            <p className="text-xs">Gpt Prompt</p>
          </div>
          <div className="flex flex-col items-center">
            <CiBarcode
              style={{ paddingRight: "5px" }}
              size={25}
              title="Scanner"
              onClick={() => navigate("/pwa/qrScan")}
            />
            <p className="text-xs">Scan</p>
          </div>
          <div className="flex flex-col items-center">
            <HiMiniChatBubbleBottomCenterText
              style={{ paddingRight: "5px" }}
              size={25}
              title="Scanner"
              onClick={() => navigate("/pwa/gen-ai/chat-with-your-files")}
            />
            <p className="text-xs">File Chat</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
