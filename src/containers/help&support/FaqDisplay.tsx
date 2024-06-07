import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { useLocation } from "react-router-dom";

const FaqDisplay = () => {
  const location = useLocation();
  const faq = location.state.singleQuestion;
  console.log();
  return (
    <div>
      <BodyBackBtn btnText={`Question ${faq?.id}`} />
      <div className="grow p-2 mb-14">
        <div className="px-4">
          <div className="font-semibold text-lg py-2">{faq?.question}</div>

          {faq?.answer}
        </div>
      </div>
    </div>
  );
};
export default FaqDisplay;
