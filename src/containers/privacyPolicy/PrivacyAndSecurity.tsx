import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { Switch } from "@/components/ui/switch";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PrivacyAndSecurity = () => {
  const navigate = useNavigate();

  return (
    <>
      <BodyBackBtn btnText="Privacy and Security" />
      {/* body---------- */}
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Privacy and Security</p>
        <p>Manage your privacy preferences, security marketing and more.</p>
      </div>
      <div className="px-5">
        {/* Security settings */}
        <div className="mb-2 py-3 flex flex-col">
          <div className="text-text-light-gray py-2">
            <div className="flex items-center">
              <MdOutlineSecurity style={{ marginRight: "8px" }} size={16} />
              <p>Security</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="flex justify-between">
            <label htmlFor="faceId">Use Face ID for access</label>
            <Switch id="faceId" name="faceId" />
          </div>
          <div className="flex justify-between">
            <div className="pr-24">
              <label htmlFor="safetyLock">Automatic safety lock</label>
              <p className="text-xs text-text-light-gray">
                Face ID is required after 10 minutes of inactivity
              </p>
            </div>
            <Switch id="safetyLock" name="safetyLock" />
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center text-lg">
              <p>Change your email address</p>
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
              <p>Privacy</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          {/* Show full name and image toggle */}
          <div className="flex justify-between">
            <label htmlFor="faceId">Show full name and image</label>
            <Switch id="faceId" name="faceId" />
          </div>
          {/* Privacy Policy link */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center text-lg">
              <p>Privacy Policy</p>
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
              <p>Marketing</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="flex justify-between py-3">
            <div className="pr-14">
              <label htmlFor="safetyLock">Personalized emails</label>
              <p className="text-xs text-text-light-gray">
                I authorize GenAi Space to send me emails about products,
                services and offers that may be of interest to me.
              </p>
            </div>
            <Switch id="safetyLock" name="safetyLock" />
          </div>
          <div className="flex justify-between py-3">
            <div className="pr-14">
              <label htmlFor="safetyLock">Custom push notifications</label>
              <p className="text-xs text-text-light-gray">
                I authorize GenAi Space to send me push notifications about
                products, services and offers that may be of interest to me.
              </p>
            </div>
            <Switch id="safetyLock" name="safetyLock" />
          </div>
          <div className="flex justify-between py-3">
            <div className="pr-14">
              <label htmlFor="safetyLock">
                Advertising platforms and social media
              </label>
              <p className="text-xs text-text-light-gray">
                I authorize GenAi Space to share my data (name, email, and app
                events) with social and promotional platforms for advertising
                purposes and to conduct analytics.
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
