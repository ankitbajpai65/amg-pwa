import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    if(sessionStorage.getItem('isLoggedIn')==='true'){
      navigate(`home/${sessionStorage.getItem('email')}`);
    }
  }
  return (
    <>
      <div className="fixed bottom-0 bg-red-600 rounded-t-xl text-white font-semibold pt-1 mt-2 w-full text-center">
        <div className="flex justify-around items-center">
          <h2 className="text-2xl">AMG</h2>
          <div className="flex w-1/6 justify-around p-1">
            <FaHome size={35} onClick={() => handleClick()} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
