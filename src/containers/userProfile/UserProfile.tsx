import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useThemeContext } from "@/lib/context/themeContext";
import { errorAlert } from "@/components/appComponents/appAlert";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  nickname: string;
  tele1: number;
  tele2: number;
  cell: number;
  language: string;
};

const UserProfile = () => {
  const [themeState, setThemeState] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const root = document.querySelector(":root");
  const { setTheme } = useThemeContext();

  useEffect(() => {
    handleSetTheme();
  }, [themeState]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (errors) console.error(errors);
    if (data) {
      console.log({ data });
    } else {
      errorAlert(3000, "Empty Input fields");
    }
  };

  const handleSetTheme = () => {
    localStorage.setItem("theme", themeState ? "dark" : "light");
    setTheme(themeState ? "dark" : "light");
    if (themeState) root?.classList.add("dark");
    else root?.classList.remove("dark");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mobile:w-full mobile:h-screen sm:h-fit max-w-md min-w-min w-3/6 mx-auto"
      >
        <div className="mobile:mt-2 sm:m-2  w-full p-2 text-l">
          <div className="mb-1 flex flex-col">
            <label htmlFor="name" className="pr-2 font-semibold">
              Name
            </label>
            <input
              className="rounded-xl border-2 p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="name"
              id="name"
              placeholder="Please enter name"
              {...register("name")}
            />
          </div>
          <div className="mb-2 flex flex-col">
            <label htmlFor="nickname" className="pr-2 font-semibold">
              NickName
            </label>
            <input
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="nickname"
              id="nickname"
              placeholder="Please enter nickname"
              {...register("nickname")}
            ></input>
          </div>
          <div className="mb-2 flex flex-col">
            <label htmlFor="tele1" className="pr-2 font-semibold">
              Telephone 1
            </label>
            <input
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="tele1"
              id="tele1"
              placeholder="Please enter Telephone number"
              {...register("tele1")}
            ></input>
          </div>
          <div className="mb-2 flex flex-col">
            <label htmlFor="tele2" className="pr-2 font-semibold">
              Telephone 2
            </label>
            <input
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="tele2"
              id="tele2"
              placeholder="Please enter Telephone number"
              {...register("tele2")}
            ></input>
          </div>
          <div className="mb-2 flex flex-col">
            <label htmlFor="cell" className="pr-2 font-semibold">
              Cellphone
            </label>
            <input
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="cell"
              id="cell"
              placeholder="Please enter Telephone number"
              {...register("cell")}
            ></input>
          </div>
          <div className="mb-2 flex flex-col">
            <label htmlFor="Language" className="pr-2 font-semibold">
              Language
            </label>
            <input
              className="rounded-xl border-2  p-1 px-2 border-gray-300 hover:border-yellow-500 focus:outline-none focus:border-blue-500 dark:text-black"
              type="Language"
              id="Language"
              placeholder="Please enter Language"
              {...register("language")}
            ></input>
          </div>
          <div className="mb-2 flex">
            <label htmlFor="theme-switch">Dark Mode</label>
            <Switch
              id="theme-switch"
              checked={themeState}
              onClick={() => {
                setThemeState(!themeState);
              }}
            />
          </div>
        </div>
        <div className="text-center">
          <button
            className="rounded-3xl text-xl bg-red-600 py-2 px-4 m-2 border text-white font-medium mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500 active:bg-red-700"
            type="submit"
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};
export default UserProfile;
