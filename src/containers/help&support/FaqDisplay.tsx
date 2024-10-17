import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const FaqDisplay = () => {
  const location = useLocation();
  const faq = location.state.singleQuestion;
  const { t } = useTranslation();

  return (
    <div>
      <BodyBackBtn
        btnText={`${t("settings.help.section3.faq.question")} ${faq?.id}`}
      />
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
