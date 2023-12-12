import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useThemeContext } from "@/lib/context/themeContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";

type Inputs = {
  name: string;
  nickName: string;
  phone: string;
  phone2: string;
  phoneCell: string;
  language: string;
};

const UserProfile = () => {
  const [themeState, setThemeState] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const root = document.querySelector(":root");
  const { setTheme } = useThemeContext();
  const { userDetails } = useUserDetails();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [profileData, setProfileData] = useState<Inputs>({
    name: "",
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
  });

  useEffect(() => {
    handleSetTheme();
  }, [themeState]);

  useEffect(() => {
   if(userDetails){
    setProfileData({
      name: "",
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
    });
   }
  },[userDetails])
  

  console.log({userDetails})
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log({ profileData });
  };

  const handleSetTheme = () => {
    localStorage.setItem("theme", themeState ? "dark" : "light");
    setTheme(themeState ? "dark" : "light");
    if (themeState) root?.classList.add("dark");
    else root?.classList.remove("dark");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setBtnDisabled(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mobile:w-full mobile:h-screen sm:h-fit max-w-md min-w-min w-3/6 mx-auto"
      >
        <div className="mobile:mt-2 sm:m-2  w-full p-2 text-l">
          <div className="mb-1 flex flex-col">
            <label htmlFor="name" className="pr-2 font-semibold">
              Name
            </label>
            <input
              className="rounded-xl border-2 p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="name"
              id="name"
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
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
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
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="phone"
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
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="phone2"
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
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="phoneCell"
              id="phoneCell"
              placeholder="Please enter Telephone number"
              value={profileData.phoneCell}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="mb-2 flex flex-col">
            <label htmlFor="Language" className="pr-2 font-semibold">
              Language
            </label>
            <input
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="Language"
              id="Language"
              placeholder="Please enter Language"
              value={profileData.language}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="mb-2 flex">
            <label htmlFor="theme-switch">Dark Mode</label>
            <Switch
              id="theme-switch"
              checked={themeState}
              onClick={() => {
                setThemeState(!themeState);
              }}
            />
          </div>
        </div>
        <div className="text-center">
          <button
            className="rounded-3xl text-xl bg-red-600 py-2 px-4 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700 disabled:pointer-events-none disabled:bg-slate-300"
            type="submit"
            disabled={btnDisabled}
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};
export default UserProfile;
