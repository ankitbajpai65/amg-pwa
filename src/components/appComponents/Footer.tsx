import { FaHome } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdDocumentScanner } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate(`/pwa/home`);
      // navigate("/pwa/genaiservices/gpt-prompt");
    }
  };
  return (
    <>
      <div className="border border-blue-600 bg-bg-footer-red text-white pt-1 mt-2 py-2 w-full text-center">
        <div className="flex justify-around items-center p-2">
          <div className="flex flex-col items-center">
            <FaHome size={20} onClick={() => handleClick()} title="Home" />
            <p className="text-xs">Home</p>
          </div>

          <div className="flex flex-col items-center">
            <FaLaptopCode
              size={20}
              title="Scanner"
              onClick={() => navigate("/pwa/genaiservices/gpt-prompt")}
            />
            <p className="text-xs">GenAISpace</p>
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
          <div className="flex flex-col items-center">
            <MdDocumentScanner
              style={{ paddingRight: "5px" }}
              size={25}
              title="Scanner"
              onClick={() => navigate("/pwa/qrScan")}
            />
            <p className="text-xs">Scan</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
