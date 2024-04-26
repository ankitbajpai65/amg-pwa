import { useEffect, useState } from "react";
import image from "../../../assets/loghi-03.png";
import { errorAlert } from "@/components/appComponents/appAlert";
import useChangePassApi from "@/hooks/AmgMS/useChangePassApi";
import { primaryBtnStyle } from "@/lib/cssTailwind";
import BodyBackBtn from "@/components/appComponents/BodyBackBtn";

type Inputs = {
  email: string;
  oldPass: string;
  newPass: string;
  newPass2: string;
};
const ChangePass = () => {
  const { getChangePassStatus } = useChangePassApi();
  const [passData, setPassData] = useState<Inputs>({
    email: "",
    oldPass: "",
    newPass: "",
    newPass2: "",
  });
  const [submitBtnDisable, setSubmitBtnDisable] = useState<boolean>(true);
  const root = document.querySelector(":root");

  useEffect(() => {
    const value = localStorage.getItem("theme");
    if (value === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  }, []);

  useEffect(() => {
    if (
      passData.email !== "" &&
      passData.oldPass !== "" &&
      passData.newPass !== "" &&
      passData.newPass2 !== ""
    ) {
      setSubmitBtnDisable(false);
    } else {
      setSubmitBtnDisable(true);
    }
  }, [passData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      passData.email !== "" &&
      passData.oldPass !== "" &&
      passData.newPass !== "" &&
      passData.newPass2 !== ""
    ) {
      if (passData.newPass === passData.newPass2) {
        getChangePassStatus({
          email: passData.email,
          passold: passData.oldPass,
          passnew: passData.newPass,
        });
      } else {
        errorAlert(3000, "New Passwords do not match");
      }
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* header---------- */}
      <div className="bg-bg-header-gray px-5 py-1">
        <div className="flex items-center">
          <div className="h-12 sm:h-14">
            <img className="h-full" src={image} />
          </div>
          <p className="flex text-text-blue sm:text-lg font-semibold">
            GEN<span className="text-text-red">A</span>I&nbsp;
            <span className="text-text-gray">SPACE</span>
            <span className="text-text-red">&nbsp;PWA</span>
          </p>
        </div>
      </div>
      {/* header---------- */}
      {/* body---------- */}
      <div className="grow">
        <BodyBackBtn btnText="Change Password" />
        {/* <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" /> */}
        <div className="p-5">
          <div>
            <p className="font-bold text-xl">Change Password</p>
            <p>Change your password in few steps.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5 w-full p-2 ">
              <div className="mb-1 flex flex-col">
                <label htmlFor="email" className="pr-2 font-semibold">
                  Email
                </label>
                <input
                  className="rounded p-1 px-2 border border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="email"
                  id="email"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-1 flex flex-col">
                <label htmlFor="oldPass" className="pr-2 font-semibold">
                  Your Old Password
                </label>
                <input
                  className="rounded- p-1 px-2 border border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="password"
                  id="oldPass"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="newPass" className="pr-2 font-semibold">
                  Your NEW Password
                </label>
                <input
                  className="rounded p-1 px-2 border border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="password"
                  id="newPass"
                  minLength={8}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="newPass2" className="pr-2 font-semibold">
                  Confirm New Password
                </label>
                <input
                  className="rounded p-1 px-2 border border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="password"
                  id="newPass2"
                  minLength={8}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="w-full">
              <button
                className={`${primaryBtnStyle} hover:border hover:border-black focus:bg-red-500 ${
                  submitBtnDisable && "opacity-25"
                }`}
                type="submit"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* body---------- */}
    </div>
  );
};
export default ChangePass;
