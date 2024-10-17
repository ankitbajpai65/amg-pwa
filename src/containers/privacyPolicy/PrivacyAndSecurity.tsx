import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import NewLoader from "@/components/appComponents/NewLoader";
import useUserDetailsApi from "@/components/hooks/useUserDetailsApi";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";
import { MdPrivacyTip } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type userPrivacyDetailsType = {
  faceId: boolean;
  fullName: boolean;
  personalizedEmail: boolean;
  pushNotifications: boolean;
  advertisingPlat: boolean;
};

const PrivacyAndSecurity = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { loading, getUserDetails, updatePrivacyDetails } = useUserDetailsApi();

  const [userPrivacyDetails, setUserPrivacyDetails] =
    useState<userPrivacyDetailsType>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await getUserDetails();
      console.log(res.response.privacy_policy);

      setUserPrivacyDetails({
        faceId: res.response.privacy_policy.Use_Face_ID_for_access,
        fullName: res.response.privacy_policy.Show_full_name_and_image,
        personalizedEmail: res.response.privacy_policy.Personalized_emails,
        pushNotifications:
          res.response.privacy_policy.Custom_push_notifications,
        advertisingPlat:
          res.response.privacy_policy.Advertising_platforms_and_social_media,
      });
    };
    fetchUserDetails();
  }, []);

  const handleSwitchChange = async (field: keyof userPrivacyDetailsType) => {
    console.log("handleSwitchChange runs", field);

    // @ts-ignore
    setUserPrivacyDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        // @ts-ignore
        [field]: !prevDetails[field],
      };

      const reqBody = {
        faceId: updatedDetails?.faceId,
        fullName: updatedDetails?.fullName,
        personalizedEmail: updatedDetails?.personalizedEmail,
        pushNotifications: updatedDetails?.pushNotifications,
        advertisingPlat: updatedDetails?.advertisingPlat,
      };

      updatePrivacyDetails(reqBody)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error("Error updating privacy details:", err);
        });
    });
  };

  if (loading) return <NewLoader />;

  return (
    <>
      <BodyBackBtn btnText={t("settings.privacySecurity.section1.title")} />
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
            <Switch
              id="faceId"
              name="faceId"
              checked={userPrivacyDetails?.faceId}
              onCheckedChange={() => handleSwitchChange("faceId")}
            />
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
            <Switch
              id="fullName"
              name="fullName"
              checked={userPrivacyDetails?.fullName}
              onCheckedChange={() => handleSwitchChange("fullName")}
            />
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
              <label htmlFor="personalizedEmail">
                {t("settings.privacySecurity.section4.subTitle1")}
              </label>
              <p className="text-xs text-text-light-gray">
                {t("settings.privacySecurity.section4.subDesc1")}
              </p>
            </div>
            <Switch
              id="personalizedEmail"
              name="personalizedEmail"
              checked={userPrivacyDetails?.personalizedEmail}
              onCheckedChange={() => handleSwitchChange("personalizedEmail")}
            />
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
            <Switch
              id="pushNotifications"
              name="pushNotifications"
              checked={userPrivacyDetails?.pushNotifications}
              onCheckedChange={() => handleSwitchChange("pushNotifications")}
            />
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
            <Switch
              id="advertisingPlat"
              name="advertisingPlat"
              checked={userPrivacyDetails?.advertisingPlat}
              onCheckedChange={() => handleSwitchChange("advertisingPlat")}
            />
          </div>
        </div>
      </div>
      {/* body---------- */}
    </>
  );
};
export default PrivacyAndSecurity;
