import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "@/containers/login/loginSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch(setIsLoggedIn(false));
  };
  return (
    <>
      <div className="bg-red-600 rounded text-white font-semibold pt-1 mb-2 w-full text-center">
        <div className="flex justify-around ">
          <h2 className="text-2xl">AMG</h2>
          <div className="flex w-1/6 justify-around p-1">
            <IoIosNotificationsOutline size={25} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaRegUser size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p>Home</p>
      </div>
    </>
  );
};
export default Header;
