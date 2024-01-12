import { useState } from "react";
import image from "../../../assets/loghi-03.png";
import { errorAlert } from "@/components/appComponents/appAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserDetails } from "@/lib/context/userDetailsContext";

const Mfa = () => {
  const [mfaPin, setMfaPin] = useState<string>();
  const { userDetails,setUserDetails } = useUserDetails();
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
          navigate(`/pwa/home/${userDetails?.startList.users[0].email}`);
        }
      }
      else{
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
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="mobile:w-full mobile:h-full max-w-md min-w-min w-3/6 mx-auto "
      >
        <div className=" mobile:w-full mobile:h-full mobile:p-0 max-w-md min-w-min w-3/6 p-2 flex flex-col items-center mx-auto p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 pb-5 rounded h-20 text-white font-semibold mb-2 w-full text-center rounded-b-xl">
            <div className="flex justify-center items-center ">
              <p className="text-4xl font-bold">AMG</p>
              <img className="h-16" src={image}></img>
            </div>
          </div>

          <div className="m-2 w-full p-2 mt-10">
            <div className="mb-1 flex flex-col ">
              <label htmlFor="pin" className="pr-2 font-semibold">
                Enter Pin
              </label>
              <input
                className="rounded-xl border-2 p-1 px-2  border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="number"
                id="pin"
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
          </div>

          <button
            className="rounded-3xl text-xl bg-red-600 py-2 px-4 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700"
            type="submit"
          >
            Confirm
          </button>

          <div className="rounded-t-xl sticky top-[96%] bg-red-600 h-8 w-full"></div>
        </div>
      </form>
    </div>
  );
};
export default Mfa;
