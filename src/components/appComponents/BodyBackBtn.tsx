import { useNavigate } from "react-router-dom";
import backArrow from "../../assets/icons/backArrow.png";

const BodyBackBtn = (props: { btnText: string }) => {
  const navigate = useNavigate();

  return (
    <div className="py-4 px-2 border-b border-border-light-gray">
      <a onClick={() => navigate(-1)} className="flex items-center">
        <div className="px-1">
          <img src={backArrow}></img>
        </div>
        <p className="px-2">{props.btnText}</p>
      </a>
    </div>
  );
};
export default BodyBackBtn;
