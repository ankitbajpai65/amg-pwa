import { Switch } from "@/components/ui/switch";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAmgUsersApi from "@/hooks/useAmgUsersApi";

const PrivacyPolicy2 = () => {
  const [btnAccess, setBtnAccess] = useState(false);
  const { userUpdate, setUserUpdate } = useAmgUsersApi();
  const navigate = useNavigate();
  const { userDetails } = useUserDetails();

  useEffect(() => {
    if (userUpdate) {
      userUpdate?.status === "I"
        ? navigate(`/pwa/home/${sessionStorage.getItem("email")}`)
        : navigate("/");
    }
  }, [userUpdate]);

  //   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  //     const bottom =
  //       (e.target as HTMLInputElement).scrollHeight -
  //         (e.target as HTMLInputElement).scrollTop ===
  //       (e.target as HTMLInputElement).clientHeight;
  //     if (bottom) {
  //       setBtnAccess(true);
  //     } else {
  //       setBtnAccess(false);
  //     }
  //   };

  const handleDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formatDate = `${month < 10 ? "0" + month : month}/${
      day < 10 ? "0" + day : day
    }/${year}`;
    return formatDate;
  };

  const handleSubmit = () => {
    setUserUpdate({
      user: userDetails?.startList.users[0].email as string,
      key: `email|'${userDetails?.startList.users[0].email}'`,
      data: `PrivacyDate|'${handleDate()}'`,
    });
  };

  const handleSwitch = () => {
    setBtnAccess((prev) => !prev);
  };

  const privacyPolicyText = () => {
    return userDetails?.startList.baseData.map((item) => {
      if (
        item.code === `PRIVACYTEXT${userDetails?.startList.users[0].language}`
      ) {
        return item.itemValue;
      }
    });
  };

  return (
    <div className="flex flex-col items-center h-3/4 overflow-hidden">
      <div className="my-5 mx-10 p-10 text-xl  border overflow-auto">
        {privacyPolicyText()}
      </div>
      <div>
        <label htmlFor="theme-switch">Accept</label>
        <Switch
          id="theme-switch"
          // checked={}
          onClick={() => handleSwitch()}
        />
      </div>

      <button
        className="rounded-2xl bg-red-600 p-2 m-2 border text-white font-medium
      mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500
      active:bg-red-700 text-2xl px-5 disabled:pointer-events-none disabled:bg-slate-300"
        disabled={!btnAccess}
        onClick={() => handleSubmit()}
      >
        AGREE
      </button>
    </div>
  );
};
export default PrivacyPolicy2;
