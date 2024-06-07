import image from "../../assets/loghi-03.png";
// import useCheckUserApi from "@/components/hooks/AmgMS/useCheckUserApi";
// import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "@/lib/context/userDetailsContext";
// import { FcGoogle } from "react-icons/fc";
import { errorAlert, warnAlert } from "@/components/appComponents/appAlert";
import useSendMailApi from "@/components/hooks/AmgMS/useSendMailApi";
import Loader from "@/components/appComponents/Loader";
import { inputStyle, primaryBtnStyle } from "@/lib/cssTailwind";
import useLoginApi from "@/components/hooks/useLoginApi";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  // const { getUserLoginStatus, userLoginStatus } = useCheckUserApi();
  const [loginData, setLoginData] = useState<Inputs>({
    email: "",
    password: "",
  });
  const [loaderVisible, setLoaderVisible] = useState(false);
  const { userDetails, setUserDetails } = useUserDetails();
  const { getUserLoginRes, getUserLogin } = useLoginApi();
  const { getSendMailAPI } = useSendMailApi();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userLoginStatus?.status || userLoginStatus?.error) {
  //     setLoaderVisible(() => false);
  //   }
  // }, [userLoginStatus]);

  useEffect(() => {
    console.log(getUserLoginRes);
    if (getUserLoginRes) {
      console.log(getUserLoginRes);
      if (getUserLoginRes.status || getUserLoginRes.error) {
        setLoaderVisible(false);
      }
    }
  }, [getUserLoginRes]);

  useEffect(() => {
    if (userDetails) {
      if (userDetails?.startList.baseData[1].itemValue === "ON") {
        if (
          userDetails?.startList.users[0].auth2 === "MAIL" ||
          userDetails?.startList.users[0].auth2 === "SMS"
        ) {
          getSendMailAPI({
            user: loginData.email,

            to:
              userDetails?.startList.users[0].auth2 === "MAIL"
                ? loginData.email
                : userDetails?.startList.users[0].phoneCell,
            cc: "",
            sub: "AMG Invio PIN di accesso ",
            // body: `Il PIN di accesso è il seguente: ${userLoginStatus?.pin}`,
            body: `Il PIN di accesso è il seguente: ${getUserLoginRes?.pin}`,
            sendType:
              userDetails?.startList.users[0].auth2 === "MAIL" ? "MAIL" : "SMS",
          });
          warnAlert(2000, "Enter then PIN received by email/SMS");
          // navigate("/mfa", { state: { pin: userLoginStatus?.pin } });
          navigate("/mfa", { state: { pin: getUserLoginRes?.pin } });
        } else if (userDetails?.startList.users[0].auth2 === "OFF") {
          if (
            userDetails?.startList.users[0].privacyDate === "" ||
            userDetails?.startList.users[0].privacyDate ===
              "01/01/1900 00:00:00"
          ) {
            navigate("/policy/privacy");
          } else {
            // navigate(`/pwa/home`);
            navigate(`/pwa/genaiservices/gpt-prompt`);
          }
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
          navigate("/policy/privacy");
        } else {
          // navigate(`/pwa/home`);
          navigate(`/pwa/genaiservices/gpt-prompt`);
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
      // getUserLoginStatus({
      //   user: loginData.email,
      //   pass: loginData.password,
      // });
      getUserLogin({
        userEmail: loginData.email,
        password: loginData.password,
        // customer: formType === "Privato" ? "AMGDEMO" : inputCustomerValue,
        customer: "AMGDEMO",
      });
      setLoaderVisible(true);
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };

  // const HandleGoogleLogin = () => {
  //   const googleLoginHook = useGoogleLogin({
  //     onSuccess: (tokenResponse) => console.log(tokenResponse),
  //   });
  //   return (
  //     <div className="rounded-xl">
  //       <button
  //         className="w-full flex items-center border border-red-600 text-xl p-2 my-2 rounded-xl font-semibold justify-center"
  //         type="button"
  //         onClick={() => googleLoginHook()}
  //       >
  //         <FcGoogle size={25} style={{ paddingRight: "5px" }} /> Sign in with
  //         Google
  //       </button>
  //     </div>
  //   );
  // };

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
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="mb-1 flex flex-col">
              {/* <label htmlFor="email" className="pr-2 font-semibold">
                Email
              </label> */}
              <input
                className={`${inputStyle}`}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mb-2 flex flex-col">
              {/* <label htmlFor="password" className="pr-2 font-semibold">
                Password
              </label> */}
              <input
                className={`${inputStyle}`}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleInputChange(e)}
              ></input>
            </div>
          </div>
          <button className={`${primaryBtnStyle} w-full`} type="submit">
            Entra
            <span className="px-2">
              <Loader status={loaderVisible} size={4} />
            </span>
          </button>
        </form>

        {/* <HandleGoogleLogin /> */}

        <div className="flex justify-center">
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
        </div>
      </div>
      {/* body---------- */}
      {/* footer---------- */}
    </div>
  );
};
export default Login;
