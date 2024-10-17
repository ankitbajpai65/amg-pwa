import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { t } from "i18next";

const UserProfile = () => {
  const [themeState, setThemeState] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const root = document.querySelector(":root");
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("userName");
  const userMobile = localStorage.getItem("userMobile");

  useEffect(() => {
    handleSetTheme();
  }, [themeState]);

  const handleSetTheme = () => {
    if (themeState === true) root?.classList.add("dark");
    else root?.classList.remove("dark");
  };

  return (
    <div>
      <BodyBackBtn btnText={t("settings.options.profile")} />
      <div className="py-4 px-5 text-text-blue">
        {/* <p className="text-lg font-semibold">Profile</p>
        <p>
          In this section you can edit all your personal and contact
          information.
        </p> */}
      </div>
      <div className="flex items-center px-5">
        <p className="w-fit border rounded-full p-1 px-2 m-1 text-white bg-text-red text-xs">
          {userName![0].toUpperCase()}
        </p>
        <p>
          {userName![0].toUpperCase()}
          {userName?.slice(1)}
        </p>
      </div>
      <>
        <form>
          <div className="mt-2 w-full py-2 text-l">
            <div className="py-4 px-5">
              <div className="mb-2 flex flex-col">
                <label htmlFor="name" className="pr-2 font-semibold">
                  {t("settings.profile.name")}
                </label>
                <input
                  className="rounded-md border p-1 px-2 border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="name"
                  id="name"
                  readOnly
                  // value={profileData.name}
                  value={`${userName![0].toUpperCase()}${userName?.slice(1)}`}
                  aria-readonly
                  // onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="nickName" className="pr-2 font-semibold">
                  {t("settings.profile.email")}
                </label>
                <input
                  className="rounded-md border  p-1 px-2 border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="nickName"
                  id="nickName"
                  readOnly
                  value={userEmail!}
                  // value={profileData.nickName}
                  // onChange={(e) => handleInputChange(e)}
                ></input>
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="tele1" className="pr-2 font-semibold">
                  {t("settings.profile.phone")}
                </label>
                <input
                  className="rounded-md border  p-1 px-2 border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="number"
                  id="phone"
                  readOnly
                  // value={profileData.phone}
                  value={userMobile!}
                  // onChange={(e) => handleInputChange(e)}
                ></input>
              </div>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />

            <div className="flex justify-between">
              <label htmlFor="theme-switch" className="px-5 py-4">
                {t("settings.profile.mode")}
              </label>

              <Switch
                id="theme-switch"
                name="theme"
                checked={themeState}
                onClick={() => {
                  setThemeState(!themeState);
                  // setBtnDisabled(false);
                }}
                className="my-4 mr-5"
              />
            </div>

            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>

          {/* <div className="w-full px-4 py-12">
            <button
              className={`${primaryBtnStyle}hover:border hover:border-black focus:bg-red-500 disabled:opacity-25`}
              type="submit"
              disabled={btnDisabled}
            >
              Save Edits
            </button>
          </div> */}
        </form>
      </>
    </div>
  );
};
export default UserProfile;
