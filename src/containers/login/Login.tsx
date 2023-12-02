
import { useForm, SubmitHandler } from "react-hook-form";
import image from "../../assets/loghi-03.png";
import { errorAlert } from "@/components/appComponents/appAlert";
import useCheckUserApi from "@/hooks/useCheckUserApi";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {

  const { userLoginStatus, getUserLoginStatus } = useCheckUserApi();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    console.error(errors);
    if (data.email !== "" && data.password !== "") {
      getUserLoginStatus({
        user: data.email,
        pass: data.password,
      });

      console.log("auth", typeof userLoginStatus);
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };

  

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mobile:w-full mobile:h-screen sm:h-fit max-w-md min-w-min w-3/6 mx-auto"
      >
        <div className=" mobile:w-full mobile:h-screen sm:h-min mobile:m-0 max-w-md min-w-min w-3/6 m-2 p-2 flex flex-col items-center mx-auto m-2 p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 rounded text-white font-semibold mb-2 w-full text-center">
            <div className="flex justify-around ">
              <p className="text-2xl">AMG</p>
              <img className="h-10" src={image}></img>
            </div>
            <p>Login</p>
          </div>
          <div className="mobile:mt-10 sm:m-2 ">
            <div className="mb-1 flex flex-col">
              <label htmlFor="email" className="pr-2">
                Email
              </label>
              <input
                className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
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
                className="rounded border-2 border-slate-600 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="password"
                id="Password"
                {...register("password")}
              />
            </div>
          </div>
          <button
            className="rounded-xl bg-red-600 p-2 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700"
            type="submit"
          >
            Confirm
          </button>
          <div className="flex flex-col m-2">
            <a
              className="text-blue-600 underline transition duration-150 ease-in-out hover:text-red-600 focus:text-red-600 active:text-red-700"
              href="/changePassword"
            >
              Change Password
            </a>

            <a
              className="text-blue-600 underline transition duration-150 ease-in-out
        hover:text-red-600 focus:text-red-600 active:text-red-700"
              href="/forgotPassword"
            >
              Forgot Password
            </a>
          </div>
          
          <div className="rounded bg-red-600 h-8 w-full mobile:sticky mobile:top-[100vh] sm:static sm:top-0"></div>
        </div>
      </form>
    </>
  );
};
export default Login;
