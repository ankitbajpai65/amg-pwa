import { useEffect, useState } from "react";
import image from "../../../assets/loghi-03.png";
import { errorAlert, successAlert } from "@/components/appComponents/appAlert";
import { inputStyle, primaryBtnStyle } from "@/lib/cssTailwind";
import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import useAuthApi from "@/components/hooks/useAuthApi";
import Loader from "@/components/appComponents/Loader";
import Modal from "@/components/appComponents/Modal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgotPass = () => {
  const { t } = useTranslation();
  const root = document.querySelector(":root");
  const [userData, setUserData] = useState<string>("");
  const [submitBtnDisable, setSubmitBtnDisable] = useState<boolean>(true);
  const [isOtpSend, setIsOtpSend] = useState(false);

  const { loading, forgetPassword } = useAuthApi();

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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (userData !== "") {
      const res = await forgetPassword(userData);
      console.log(res);

      if (res.startsWith("sent the passcode to")) setIsOtpSend(true);
    } else errorAlert(1000, "Please provide the email!");
  };

  if (isOtpSend) {
    return (
      <ChangePasswordModal isOtpSend={isOtpSend} setIsOtpSend={setIsOtpSend} />
    );
  }

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
        <BodyBackBtn btnText="Forgot Password" />
        {/* <hr className="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" /> */}
        <div className="p-5">
          <div>
            <p className="font-bold text-xl">{t("forgetPassword.title")}</p>
            <p>{t("forgetPassword.caption")}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full p-2 mt-10">
              <div className="mb-1 flex flex-col ">
                <label htmlFor="email" className="pr-2 font-semibold">
                  {t("forgetPassword.newPassword.email")}
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
                disabled={loading}
                className={`${primaryBtnStyle} hover:border hover:border-black focus:bg-red-500 ${
                  submitBtnDisable && "opacity-25"
                }`}
                type="submit"
              >
                {t("forgetPassword.button")}
                <span className="px-2">
                  <Loader status={loading} size={4} />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* body---------- */}
    </div>
  );
};

const ChangePasswordModal = (props: {
  isOtpSend: boolean;
  setIsOtpSend: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOtpSend } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inputDetails, setInputDetails] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const { loading, verifyOtp } = useAuthApi();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setInputDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputDetails.email && inputDetails.otp && inputDetails.newPassword) {
      const res = await verifyOtp(inputDetails);
      console.log(res);

      if (res === "password changed succesfully") {
        successAlert(1000, "Password changed successfully!");
        navigate("/");
      }
    } else {
      errorAlert(1000, "Please fill all fields!");
    }
  };

  return (
    <Modal isOpen={isOtpSend}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[90%]">
        <h1 className="text-center text-2xl font-semibold mb-6">
          {t("forgetPassword.newPassword.heading")}
        </h1>
        <input
          className={`${inputStyle}`}
          type="email"
          id="email"
          name="email"
          placeholder={t("forgetPassword.newPassword.heading")}
          value={inputDetails.email}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          className={`${inputStyle}`}
          type="text"
          id="otp"
          name="otp"
          placeholder={t("forgetPassword.newPassword.otp")}
          value={inputDetails.otp}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          className={`${inputStyle}`}
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder={t("forgetPassword.newPassword.newPassword")}
          value={inputDetails.newPassword}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className={`${primaryBtnStyle} w-full mt-5 ${
            loading ? "bg-text-red" : "bg-red-200"
          }`}
          type="submit"
          disabled={loading}
        >
          {t("forgetPassword.newPassword.button")}
          <span className="px-2">
            <Loader status={loading} size={4} />
          </span>
        </button>
      </form>
    </Modal>
  );
};

export default ForgotPass;
