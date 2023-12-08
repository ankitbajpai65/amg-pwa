import { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import image from "../../../assets/loghi-03.png";
import { errorAlert } from "@/components/appComponents/appAlert";
import useChangePassApi from "@/hooks/useChangePassApi";

type Inputs = {
  email: string;
  oldPass: string;
  newPass: string;
  newPass2: string;
};
const ChangePass = () => {
  const { userChangePassStatus, getChangePassStatus } = useChangePassApi();

  const root = document.querySelector(":root");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const value = localStorage.getItem("theme");
    if (value === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    console.error(errors);
    if (
      data.email !== "" &&
      data.oldPass !== "" &&
      data.newPass !== "" &&
      data.newPass2 !== ""
    ) {
      if (data.newPass === data.newPass2) {
        getChangePassStatus({
          email: data.email,
          passold: data.oldPass,
          passnew: data.newPass,
        });
      } else {
        errorAlert(3000, "New Passwords do not match");
      }
    } else {
      errorAlert(3000, "Empty Input fields");
    }
    console.log("ChangePass", userChangePassStatus);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mobile:w-full mobile:h-screen sm:h-fit max-w-md min-w-min w-3/6 mx-auto "
      >
        <div className=" mobile:w-full mobile:h-screen sm:h-min mobile:m-0 mobile:p-0 max-w-md min-w-min w-3/6 m-2 p-2 flex flex-col items-center mx-auto m-2 p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 pb-5 rounded h-20 text-white font-semibold mb-2 w-full text-center rounded-b-xl">
            <div className="flex justify-center items-center ">
              <p className="text-4xl font-bold">AMG</p>
              <img className="h-16" src={image}></img>
            </div>
            {/* <p>Change Password</p> */}
          </div>
          <div className="mobile:mt-10 sm:m-2 w-full p-2 ">
            <div className="mb-1 flex flex-col">
              <label htmlFor="email" className="pr-2 font-semibold">
                Enter Email
              </label>
              <input
                className="rounded-xl p-1 px-2 border-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="email"
                id="email"
                {...register("email")}
              />
            </div>
            <div className="mb-1 flex flex-col">
              <label htmlFor="oldpass" className="pr-2 font-semibold">
                Enter Old Password
              </label>
              <input
                className="rounded-xl p-1 px-2 border-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="password"
                id="oldpass"
                {...register("oldPass")}
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="password" className="pr-2 font-semibold">
                Enter NEW Password
              </label>
              <input
                className="rounded-xl p-1 px-2 border-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="password"
                id="password"
                minLength={8}
                {...register("newPass")}
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="newpass2" className="pr-2 font-semibold">
                Confirm NEW Password
              </label>
              <input
                className="rounded-xl p-1 px-2 border-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="password"
                id="newpass2"
                minLength={8}
                {...register("newPass2")}
              />
            </div>
          </div>
          <button
            className="rounded-3xl text-xl bg-red-600 py-2 px-4 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700"
            type="submit"
          >
            Confirm
          </button>

          <div className="rounded bg-red-600 h-8 w-full mobile:sticky mobile:top-[100vh]"></div>
        </div>
      </form>
    </div>
  );
};
export default ChangePass;
