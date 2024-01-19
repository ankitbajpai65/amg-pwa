import { useUserDetails } from "@/lib/context/userDetailsContext";
import backArrow from "../../assets/icons/backArrow.png";
import { useNavigate } from "react-router-dom";

const PrivacyDisplayOnly = () => {
  const { userDetails } = useUserDetails();
  const navigate = useNavigate();

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
      <div className="py-4 px-2 border-b">
        <a onClick={() => navigate(-1)} className="flex items-center">
          <div className="px-1">
            <img src={backArrow}></img>
          </div>
          <p>Privacy Policy</p>
        </a>
      </div>
      <div className="px-4">
        <div className="font-semibold text-lg py-2">Privacy Policy</div>

        {privacyPolicyText()}
      </div>
    </div>
  );
};
export default PrivacyDisplayOnly;
