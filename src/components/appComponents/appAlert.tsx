import { Id, toast } from "react-toastify";

export const errorAlert = (time: number, alertText: string | undefined) => {
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
export const warnAlert = (time: number, alertText: string | undefined) => {
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
export const successAlert = (time: number, alertText: string | undefined) => {
  toast.success(alertText, {
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

export const Msg = (props: { title: string; text: string }) => {
  return (
    <div className="msg-container">
      <p className="msg-title">{props.title}</p>
      <p className="msg-description">{props.text}</p>
    </div>
  );
};

export const notificationToast = (
  title: string,
  text: string,
  time: number
): Id =>
  toast(<Msg title={title} text={text} />, {
    position: "top-center",
    hideProgressBar: true,
    autoClose: time,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "m-4",
    theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  });
