import { useUserDetails } from "@/lib/context/userDetailsContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const [btnAccess, setBtnAccess] = useState(true);
  const navigate = useNavigate();
  const { userDetails } = useUserDetails();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      (e.target as HTMLInputElement).scrollHeight -
        (e.target as HTMLInputElement).scrollTop ===
      (e.target as HTMLInputElement).clientHeight;
    if (bottom) {
      setBtnAccess(true);
    } else {
      setBtnAccess(false);
    }
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
      <div
        className="my-5 mx-10 p-10 text-xl h-3/4 border overflow-auto"
        onScroll={(e) => handleScroll(e)}
      >
        {privacyPolicyText()}
      </div>

      <button
        className="rounded-2xl bg-red-600 p-2 m-2 border text-white font-medium
      mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500
      active:bg-red-700 text-2xl px-5 disabled:pointer-events-none disabled:bg-slate-300"
        disabled={!btnAccess}
        onClick={() => navigate("/pwa/privacy2")}
      >
        AGREE
      </button>
    </div>
  );
};
export default PrivacyPolicy;
