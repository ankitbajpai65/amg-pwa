import image from "../../assets/loghi-03.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "@/components/appComponents/appAlert";
import Loader from "@/components/appComponents/Loader";
import { inputStyle, primaryBtnStyle } from "@/lib/cssTailwind";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import useAuthApi from "@/components/hooks/useAuthApi";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<Inputs>({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, login } = useAuthApi();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("handleSubmit runs");

    if (loginData.email && loginData.password) {
      const res = await login(loginData);
      console.log(res);

      if (res.status === 200) {
        successAlert(1000, "User loggedin sucessfully!");
        setLoginData({
          email: "",
          password: "",
        });

        navigate("/pwa/home");
      } else if (res.status === 400) {
        errorAlert(1000, res.response.error);
      }
    } else errorAlert(1000, "Please fill all fields!");
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
      <div className="grow flex flex-col justify-around p-5">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <div className="h-12 sm:h-14">
              <img className="h-full" src={image} />
            </div>
            <p className="flex text-text-blue sm:text-lg font-semibold">
              GenAi&nbsp;Space
              <span className="text-text-red">&nbsp;PWA</span>
            </p>
          </div>
          <p>Inserisci il tuo codice utente e la password e premi Entra.</p>
        </div>

        {/* Login form */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className={`${inputStyle} w-full`}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => handleInputChange(e)}
          />
          <div className="mb-2 flex items-center">
            <input
              className={`bg-bg-input-gray p-3 rounded-l-md outline-0 w-full`}
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => handleInputChange(e)}
            />
            <button
              className="bg-bg-input-gray px-3 py-3.5 rounded-r-md outline-0"
              onClick={() => setPasswordVisible(!passwordVisible)}
              type="button"
            >
              {passwordVisible ? (
                <IoEyeOutline size={20} />
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </button>
          </div>
          <button
            className={`${primaryBtnStyle} w-full ${
              loading ? "bg-text-red" : "bg-red-200"
            }`}
            type="submit"
            disabled={loading}
          >
            Entra
            <span className="px-2">
              <Loader status={loading} size={4} />
            </span>
          </button>
        </form>

        <div className="flex items-center flex-col gap-2">
          <span>
            <span>Don't have an account?</span>
            <button
              onClick={() => navigate("/signup")}
              className="ml-3 hover:underline hover:text-red-600"
            >
              Signup
            </button>
          </span>
          <span className="flex">
            <a
              className="text-text-blue underline transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
              href="/changePassword"
            >
              Change Password
            </a>
            <p className="px-1">|</p>
            <a
              className="text-text-blue underline transition duration-150 ease-in-out
        hover:text-red-600 focus:text-red-600 active:text-red-700"
              href="/forgotPassword"
            >
              Forgot Password
            </a>
          </span>
        </div>
      </div>
      {/* body---------- */}
    </div>
  );
};
export default Login;
