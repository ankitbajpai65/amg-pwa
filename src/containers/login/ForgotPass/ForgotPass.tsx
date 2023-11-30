import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import image from "../../../assets/loghi-03.png";
import { errorAlert, warnAlert } from "@/components/appComponents/appAlert";
import { useNavigate } from "react-router-dom";

type Inputs = {
  pin: string;
  email: string;
};
const ForgotPass = () => {
  const root = document.querySelector(":root");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const value = localStorage.getItem("theme");
    console.log("local storage", value);
    if (value === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    console.error(errors);
    if (data.email !== "") {
      const res = await fetch(
        "https://amg.datapartners.ch/Amg/ws/AMG_Security/Login/CreatePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            customer: "AMGDEMO",
            user: data.email,
          }),
          // {
          // customer: "AMGDEMO",
          // "user": "rajat.khandelwal@datapartners.ch",
          // "pass": "RLpDgADH"
          // }
        }
      );
      const createPassAPIResData = await res.json();
      console.log("ChangePass", createPassAPIResData);
      if (createPassAPIResData.status === true) {
        warnAlert(3000, "New Password created, Please check registered Email");
        navigate("/");
      } else if (createPassAPIResData.status === 400) {
        errorAlert(5000, createPassAPIResData.title);
      } else {
        errorAlert(5000, createPassAPIResData.error);
      }
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mobile:w-full max-w-md min-w-min w-3/6 mx-auto "
      >
        <div className=" mobile:w-full max-w-md min-w-min w-3/6 m-2 p-2 flex flex-col items-center mx-auto m-2 p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 rounded text-white font-semibold mb-2 w-full text-center">
            <div className="flex justify-around">
              <p className="text-2xl">AMG</p>
              <img className="h-10" src={image}></img>
            </div>
            <p>Login</p>
          </div>

          <div className="m-2">
            <div className="mb-1 flex flex-col">
              <label htmlFor="email" className="pr-2">
                Enter Email
              </label>
              <input
                className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500"
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
