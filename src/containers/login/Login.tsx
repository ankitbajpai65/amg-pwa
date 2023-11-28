import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTheme, setIsLoggedIn } from "./loginSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [theme, setTheme] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    console.error(errors);
    const res = await fetch(
      "https://amg.datapartners.ch/Amg/ws/AMG_Security/Login/CheckUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: "AMGDEMO",
          user: data.email,
          pass: data.password,
        }),
      }
    );
    const loginAPIResData = await res.json();
    console.log("auth", loginAPIResData.status);
    if (loginAPIResData.status === true) {
      dispatch(setIsLoggedIn(true));
      navigate("/home");
    } else {
      dispatch(setIsLoggedIn(false));
      alert("ERROR Logging in");
    }
  };
  // {
  //   "customer": "AMGDEMO",
  // "user": "rajat.khandelwal@datapartners.ch",
  // "pass": "RLpDgADH"
  // }

  useEffect(() => {
    handleSetTheme();
  }, [theme]);

  const handleSetTheme = () => {
    localStorage.setItem("theme", theme ? "dark" : "light");
    dispatch(addTheme(theme ? "dark" : "light"));
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
              <label htmlFor="email" className="pr-2">
                Email
              </label>
              <input
                className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                {...register("email")}
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="password" className="pr-2">
                Password
              </label>
              <input
                className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500"
                type="password"
                id="Password"
                {...register("password")}
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
          <div className="flex flex-col m-2">
            <a
              className="text-blue-600 underline transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
              href=""
            >
              Change Password
            </a>

            <a
              className="text-blue-600 underline transition duration-150 ease-in-out
        hover:text-red-600 focus:text-red-600 active:text-red-700"
              href=""
            >
              Forgot Password
            </a>
          </div>
          <Switch
            checked={theme}
            onClick={() => {
              setTheme(!theme);
            }}
          />
          <div className="rounded bg-red-600 h-8 w-full"></div>
        </div>
      </form>
    </>
  );
};
export default Login;
