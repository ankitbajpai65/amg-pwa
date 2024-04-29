import useGetPatientsListAPI from "@/components/hooks/AmgMS/amgPatientsMS/useGetPatients";
import { usePatientListContext } from "@/lib/context/patientListContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PatientLayout() {
  const { getPatientsList } = useGetPatientsListAPI();
  const { patientList } = usePatientListContext();
  const { userDetails } = useUserDetails();

  useEffect(() => {
    // console.log({ patientList, userDetails });
    if (!patientList && userDetails) {
      console.log(":yo");
      getPatientsList({
        userEmail: userDetails?.startList.users[0].email,
      });
    }
  }, [patientList, userDetails]);

  return (
    <>
      <Outlet />
    </>
  );
}
