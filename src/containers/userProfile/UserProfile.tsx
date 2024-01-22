import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useThemeContext } from "@/lib/context/themeContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import useAmgUsersApi from "@/hooks/useAmgUsersApi";
import { useNavigate } from "react-router-dom";
import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { primaryBtnStyle } from "@/lib/cssTailwind";

type Inputs = {
  name: string;
  nickName: string;
  phone: string;
  phone2: string;
  phoneCell: string;
  language: string;
  theme: string;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { userUpdateRes, setUserUpdate } = useAmgUsersApi();
  const [themeState, setThemeState] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const root = document.querySelector(":root");
  const { setTheme } = useThemeContext();
  const { userDetails, setUserDetails } = useUserDetails();
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [profileData, setProfileData] = useState<Inputs>({
    name: userDetails?.startList.users[0].description
      ? userDetails?.startList.users[0].description
      : "",
    nickName: userDetails?.startList.users[0].nickName
      ? userDetails?.startList.users[0].nickName
      : "",
    phone: userDetails?.startList.users[0].phone
      ? userDetails?.startList.users[0].phone
      : "",
    phone2: userDetails?.startList.users[0].phone2
      ? userDetails?.startList.users[0].phone2
      : "",
    phoneCell: userDetails?.startList.users[0].phoneCell
      ? userDetails?.startList.users[0].phoneCell
      : "",
    language: userDetails?.startList.users[0].language
      ? userDetails?.startList.users[0].language
      : "",
    theme: userDetails?.startList.users[0].darkLight ?? "",
  });

  useEffect(() => {
    handleSetTheme();
  }, [themeState]);

  useEffect(() => {
    if (userDetails) {
      setProfileData({
        name: userDetails?.startList.users[0].description ?? "",
        nickName: userDetails?.startList.users[0].nickName
          ? userDetails?.startList.users[0].nickName
          : "",
        phone: userDetails?.startList.users[0].phone
          ? userDetails?.startList.users[0].phone
          : "",
        phone2: userDetails?.startList.users[0].phone2
          ? userDetails?.startList.users[0].phone2
          : "",
        phoneCell: userDetails?.startList.users[0].phoneCell
          ? userDetails?.startList.users[0].phoneCell
          : "",
        language: userDetails?.startList.users[0].language
          ? userDetails?.startList.users[0].language
          : "",
        theme: userDetails?.startList.users[0].darkLight ?? "",
      });
    }
    if (userDetails?.startList.users[0].darkLight) {
      setThemeState(
        userDetails?.startList.users[0].darkLight === "dark" ? true : false
      );
      localStorage.setItem("theme", themeState ? "dark" : "light");
    } else {
      localStorage.setItem("theme", themeState ? "dark" : "light");
      setTheme(themeState ? "dark" : "light");
    }
  }, [userDetails]);

  useEffect(() => {
    if (userUpdateRes) {
      updateUserDetailsContext();
      navigate(`/pwa/home/${sessionStorage.getItem("email")}`);
    }
  }, [userUpdateRes]);
  // console.log(userDetails?.startList.users[0].darkLight);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await setUserUpdate({
      user: userDetails?.startList.users[0].email as string,
      key: `email|'${userDetails?.startList.users[0].email}'`,
      data: `description;nickName;phone;phone2;phoneCell;language;darkLight|'${profileData.name}';'${profileData.nickName}';'${profileData.phone}';'${profileData.phone2}';'${profileData.phoneCell}';'${profileData.language}';'${profileData.theme}';`,
    });
    setBtnDisabled(true);
  };

  const handleSetTheme = () => {
    if (themeState === true) root?.classList.add("dark");
    else root?.classList.remove("dark");
    setProfileData((prev) => ({
      ...prev,
      theme: themeState ? "dark" : "light",
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "language") {
      setProfileData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
    setBtnDisabled(false);
  };

  const updateUserDetailsContext = () => {
    if (userUpdateRes?.status === "I") {
      //!type error couldnt resolve.
      // @ts-expect-error abba dabba jabba
      setUserDetails((prev) => {
        if (prev) {
          return {
            ...prev,
            startList: {
              ...prev.startList,
              users: [
                {
                  description: profileData.name,
                  email: prev.startList.users[0].email,
                  nickName: profileData.nickName,
                  language: profileData.language,
                  privacyDate: prev.startList.users[0].privacyDate,
                  phone: profileData.phone,
                  phone2: profileData.phone2,
                  phoneCell: profileData.phoneCell,
                  darkLight: profileData.theme,
                },
              ],
            },
          };
        }
      });
    }
  };
  return (
    <div>
      <BodyBackBtn btnText="Profile" />
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Profile</p>
        <p>
          In this section you can edit all your personal and contact
          information.
        </p>
      </div>
      <div className="flex items-center px-5">
        <p className="text-2xl w-fit border rounded-full p-1 px-2 m-1 bg-gray-100 text-white bg-text-red text-xs">
          {profileData.nickName.slice(0, 1).toUpperCase()}
        </p>
        <p>{userDetails?.startList.users[0].email}</p>
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
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
                  placeholder="Please enter name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="nickName" className="pr-2 font-semibold">
                  NickName
                </label>
                <input
                  className="rounded-md border  p-1 px-2 border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="nickName"
                  id="nickName"
                  placeholder="Please enter nickName"
                  value={profileData.nickName}
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="tele1" className="pr-2 font-semibold">
                  Telephone 1
                </label>
                <input
                  className="rounded-md border  p-1 px-2 border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="number"
                  id="phone"
                  placeholder="Please enter Telephone number"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </div>
              <div className="mb-2 flex flex-col">
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
              </div>
              <div className="mb-2 flex flex-col">
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
              </div>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />

            <div className="mb-2 px-5 py-4 flex flex-col accent-red-500">
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
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />

            <div className="mb-2 py-3 px-5 flex justify-between">
              <label htmlFor="theme-switch">Dark Mode</label>
              <Switch
                id="theme-switch"
                name="theme"
                checked={themeState}
                onClick={() => {
                  setThemeState(!themeState);
                  setBtnDisabled(false);
                }}
              />
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="w-full px-4 py-12">
            <button
              className={`${primaryBtnStyle}hover:border hover:border-black focus:bg-red-500 disabled:opacity-25`}
              type="submit"
              disabled={btnDisabled}
            >
              Save Edits
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserProfile;
