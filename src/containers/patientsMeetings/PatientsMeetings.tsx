import { pwaDictionary } from "@/lib/textDictionary";
import logo from "../../assets/loghi-03.png";
import { primaryBtnStyle } from "@/lib/cssTailwind";
import { useNavigate } from "react-router-dom";

export default function PatientsMeetings() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="bg-text-red text-white text-center text-lg p-2">
        Customer ID
      </div>
      <div className="flex justify-center">
        <div className="flex items-center">
          <div className="h-12 sm:h-14">
            <img className="h-full" src={logo} />
          </div>
          <p className="flex text-text-blue sm:text-2xl font-semibold">
            EASY<span className="text-red-500">DAI</span>
          </p>
        </div>
      </div>
      <div className="text-center text-lg p-2 border w-fit self-center">
        {pwaDictionary.my_Appointments}
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
            onClick={() => navigate("/pwa/Booking/patientPrivacy")}
          >
            Avanti
          </button>
        </div>
      </div>
    </div>
  );
}
