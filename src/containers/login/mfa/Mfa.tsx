import { useState } from "react";
import image from "../../../assets/loghi-03.png";
import { errorAlert } from "@/components/appComponents/appAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import BodyBackBtn from "@/components/appComponents/BodyBackBtn";

const Mfa = () => {
  const [mfaPin, setMfaPin] = useState<string>();
  const { userDetails, setUserDetails } = useUserDetails();
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMfaPin(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (mfaPin !== "") {
      console.log(mfaPin);
      if (location.state?.pin === mfaPin) {
        if (
          userDetails?.startList.users[0].privacyDate === "" ||
          userDetails?.startList.users[0].privacyDate === "01/01/1900 00:00:00"
        ) {
          navigate("/policy/privacy");
        } else {
          navigate(`/pwa/home`);
        }
      } else {
        navigate("/");
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("email");
        errorAlert(2000, "Authentication Failed");
        setUserDetails(null);
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
      <div className="grow">
        <BodyBackBtn btnText="MFA" />
        <form onSubmit={handleSubmit} className="">
          <div className="p-5 mt-10">
            <div className="mb-1 flex flex-col ">
              <label htmlFor="pin" className="pr-2 font-semibold">
                Enter Pin
              </label>
              <input
                className="rounded-md border border-border-dark-gray p-1 px-2 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="number"
                id="pin"
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <button
              className="w-full rounded-md text-xl bg-text-red py-2 px-4 my-7 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
      <div className="bg-bg-footer-red h-8 w-full"></div>
    </div>
  );
};
export default Mfa;
