import { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import image from "../../../assets/loghi-03.png";
import { errorAlert, warnAlert } from "@/components/appComponents/appAlert";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  oldPass: string;
  newPass: string;
  newPass2: string;
};
const ChangePass = () => {
  const navigate = useNavigate();

  const root = document.querySelector(":root");

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
    if (
      data.email !== "" &&
      data.oldPass !== "" &&
      data.newPass !== "" &&
      data.newPass2 !== ""
    ) {
      if (data.newPass === data.newPass2) {
        const res = await fetch(
          "https://amg.datapartners.ch/Amg/ws/AMG_Security/Login/ChangePassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer: "AMGDEMO",
              user: data.email,
              passold: data.oldPass,
              passnew: data.newPass,
            }),
            // {
            // customer: "AMGDEMO",
            // user: data.email,
            // passold: data.password,
            // passnew:""
            // }
          }
        );
        const changePassAPIResData = await res.json();
        console.log("ChangePass", changePassAPIResData);
        if (changePassAPIResData.status === true) {
          warnAlert(3000, "Password Change Success");
          navigate("/");
        }else if(changePassAPIResData.status===400){
          errorAlert(5000, changePassAPIResData.title);
        } 
        else {
          
          errorAlert(5000, changePassAPIResData.title);
        }
      } else {
        errorAlert(3000, "New Passwords do not match");
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
          <div className="bg-red-600 h-fit rounded text-white font-semibold mb-2 w-full text-center">
            <div className="flex justify-around items-center">
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
              />
            </div>
            <div className="mb-1 flex flex-col">
              <label htmlFor="oldpass" className="pr-2">
                Enter Old Password
              </label>
              <input
                className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500"
                type="password"
                id="oldpass"
                {...register("oldPass")}
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="password" className="pr-2">
                Enter NEW Password
              </label>
              <input
                className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                minLength={8}
                {...register("newPass")}
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="newpass2" className="pr-2">
                Confirm NEW Password
              </label>
              <input
                className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500"
                type="password"
                id="newpass2"
                minLength={8}
                {...register("newPass2")}
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
export default ChangePass;
