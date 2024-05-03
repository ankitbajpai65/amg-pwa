import { pwaDictionary } from "@/lib/textDictionary";
import logo from "../../assets/loghi-03.png";
import { primaryBtnStyle } from "@/lib/cssTailwind";
import { useNavigate } from "react-router-dom";
import useGetPatientsListAPI from "@/components/hooks/AmgMS/amgPatientsMS/useGetPatients";
import { useEffect, useState } from "react";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { usePatientListContext } from "@/lib/context/patientListContext";
import Loader from "@/components/appComponents/Loader";

export default function HomePatientsMeetings() {
  const [patientAuthFlag, setPatientAuthFlag] = useState<boolean>(false);
  const [patientListLoadingFlag, setPatientListLoadingFlag] =
    useState<boolean>(true);

  const { patientList } = usePatientListContext();

  const { getPatientsList, getPatientsListRes } = useGetPatientsListAPI();
  const { userDetails } = useUserDetails();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      getPatientsList({
        userEmail: userDetails?.startList.users[0].email,
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (getPatientsListRes?.status === "I") {
      setPatientAuthFlag(() => true);
      sessionStorage.setItem(
        "patientDetails",
        JSON.stringify({
          patientId: patientList?.patients[0].id,
          patientEmail: patientList?.patients[0].email,
        })
      );
      setPatientListLoadingFlag(false);
    } else {
      setPatientAuthFlag(false);
      if (getPatientsListRes?.status) setPatientListLoadingFlag(false);
    }
  }, [getPatientsListRes]);
  // console.log({ patientList });

  return (
    <div className="flex flex-col">
      {patientListLoadingFlag ? (
        <div className="flex justify-center my-5">
          <Loader size={8} status={patientListLoadingFlag} />
        </div>
      ) : patientAuthFlag ? (
        <>
          <div className="bg-text-red text-white text-center text-lg p-2">
            {patientList?.patients
              ? `${patientList.patients[0].name} ${patientList.patients[0].surname}`
              : "Customer ID"}
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
              {userDetails?.startList.baseData.find(
                (item) => item.code === "PWAPATBOOKHOMETEXT"
              )?.itemValue}
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
        </>
      ) : (
        <div className="my-5 mx-2 text-center">
          <div>Utente non abilitato per questa funzione</div>
        </div>
      )}
    </div>
  );
}
