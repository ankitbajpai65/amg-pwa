import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import BodyBackBtn from "@/components/appComponents/BodyBackBtn";

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
      <BodyBackBtn btnText="Profile" />
      <div className="py-4 px-5 text-text-blue">
        {/* <p className="text-lg font-semibold">Profile</p>
        <p>
          In this section you can edit all your personal and contact
          information.
        </p> */}
      </div>
      <div className="flex items-center px-5">
        <p className="w-fit border rounded-full p-1 px-2 m-1 text-white bg-text-red text-xs">
          {/* {profileData.nickName.slice(0, 1).toUpperCase()} */}
          {userName![0].toUpperCase()}
        </p>
        <p>{userEmail}</p>
      </div>
      <>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <div className="mt-2 w-full py-2 text-l">
            <div className="py-4 px-5">
              <div className="mb-2 flex flex-col">
                <label htmlFor="name" className="pr-2 font-semibold">
                  Name
                </label>
                <input
                  className="rounded-md border p-1 px-2 border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="name"
                  id="name"
                  readOnly
                  // value={profileData.name}
                  value={userName!}
                  aria-readonly
                  // onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="nickName" className="pr-2 font-semibold">
                  Email
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
                  Phone
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
              {/* <div className="mb-2 flex flex-col">
                <label htmlFor="tele2" className="pr-2 font-semibold">
                  Telephone 2
                </label>
                <input
                  className="rounded-md border  p-1 px-2 border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="number"
                  id="phone2"
                  placeholder="Please enter Telephone number"
                  value={profileData.phone2}
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </div> */}
              {/* <div className="mb-2 flex flex-col">
                <label htmlFor="cell" className="pr-2 font-semibold">
                  Cellphone
                </label>
                <input
                  className="rounded-md border  p-1 px-2 border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="number"
                  id="phoneCell"
                  placeholder="Please enter Telephone number"
                  value={profileData.phoneCell}
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </div> */}
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />

            {/* <div className="mb-2 px-5 py-4 flex flex-col accent-red-500">
              <p className="pr-2 pb-2 font-semibold">Language</p>
              <div className="text-left">
                <input
                  className=""
                  type="radio"
                  id="en"
                  name="language"
                  checked={profileData.language === "EN"}
                  value="EN"
                  onChange={(e) => handleInputChange(e)}
                ></input>
                <label htmlFor="en" className="pl-2 mr-4">
                  EN
                </label>
                <input
                  className=""
                  type="radio"
                  id="it"
                  name="language"
                  checked={profileData.language === "IT"}
                  value="IT"
                  onChange={(e) => handleInputChange(e)}
                ></input>
                <label htmlFor="it" className="pl-2 mr-4">
                  IT
                </label>{" "}
                <input
                  className=""
                  type="radio"
                  id="fr"
                  name="language"
                  placeholder="Please enter Language"
                  checked={profileData.language === "FR"}
                  value="FR"
                  onChange={(e) => handleInputChange(e)}
                ></input>
                <label htmlFor="fr" className="pl-2 mr-4">
                  FR
                </label>{" "}
                <input
                  className=""
                  type="radio"
                  id="sp"
                  name="language"
                  placeholder="Please enter Language"
                  checked={profileData.language === "SP"}
                  value="EN"
                  onChange={(e) => handleInputChange(e)}
                ></input>
                <label htmlFor="sp" className="pl-2 mr-4">
                  SP
                </label>
                <input
                  className=""
                  type="radio"
                  id="de"
                  name="language"
                  placeholder="Please enter Language"
                  checked={profileData.language === "DE"}
                  value="DE"
                  onChange={(e) => handleInputChange(e)}
                ></input>
                <label htmlFor="de" className="pl-2 mr-4">
                  DE
                </label>
              </div>
            </div> */}
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />

            <div className="flex justify-between">
              <label htmlFor="theme-switch" className="px-5 py-4">
                Dark Mode
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
