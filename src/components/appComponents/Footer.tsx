import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" sticky top-[100vh] bg-red-600 rounded text-white font-semibold pt-1 mt-2 w-full text-center">
        <div className="flex justify-around ">
          <h2 className="text-2xl">AMG</h2>
          <div className="flex w-1/6 justify-around p-1">
            <FaHome size={25} onClick={()=>{navigate(`home/${sessionStorage.getItem('email')}`);}}/>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
