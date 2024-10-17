import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HelpFAQ = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const faq = [
    {
      id: 1,
      question: `${t("settings.help.section3.faq.question")} 1`,
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ea non ex illum, quibusdam fugiat quis mollitia quo animi aspernatur commodi possimus iste nobis temporibus laborum sit natus nisi culpa?",
    },
    {
      id: 2,
      question: `${t("settings.help.section3.faq.question")} 2`,
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ea non ex illum, quibusdam fugiat quis mollitia quo animi aspernatur commodi possimus iste nobis temporibus laborum sit natus nisi culpa?",
    },
    {
      id: 3,
      question: `${t("settings.help.section3.faq.question")} 3`,
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ea non ex illum, quibusdam fugiat quis mollitia quo animi aspernatur commodi possimus iste nobis temporibus laborum sit natus nisi culpa?",
    },
    {
      id: 4,
      question: `${t("settings.help.section3.faq.question")} 4`,
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ea non ex illum, quibusdam fugiat quis mollitia quo animi aspernatur commodi possimus iste nobis temporibus laborum sit natus nisi culpa?",
    },
    {
      id: 5,
      question: `${t("settings.help.section3.faq.question")} 5`,
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ea non ex illum, quibusdam fugiat quis mollitia quo animi aspernatur commodi possimus iste nobis temporibus laborum sit natus nisi culpa?",
    },
    {
      id: 6,
      question: `${t("settings.help.section3.faq.question")} 6`,
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ea non ex illum, quibusdam fugiat quis mollitia quo animi aspernatur commodi possimus iste nobis temporibus laborum sit natus nisi culpa?",
    },
  ];

  return (
    <div>
      <BodyBackBtn btnText="FAQ" />
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">
          {t("settings.help.section3.faq.title")}
        </p>
        <p>{t("settings.help.section3.faq.caption")}</p>
      </div>

      <div className="px-5">
        {faq.map((item, idx) => {
          return (
            <div
              className="flex items-center justify-between py-3 border-b border-border-light-gray cursor-pointer"
              onClick={() =>
                navigate("/pwa/faqDisplay", {
                  state: { singleQuestion: item },
                })
              }
              key={idx}
            >
              <div className="flex items-center text-lg">
                <p>{item.question}</p>
              </div>
              <div>
                <IoIosArrowForward />
              </div>
            </div>
          );
        })}
        {/* <div className="flex items-center justify-between py-3 border-b border-border-light-gray">
          <div className="flex items-center text-lg">
            <p>What is a Copilot</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-border-light-gray">
          <div className="flex items-center text-lg">
            <p>Help and FAQ</p>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default HelpFAQ;
