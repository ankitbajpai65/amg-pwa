import { useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  oldPass: string;
  newPass: string;
  newPass2: string;
};
const ChangePass = () => {
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
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mobile:w-full max-w-md min-w-min w-3/6 mx-auto "
      >
        <div className=" mobile:w-full max-w-md min-w-min w-3/6 m-2 p-2 flex flex-col items-center mx-auto m-2 p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 rounded text-white font-semibold mb-2 w-full text-center">
            <div className="flex justify-around ">
              <p>AMG</p>
              <img src="/"></img>
            </div>
            <p>Login</p>
          </div>
          <div className="m-2">
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
    </>
  );
};
export default ChangePass;
