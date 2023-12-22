import { useUserDetails } from "@/lib/context/userDetailsContext";

const PrivacyDisplayOnly = () => {
  const { userDetails } = useUserDetails();

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
    <div className="grow p-2 mb-14">
      <div className="text-center font-bold">Privacy Policy</div>
      {privacyPolicyText()}
    </div>
  );
};
export default PrivacyDisplayOnly;
