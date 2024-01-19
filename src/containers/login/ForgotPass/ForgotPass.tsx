import { useEffect, useState } from "react";
import image from "../../../assets/loghi-03.png";
import backArrow from "../../../assets/icons/backArrow.png";
import { errorAlert } from "@/components/appComponents/appAlert";
import useCreatePassApi from "@/hooks/useCreatePassApi";
import { useNavigate } from "react-router-dom";
import { primaryBtnStyle } from "@/lib/cssTailwind";

const ForgotPass = () => {
  const { getCreatePassStatus } = useCreatePassApi();
  const root = document.querySelector(":root");
  const [userData, setUserData] = useState<string>("");
  const [submitBtnDisable, setSubmitBtnDisable] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const value = localStorage.getItem("theme");
    if (value === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  }, []);

  useEffect(() => {
    console.log(userData);
    if (userData !== "" && userData !== " ") {
      setSubmitBtnDisable(false);
    } else setSubmitBtnDisable(true);
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(() => e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (userData !== "") {
      getCreatePassStatus({
        user: userData,
      });
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* header---------- */}
      <div className="bg-bg-header-gray px-5">
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
        <div className="py-4 px-2 border-b">
          <a onClick={() => navigate(-1)} className="flex items-center">
            <div className="px-1">
              <img src={backArrow}></img>
            </div>
            <p>Forgot Password</p>
          </a>
        </div>
        {/* <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" /> */}
        <div className="p-5">
          <div>
            <p className="font-bold text-xl">Forgot Password</p>
            <p>Reset your password in few steps.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full p-2 mt-10">
              <div className="mb-1 flex flex-col ">
                <label htmlFor="email" className="pr-2 font-semibold">
                  Email
                </label>
                <input
                  className="rounded p-1 px-2 border border-border-dark-gray hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="email"
                  id="email"
                  onChange={(e) => handleInputChange(e)}
                  required
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
export default ForgotPass;
