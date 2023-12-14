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
  const { getCreatePassStatus } = useCreatePassApi();
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
    console.error(errors);
    if (data.email !== "") {
      getCreatePassStatus({
        user: data.email,
      });
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mobile:w-full mobile:h-full max-w-md min-w-min w-3/6 mx-auto "
      >
        <div className=" mobile:w-full mobile:h-full mobile:p-0 max-w-md min-w-min w-3/6 p-2 flex flex-col items-center mx-auto p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 pb-5 rounded h-20 text-white font-semibold mb-2 w-full text-center rounded-b-xl">
            <div className="flex justify-center items-center ">
              <p className="text-4xl font-bold">AMG</p>
              <img className="h-16" src={image}></img>
            </div>
            {/* <p>Change Password</p> */}
          </div>

            <div className="m-2 w-full p-2 mt-10">
              <div className="mb-1 flex flex-col ">
                <label htmlFor="email" className="pr-2 font-semibold">
                  Enter Email
                </label>
                <input
                  className="rounded-xl border-2 p-1 px-2  border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                  type="email"
                  id="email"
                  {...register("email")}
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
export default ForgotPass;
