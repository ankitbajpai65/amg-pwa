import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import image from "../../../assets/loghi-03.png";
import { errorAlert } from "@/components/appComponents/appAlert";
import useCreatePassApi from "@/hooks/useCreatePassApi";

type Inputs = {
  pin: string;
  email: string;
};
const ForgotPass = () => {
  const { createPassStatus, getCreatePassStatus } = useCreatePassApi();
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
  },[]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    console.error(errors);
    if (data.email !== "") {
      getCreatePassStatus({
        user: data.email,
      });
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };
  console.log("ChangePass", createPassStatus);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mobile:w-full max-w-md min-w-min w-3/6 mx-auto "
      >
        <div className=" mobile:w-full mobile:p-0 max-w-md min-w-min w-3/6 m-2 p-2 flex flex-col items-center mx-auto m-2 p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 rounded text-white font-semibold mb-2 w-full text-center">
            <div className="flex justify-around">
              <p className="text-2xl">AMG</p>
              <img className="h-10" src={image}></img>
            </div>
            <p>Forgot Password</p>
          </div>

          <div className="m-2">
            <div className="mb-1 flex flex-col">
              <label htmlFor="email" className="pr-2">
                Enter Email
              </label>
              <input
                className="rounded-xl border-2 p-1 px-2  border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="email"
                id="email"
                {...register("email")}
                required
              />
            </div>
          </div>

          <button
            className="rounded-xl bg-red-600 p-2 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700"
            type="submit"
            // onClick={() => {
            //   console.log("login");
            // }}
          >
            Confirm
          </button>
          <div className="rounded bg-red-600 h-8 w-full"></div>
        </div>
      </form>
    </div>
  );
};
export default ForgotPass;
