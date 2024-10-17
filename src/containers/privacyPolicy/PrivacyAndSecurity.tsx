import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PrivacyAndSecurity = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <BodyBackBtn btnText="Privacy and Security" />
      {/* body---------- */}
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">
          {t("settings.privacySecurity.section1.title")}
        </p>
        <p>{t("settings.privacySecurity.section1.desc")}</p>
      </div>
      <div className="px-5">
        {/* Security settings */}
        <div className="mb-2 py-3 flex flex-col">
          <div className="text-text-light-gray py-2">
            <div className="flex items-center">
              <MdOutlineSecurity style={{ marginRight: "8px" }} size={16} />
              <p>{t("settings.privacySecurity.section2.title")}</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="flex justify-between">
            <label htmlFor="faceId">
              {t("settings.privacySecurity.section2.text1")}
            </label>
            <Switch id="faceId" name="faceId" />
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center text-lg">
              <p>{t("settings.privacySecurity.section2.text2")}</p>
            </div>
            <div>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        {/* Privacy settings */}
        <div className="mb-2 py-3 flex flex-col">
          <div className="text-text-light-gray py-2">
            <div className="flex items-center">
              <MdPrivacyTip style={{ marginRight: "8px" }} size={16} />
              <p>{t("settings.privacySecurity.section3.title")}</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          {/* Show full name and image toggle */}
          <div className="flex justify-between">
            <label htmlFor="fullName">
              {t("settings.privacySecurity.section3.text1")}
            </label>
            <Switch id="fullName" name="fullName" />
          </div>
          {/* Privacy Policy link */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center text-lg">
              <p>{t("settings.privacySecurity.section3.text2")}</p>
            </div>
            <div
              onClick={() => {
                navigate("/pwa/privacy&security/privacyDisplay");
              }}
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>
        {/* Marketing settings */}
        <div className="mb-2 py-3 flex flex-col">
          <div className="text-text-light-gray py-2">
            <div className="flex items-center">
              <MdOutlineSecurity style={{ marginRight: "8px" }} size={16} />
              <p>{t("settings.privacySecurity.section4.title")}</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="flex justify-between py-3">
            <div className="pr-14">
              <label htmlFor="safetyLock">
                {t("settings.privacySecurity.section4.subTitle1")}
              </label>
              <p className="text-xs text-text-light-gray">
                {t("settings.privacySecurity.section4.subDesc1")}
              </p>
            </div>
            <Switch id="safetyLock" name="safetyLock" />
          </div>
          <div className="flex justify-between py-3">
            <div className="pr-14">
              <label htmlFor="safetyLock">
                {t("settings.privacySecurity.section4.subTitle2")}
              </label>
              <p className="text-xs text-text-light-gray">
                {t("settings.privacySecurity.section4.subDesc2")}
              </p>
            </div>
            <Switch id="safetyLock" name="safetyLock" />
          </div>
          <div className="flex justify-between py-3">
            <div className="pr-14">
              <label htmlFor="safetyLock">
                {t("settings.privacySecurity.section4.subTitle3")}
              </label>
              <p className="text-xs text-text-light-gray">
                {t("settings.privacySecurity.section4.subDesc1")}
              </p>
            </div>
            <Switch id="safetyLock" name="safetyLock" />
          </div>
        </div>
      </div>
      {/* body---------- */}
    </>
  );
};
export default PrivacyAndSecurity;
