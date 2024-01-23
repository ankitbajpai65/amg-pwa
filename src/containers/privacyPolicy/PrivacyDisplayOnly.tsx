import { useUserDetails } from "@/lib/context/userDetailsContext";
import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { useEffect, useState } from "react";

const PrivacyDisplayOnly = () => {
  const { userDetails } = useUserDetails();
  const [privacyText, setPrivacyText]=useState('');

   useEffect(() => {
      privacyPolicyText();
   }, [userDetails]);


  const privacyPolicyText = () => {
    userDetails?.startList.baseData.forEach((item) => {
      if (
        item.code === `PRIVACYTEXT${userDetails?.startList.users[0].language}`
      ) {
         setPrivacyText(item.itemValue as string);
      }
    });
  };

    // const privacyPolicyText = () => {
    //   return userDetails?.startList.baseData.map((item) => {
    //     if (
    //       item.code === `PRIVACYTEXT${userDetails?.startList.users[0].language}`
    //     ) {
    //       return item.itemValue;
    //     }
    //   });
    // };

  return (
    <div className="grow p-2 mb-14">
      <BodyBackBtn btnText="Privacy Policy" />
      <div className="px-4">
        <div className="font-semibold text-lg py-2">Privacy Policy</div>
        {privacyText}
        {/* {privacyPolicyText()} */}
      </div>
    </div>
  );
};
export default PrivacyDisplayOnly;
