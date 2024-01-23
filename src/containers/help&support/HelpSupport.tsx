import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();

  return (
    <div>
      <BodyBackBtn btnText="Help and Support" />
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Help and Support</p>
        <p>Find suggestions and answers to your doubts and questions.</p>
      </div>
      <div className="px-5">
        <div
          className="flex items-center justify-between py-3 border-b border-border-light-gray"
          onClick={() => navigate("/pwa/settings")}
        >
          <div className="flex items-center text-lg">
            <p>Get Started</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-border-light-gray">
          <div className="flex items-center text-lg">
            <p>What is a Copilot</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className="flex items-center justify-between py-3 border-b border-border-light-gray"
          onClick={() => navigate("/pwa/helpFaq")}
        >
          <div className="flex items-center text-lg">
            <p>Help and FAQ</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HelpSupport;
