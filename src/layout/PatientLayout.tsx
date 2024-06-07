import useGetMeetingsListAPI from "@/components/hooks/AmgMS/amgMeetingMS/useGetMeetingsListApi";
import useGetPatientsListAPI from "@/components/hooks/AmgMS/amgPatientsMS/useGetPatients";
import { useMeetingListContext } from "@/lib/context/meetingsListContext";
import { usePatientListContext } from "@/lib/context/patientListContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PatientLayout() {
  const { getPatientsList } = useGetPatientsListAPI();
  const { getMeetingsListApi } = useGetMeetingsListAPI();
  const { patientList } = usePatientListContext();
  const { meetingList } = useMeetingListContext();
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

  useEffect(() => {
    if (!meetingList && patientList && userDetails) {
      getMeetingsListApi({
        userEmail: userDetails?.startList.users[0].email as string,
        patientId: patientList.patients[0].id,
      });
    }
  }, [patientList, userDetails, meetingList]);

  return (
    <>
      <Outlet />
    </>
  );
}
