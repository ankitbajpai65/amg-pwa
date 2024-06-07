import { useNavigate } from "react-router-dom";
import backArrow from "../../assets/icons/backArrow.png";

const BodyBackBtn = (props: { btnText: string; returnToPath?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="py-4 px-2 border-b border-border-light-gray">
      <a
        onClick={() =>
          props.returnToPath ? navigate(props.returnToPath) : navigate(-1)
        }
        className="flex items-center w-fit cursor-pointer"
      >
        <div className="px-1">
          <img src={backArrow}></img>
        </div>
        <p className="px-2">{props.btnText}</p>
      </a>
    </div>
  );
};
export default BodyBackBtn;
