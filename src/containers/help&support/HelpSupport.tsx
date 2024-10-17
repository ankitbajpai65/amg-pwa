import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <BodyBackBtn btnText="Help and Support" />
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">{t("settings.help.title")}</p>
        <p>{t("settings.help.caption")}</p>
      </div>
      <div className="px-5">
        <div
          className="flex items-center justify-between py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/pwa/settings")}
        >
          <div className="flex items-center text-lg">
            <p>{t("settings.help.section1.title")}</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-border-light-gray cursor-pointer">
          <div className="flex items-center text-lg">
            <p>{t("settings.help.section2.title")}</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div
          className="flex items-center justify-between py-3 border-b border-border-light-gray cursor-pointer"
          onClick={() => navigate("/pwa/helpFaq")}
        >
          <div className="flex items-center text-lg">
            <p>{t("settings.help.section3.title")}</p>
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
