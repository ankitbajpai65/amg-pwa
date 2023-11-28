import { FaHome } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <div className="sticky top-[100vh] bg-red-600 rounded text-white font-semibold pt-1 mt-2 w-full text-center">
        <div className="flex justify-around ">
          <h2 className="text-2xl">AMG</h2>
          <div className="flex w-1/6 justify-around p-1">
            <FaHome size={25} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
