import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { successAlert } from "@/components/appComponents/appAlert";
import useGetMeetingsListAPI from "@/components/hooks/AmgMS/amgMeetingMS/useGetMeetingsListApi";
import useSendMailApi from "@/components/hooks/AmgMS/useSendMailApi";
import { useMeetingListContext } from "@/lib/context/meetingsListContext";
import { usePatientListContext } from "@/lib/context/patientListContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { primaryBtnStyle } from "@/lib/cssTailwind";
import { pwaDictionary } from "@/lib/textDictionary";
import { SingleAppointmentType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function MeetingDetails() {
  const [singleMeetingDetails, setSingleMeetingDetails] =
    useState<SingleAppointmentType>();
  const [modalVisible, setModalVisible] = useState(false);

  const { getMeetingsListApi, getMeetingsListRes } = useGetMeetingsListAPI();
  const { getSendMailAPI, sendMailAPIRes } = useSendMailApi();

  const { meetingList } = useMeetingListContext();
  const { patientList } = usePatientListContext();
  const { userDetails } = useUserDetails();

  const location = useLocation();

  //   const singleMeetingDetails = meetingList?.meetings[0];

  useEffect(() => {
    if (location.state.patientId && userDetails) {
      getMeetingsListApi({
        userEmail: userDetails?.startList.users[0].email as string,
        patientId: location.state.patientId,
      });
    }
  }, [location.state, userDetails]);

  useEffect(() => {
    console.log({ meetingList });
    if (getMeetingsListRes?.status === "I" && meetingList?.meetings[0]) {
      setSingleMeetingDetails(
        meetingList?.meetings.find(
          (item) => item.id === parseInt(location.state.meetingId)
        )
      );
    }
  }, [getMeetingsListRes, meetingList]);

  useEffect(() => {
    if (sendMailAPIRes?.status === "I") {
      successAlert(1000, "Mail Sent");
    }
  }, [sendMailAPIRes]);

  const handleCancelReq = () => {
    if (patientList) {
      //   console.log({ patientList });
      setModalVisible(false);
      const singlePatientDetails = patientList?.patients.find(
        (item) => parseInt(item.id) === singleMeetingDetails?.idPatient
      );
      console.log({ singleMeetingDetails, singlePatientDetails });
      if (singleMeetingDetails && singlePatientDetails) {
        getSendMailAPI({
          user: userDetails?.startList.users[0].email as string,
          to: userDetails?.startList.baseData.find(
            (item) => item.code === "PWAPATBOOKMAILTO"
          )?.itemValue as string,
          cc: "",
          sub: "PWA_BOOKING Richiesta cancellazione appuntamento",
          body: `Il paziente ${singlePatientDetails.id} ${
            singlePatientDetails?.surname
          } ${
            singlePatientDetails?.name
          } ha richiesto la cancellazione dell’appuntamento del ${new Date(
            singleMeetingDetails.slotDate
          ).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })} con ${singleMeetingDetails.slotOperatorName} `,
          sendType: "MAIL",
        });
      }
    }
  };

  return (
    <div className="m-2">
      <BodyBackBtn
        btnText={pwaDictionary.my_Appointments}
        returnToPath="/pwa/Booking/patientMeetingList"
      />
      <div className="my-2">
        <p className="text-lg font-semibold">{pwaDictionary.meeting_details}</p>
        {singleMeetingDetails && (
          <>
            <div className="my-2 px-2">
              <div>Operator: {singleMeetingDetails?.slotOperatorName}</div>
              <div>Location: {singleMeetingDetails?.slotLocation}</div>
              <div>
                Date:{" "}
                {new Date(singleMeetingDetails.slotDate).toLocaleString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}
              </div>
              <div>Location: {singleMeetingDetails?.slotLocation}</div>
              <div>Notes: {singleMeetingDetails?.notes}</div>
            </div>
            <button
              className={primaryBtnStyle}
              onClick={() => setModalVisible(true)}
            >
              {pwaDictionary.cancel_req}
            </button>
          </>
        )}
        {modalVisible && singleMeetingDetails && (
          <div className="p-4 w-[320px] absolute top-52 left-0 right-0 m-auto justify-center border rounded-md bg-gray-200">
            <p className="">
              Conferma richiesta cancellazione appuntamento <br /> del&nbsp;
              {new Date(singleMeetingDetails.slotDate).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              <br />
              con {singleMeetingDetails.slotOperatorName}
            </p>
            <div className="flex justify-center my-2 gap-2">
              <button
                className="bg-text-red p-2 px-5 rounded-md"
                onClick={() => handleCancelReq()}
              >
                Si
              </button>
              <button
                className="bg-gray-400 p-2 px-5 rounded-md"
                onClick={() => setModalVisible(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
