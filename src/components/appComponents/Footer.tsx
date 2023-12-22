import { FaHome } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { BsMenuDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      navigate(`/pwa/home/${sessionStorage.getItem("email")}`);
    }
  };
  return (
    <>
      <div className="fixed bottom-0 bg-red-600 rounded-t-xl text-white font-semibold pt-1 mt-2 w-full text-center">
        <div className="flex justify-around items-center p-2">
          <FaHome size={35} onClick={() => handleClick()} />
          <BsMenuDown size={35} />
          <IoChatboxEllipsesOutline
            size={35}
            onClick={() => navigate("/pwa/aibot")}
          />
        </div>
      </div>
    </>
  );
};
export default Footer;
