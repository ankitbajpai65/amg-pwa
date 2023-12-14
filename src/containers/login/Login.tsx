import { useForm, SubmitHandler } from "react-hook-form";
import image from "../../assets/loghi-03.png";
import { errorAlert } from "@/components/appComponents/appAlert";
import useCheckUserApi from "@/hooks/useCheckUserApi";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "@/lib/context/userDetailsContext";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { getUserLoginStatus } = useCheckUserApi();
  const { userDetails } = useUserDetails();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (userDetails) {
      if (userDetails?.startList.users[0].privacyDate === "") {
        navigate("/privacy");
      } else {
        navigate(`/home/${userDetails?.startList.users[0].email}`);
      }
    }
  }, [userDetails]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (errors) console.error(errors);
    if (data.email !== "" && data.password !== "") {
      getUserLoginStatus({
        user: data.email,
        pass: data.password,
      });
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
        <div className=" mobile:w-full mobile:h-screen sm:h-min mobile:m-0 mobile:p-0 max-w-md min-w-min w-3/6 m-2 p-2 flex flex-col items-center mx-auto m-2 p-2 bg-bkg border rounded-md ">
          <div className="bg-red-600 rounded h-20 text-white font-semibold mb-2 w-full text-center rounded-b-xl">
            <div className="flex justify-center items-center ">
              <p className="text-4xl font-bold">AMG</p>
              <img className="h-16" src={image}></img>
            </div>
            {/* <p>Login</p> */}
          </div>
          <div className="mobile:mt-10 sm:m-2  w-full p-2 text-l">
            <div className="mb-1 flex flex-col">
              <label htmlFor="email" className="pr-2 font-semibold">
                Email
              </label>
              <input
                className="rounded-xl border-2 p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="email"
                id="email"
                placeholder="Please enter Email"
                {...register("email")}
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label htmlFor="password" className="pr-2 font-semibold">
                Password
              </label>
              <input
                className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
                type="password"
                id="Password"
                placeholder="Please enter Password"
                {...register("password")}
              ></input>
            </div>
          </div>
          <button
            className="rounded-3xl text-xl bg-red-600 py-2 px-4 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700"
            type="submit"
          >
            Confirm
          </button>
          <div className="rounded-full">
            <GoogleLogin
              onSuccess={(res) => console.log(res)}
              onError={() => console.error()}
            />
          </div>
          <div className="flex flex-col m-2 mt-10 text-l">
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

          <div className="rounded-t-xl bg-red-600 h-8 w-full mobile:sticky mobile:top-[100vh] sm:static sm:top-0"></div>
        </div>
      </form>
    </>
  );
};
export default Login;
