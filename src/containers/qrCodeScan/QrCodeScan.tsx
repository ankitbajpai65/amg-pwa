import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const QrCodeScan = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full justify-center grow">
      <button
        className="rounded-md text-xl bg-text-red py-2 px-4 m-2 border text-white
      font-medium mb-2 hover:bg-red-500 hover:border hover:border-black
      focus:bg-red-500 active:bg-red-700"
        onClick={() => navigate("/pwa/qrScan/uploadScan")}
      >
        {t("scan.btn1")}
      </button>
      <button
        className="rounded-md text-xl bg-text-red py-2 px-4 m-2 border text-white
      font-medium mb-2 hover:bg-red-500 hover:border hover:border-black
      focus:bg-red-500 active:bg-red-700"
        onClick={() => navigate("/pwa/qrScan/scanNow")}
      >
        {t("scan.btn2")}
      </button>
    </div>
  );
};
export default QrCodeScan;
