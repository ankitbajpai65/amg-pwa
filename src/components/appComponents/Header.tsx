import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="bg-red-600 rounded text-white font-semibold pt-1 mb-2 w-full text-center">
        <div className="flex justify-around ">
          <h2 className="text-2xl">AMG</h2>
          <div className="flex w-1/6 justify-around p-1">
            <IoIosNotificationsOutline size={25} />
            <FaRegUser size={25} />
          </div>
        </div>
        <p>Home</p>
      </div>
    </>
  );
};
export default Header;
