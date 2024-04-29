import { pwaDictionary } from "@/lib/textDictionary";
import { primaryBtnStyle } from "@/lib/cssTailwind";
import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { useNavigate } from "react-router-dom";
import { usePatientListContext } from "@/lib/context/patientListContext";

export default function PatientsPrivacy() {
  const navigate = useNavigate();
  const { patientList } = usePatientListContext();

  return (
    <div className="flex flex-col">
      <div className="bg-text-red text-white text-center text-lg p-2">
        {patientList?.patients &&
          `${patientList.patients[0].name} ${patientList.patients[0].surname}`}
      </div>
      <BodyBackBtn btnText={pwaDictionary.my_Appointments} />

      <div className="text-center my-2 text-lg p-2 w-fit font-bold self-center">
        {pwaDictionary.privave_policy}
      </div>
      <div className="px-2">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
          quasi. Libero corrupti nulla esse repellat a modi, repudiandae
          perspiciatis rerum maiores placeat impedit! Nulla asperiores
          voluptatibus tenetur esse, iste molestias.
        </div>
        <div className="w-fit my-5">
          <button
            className={`${primaryBtnStyle} px-10`}
            onClick={() => navigate("/pwa/Booking/patientMeetingList")}
          >
            Entra
          </button>
        </div>
      </div>
    </div>
  );
}
