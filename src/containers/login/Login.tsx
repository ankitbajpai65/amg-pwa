import image from "../../assets/loghi-03.png";
import useCheckUserApi from "@/hooks/useCheckUserApi";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { FcGoogle } from "react-icons/fc";
import { errorAlert, warnAlert } from "@/components/appComponents/appAlert";
import useSendMailApi from "@/hooks/useSendMailApi";
import Loader from "@/components/appComponents/Loader";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { getUserLoginStatus, userLoginStatus } = useCheckUserApi();
  const [loginData, setLoginData] = useState<Inputs>({
    email: "",
    password: "",
  });
  const [loaderVisible, setLoaderVisible] = useState(false);
  const { userDetails, setUserDetails } = useUserDetails();
  const { getSendMailStatus } = useSendMailApi();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("HAIYA", userLoginStatus);
    if (userDetails) {
      if (userDetails?.startList.baseData[1].itemValue === "ON") {
        if (
          userDetails?.startList.users[0].auth2 === "MAIL" ||
          userDetails?.startList.users[0].auth2 === "SMS"
        ) {
          getSendMailStatus({
            user:
              userDetails?.startList.users[0].auth2 === "MAIL"
                ? loginData.email
                : userDetails?.startList.users[0].phoneCell,
            cc: "",
            sub: "AMG Invio PIN di accesso ",
            body: `Il PIN di accesso è il seguente: ${userLoginStatus?.pin}`,
            sendType:
              userDetails?.startList.users[0].auth2 === "MAIL" ? "MAIL" : "SMS",
          });
          warnAlert(2000, "Enter then PIN received by email/SMS");
          navigate("/mfa", { state: { pin: userLoginStatus?.pin } });
        } else {
          navigate("/");
          sessionStorage.removeItem("isLoggedIn");
          sessionStorage.removeItem("email");
          errorAlert(2000, "LogIn Error");
          setUserDetails(null);
        }
      } else {
        if (
          userDetails?.startList.users[0].privacyDate === "" ||
          userDetails?.startList.users[0].privacyDate === "01/01/1900 00:00:00"
        ) {
          navigate("/pwa/privacy");
        } else {
          navigate(`/pwa/home/${userDetails?.startList.users[0].email}`);
        }
      }
      setLoaderVisible(false);
    }
  }, [userDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (loginData.email !== "" && loginData.password !== "") {
      getUserLoginStatus({
        user: loginData.email,
        pass: loginData.password,
      });
      setLoaderVisible(true);
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };

  const HandleGoogleLogin = () => {
    const googleLoginHook = useGoogleLogin({
      onSuccess: (tokenResponse) => console.log(tokenResponse),
    });
    return (
      <div className="rounded-full w-4/6">
        <button
          className="w-full flex items-center border border-red-600 text-xl p-2 my-2 rounded-3xl font-semibold justify-center"
          type="button"
          onClick={() => googleLoginHook()}
        >
          <FcGoogle size={25} style={{ paddingRight: "5px" }} /> Sign in with
          Google
        </button>
      </div>
    );
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mobile:w-full mobile:h-screen sm:h-fit max-w-md min-w-min w-3/6 mx-auto"
      >
        <div className=" mobile:w-full mobile:h-screen sm:h-min mobile:m-0 mobile:p-0 max-w-md min-w-min w-3/6 m-2 p-2 flex flex-col items-center mx-auto m-2 p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 rounded h-20 text-white font-semibold mb-2 w-full text-center rounded-b-xl">
            <div className="flex justify-center items-center ">
              <p className="text-4xl font-bold">AMG</p>
              <img className="h-16" src={image}></img>
            </div>
          </div>
          <div className="mobile:mt-10 sm:m-2  w-full p-2 text-l">
            <div className="mb-1 flex flex-col">
              <label htmlFor="email" className="pr-2 font-semibold">
                Email
              </label>
              <input
                className="rounded-xl border-2 p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="email"
                id="email"
                placeholder="Please enter Email"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="password" className="pr-2 font-semibold">
                Password
              </label>
              <input
                className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="password"
                id="password"
                placeholder="Please enter Password"
                onChange={(e) => handleInputChange(e)}
              ></input>
            </div>
          </div>
          <button
            className="w-4/6 rounded-3xl text-xl bg-red-600 py-2 px-4 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700"
            type="submit"
          >
            Enter
            <span className="px-2">
              <Loader status={loaderVisible} />
            </span>
          </button>

          <HandleGoogleLogin />

          <div className="flex flex-col m-2 mt-10 text-l w-4/6 text-center">
            <a
              className="text-blue-600 border border-red-500 p-2 mb-2 rounded-xl transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
              href="/changePassword"
            >
              Change Password
            </a>

            <a
              className="text-blue-600 border border-red-500 p-2 rounded-xl transition duration-150 ease-in-out
        hover:text-red-600 focus:text-red-600 active:text-red-700"
              href="/forgotPassword"
            >
              Forgot Password
            </a>
          </div>

          <div className="rounded-t-xl bg-red-600 h-8 w-full mobile:sticky mobile:top-[100vh] sm:static sm:top-0"></div>
        </div>
      </form>
    </>
  );
};
export default Login;
