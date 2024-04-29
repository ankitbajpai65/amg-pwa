import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { pwaDictionary } from "@/lib/textDictionary";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { usePatientListContext } from "@/lib/context/patientListContext";
import { useEffect } from "react";
import useGetMeetingsListAPI from "@/components/hooks/AmgMS/amgMeetingMS/useGetMeetingsListApi";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { useMeetingListContext } from "@/lib/context/meetingsListContext";

export default function PatientMeetingList() {
  const { patientList } = usePatientListContext();
  const { meetingList } = useMeetingListContext();
  const { userDetails } = useUserDetails();

  const { getMeetingsListApi, getMeetingsListRes } = useGetMeetingsListAPI();
  // const { getPatientsList, getPatientsListRes } = useGetPatientsListAPI();

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      // console.log(patientList?.patients[0].id, userDetails, getPatientsListRes);
      if (patientList && patientList.patients) {
        getMeetingsListApi({
          userEmail: userDetails?.startList.users[0].email,
          patientId: patientList?.patients[0].id,
        });
      }
    }
  }, [userDetails, patientList]);

  useEffect(() => {
    if (getMeetingsListRes?.status === "I") {
      console.log({ meetingList });
    }
  }, [getMeetingsListRes]);

  return (
    <div className="flex flex-col">
      <div className="bg-text-red text-white text-center text-lg p-2">
        Centro Salute
      </div>
      <BodyBackBtn
        btnText={pwaDictionary.my_Appointments}
        returnToPath="/pwa/Booking/patientMeetings"
      />

      <div className="text-center flex gap-2 my-2 text-lg p-2 w-fit font-bold self-center">
        <p>Storia Appuntamenti</p>
        <button
          className="bg-text-red w-8 h-8 rounded-md"
          onClick={() => navigate("/pwa/Booking/newMeeting")}
        >
          +
        </button>
      </div>
      <div className="border rounded-md mx-4">
        {meetingList?.meetings &&
          meetingList.meetings[0] &&
          meetingList?.meetings.map((items, idx) => {
            return (
              <div key={idx}>
                <div className="flex py-2">
                  <div
                    className={`${
                      idx === 1 ? "bg-red-500" : "bg-yellow-500"
                    } my-1 mx-2 h-5 w-5 rounded-full`}
                  ></div>
                  <div className="grow px-4">
                    <div>
                      <span className="font-semibold">Date :&nbsp;</span>
                      {new Date(items?.slotDate).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                    <div>
                      <span className="font-semibold">Start Time : </span>
                      {items?.timeStart.split(".")[0].slice(0, 5)}
                    </div>
                    <div>
                      <span className="font-semibold">Duration : </span>
                      {items.duration}
                    </div>
                    <div className="flex">
                      <span className="font-semibold">Operatore&nbsp;:</span>
                      &nbsp;
                      <span>{items.slotOperatorName}</span>{" "}
                    </div>
                  </div>
                  <div className="self-center mx-2">
                    <button
                      onClick={() =>
                        navigate("/pwa/Booking/meetingDetails", {
                          state: {
                            patientId: items.idPatient,
                            meetingId: items.id,
                          },
                        })
                      }
                    >
                      <IoIosArrowDroprightCircle size={25} />
                    </button>
                  </div>
                </div>
                <div className="border-b"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
