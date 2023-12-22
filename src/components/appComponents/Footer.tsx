import { FaHome } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";




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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaRobot
                size={35}
                // onClick={() => {
                //   navigate("/pwa/genAi");
                // }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>GEN-AI</DropdownMenuLabel>
              <DropdownMenuSeparator></DropdownMenuSeparator>

              <DropdownMenuItem onClick={() => navigate("/pwa/gen-ai/gpt-prompt")}>
                GPT-Prompt
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/pwa/gen-ai/chat-with-your-files")}>
                Chat With Your Files
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
