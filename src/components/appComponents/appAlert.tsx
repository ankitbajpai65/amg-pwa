import { toast } from "react-toastify";

export const errorAlert = (time:number|3000, alertText:string) => {
  toast.error(alertText, {
    position: "top-center",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  });
};
export const warnAlert = (time: number, alertText: string) => {
  toast.warn(alertText, {
    position: "top-center",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  });
};