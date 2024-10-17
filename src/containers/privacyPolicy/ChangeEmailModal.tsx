import { errorAlert, successAlert } from "@/components/appComponents/appAlert";
import Loader from "@/components/appComponents/Loader";
import Modal from "@/components/appComponents/Modal";
import useAuthApi from "@/components/hooks/useAuthApi";
import useUserDetailsApi from "@/components/hooks/useUserDetailsApi";
import { inputStyle, primaryBtnStyle } from "@/lib/cssTailwind";
import { validateEmail } from "@/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChangeEmailModal = (props: {
  isOpen: boolean;
  //   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOpen } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  const [email, setEmail] = useState<string>();

  const { logout } = useAuthApi();
  const { loading, changeEmail } = useUserDetailsApi();

  const handleLogout = async () => {
    const res = await logout();
    if (res.status === 200) {
      navigate("/");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("userName");
      localStorage.removeItem("userMobile");
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!validateEmail(email!)) {
      errorAlert(1000, "Please enter a valid email!");
      return;
    }

    if (email) {
      const res = await changeEmail(userEmail!, email);
      console.log(res);

      if (res.status === 200) {
        successAlert(1000, "Email changed successfully!");
        handleLogout();
        navigate("/");
      }
    } else {
      errorAlert(1000, "Please fill all fields!");
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[90%]">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Change Email
        </h1>
        <input
          className={`${inputStyle}`}
          type="email"
          id="email"
          name="email"
          placeholder={t("forgetPassword.newPassword.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default ChangeEmailModal;
