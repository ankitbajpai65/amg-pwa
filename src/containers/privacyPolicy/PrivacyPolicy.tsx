import React, { useEffect, useState } from "react";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const [btnAccess, setBtnAccess] = useState(false);
  const navigate = useNavigate();

  const { userDetails } = useUserDetails();

  useEffect(() => {
    if (userDetails) {
      privacyPolicyText();
    }
  }, [userDetails]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const elementNode = e.target as HTMLInputElement;
    const bottom =
      elementNode.scrollHeight -
        elementNode.scrollTop -
        elementNode.clientHeight <
      1;
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
    <>
      <div className="flex flex-col items-center h-3/4 overflow-hidden">
        <div
          className="my-3 mx-10 p-5 text-xl h-3/4 border overflow-auto"
          onScroll={(e) => handleScroll(e)}
        >
          {privacyPolicyText()}
        </div>

        <button
          className="rounded-md bg-text-red p-2 m-2 border text-white font-medium
      mb-2 hover:bg-red-500 hover:border hover:border-black focus:bg-red-500
      active:bg-red-700 text-2xl px-5 disabled:pointer-events-none disabled:opacity-25"
          disabled={!btnAccess}
          onClick={() => navigate("/policy/privacy2")}
        >
          Procedi
        </button>
      </div>
    </>
  );
};
export default PrivacyPolicy;
