import DropSelector from "@/components/appComponents/DropSelector";
import useGetOperatorsListAPI from "@/components/hooks/AmgMS/amgOperatorMS/useGetOperators";
import { useOperatorListContext } from "@/lib/context/operatorListContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import { pwaDictionary } from "@/lib/textDictionary";
import { amgStartTableType, selectorValueType } from "@/lib/types";
import { useEffect, useState } from "react";

export default function NewMeeting() {
  const [operatoreValue, setOperatoreValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [timeStartValue, setTimeStartValue] = useState("");
  const [date, setDate] = useState<Date>();
  const [noteValue, setNoteValue] = useState("");
  const [locationList, setLocationList] = useState<amgStartTableType>();
  const [operatorListTable, setOperatorListTable] =
    useState<amgStartTableType>();
  const [selectorValue, setSelectorValue] = useState<selectorValueType>({
    id: 0,
    label: "",
    value: "",
  });

  const { getOperatorsList } = useGetOperatorsListAPI();

  const { userDetails } = useUserDetails();
  const { operatorList } = useOperatorListContext();

  useEffect(() => {
    if (userDetails) {
      getOperatorsList({ userEmail: userDetails?.startList.users[0].email });
    }
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.status === "I") {
      const tempLocationStd = userDetails?.startList.tables.filter((item) => {
        if (item.tableCode === "BOOKLOCA") {
          return item;
        }
      });
      tempLocationStd &&
        setLocationList(() => tempLocationStd as amgStartTableType);
    }
  }, [userDetails]);

  useEffect(() => {
    if (operatorList?.status === "I") {
      const tempOperators = operatorList?.operators.map((items) => {
        return {
          itemCode: items.operatorCode,
          itemValue: `${items.name} ${items.surname}`,
        };
      });
      tempOperators &&
        setOperatorListTable(() => tempOperators as amgStartTableType);
    }
  }, [operatorList]);
  useEffect(() => {
    if (selectorValue.label && selectorValue.id === 1) {
      handleOperatoreValueChange(selectorValue.value, selectorValue.id);
    }

    if (selectorValue.label && selectorValue.id === 2) {
      handleLocationValueChange(selectorValue.value, selectorValue.id);
    }
  }, [selectorValue]);

  const handleOperatoreValueChange = (value: string, id: number) => {
    if (id === 1) {
      setOperatoreValue(() => value);
    }
  };

  const handleLocationValueChange = (value: string, id: number) => {
    if (id === 2) {
      setLocationValue(() => value);
    }
  };

  return (
    <div className="my-2">
      <div className="mx-5">
        <div className="flex flex-col my-1 w-full">
          <label className="px-2">Operatore</label>
          <DropSelector
            setSelectorValue={setSelectorValue}
            apiSelectedValue={operatoreValue}
            amgStartTable={operatorListTable}
            placeholder={`Seleziona Operatore`}
            id={1}
          />
        </div>
        <div className="flex flex-col my-1 w-full">
          <label className="px-2">Location</label>
          <DropSelector
            setSelectorValue={setSelectorValue}
            apiSelectedValue={locationValue}
            amgStartTable={locationList}
            placeholder={`Seleziona Location`}
            id={2}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col my-1 w-[50%]">
            <label className="px-2">{pwaDictionary.Start_Time}</label>
            <input
              type="time"
              className="border rounded-md p-2 w-full text-center"
              value={timeStartValue}
              onChange={(e) => {
                setTimeStartValue(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col my-1">
            <label className="px-2">Date</label>
            <input
              type="date"
              className="border rounded-md p-2 w-full text-center"
              value={new Date(date as Date).toLocaleString("fr-CA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              onChange={(e) => {
                console.log(e.target.value);
                setDate(new Date(e.target.value));
              }}
            />
          </div>
        </div>
        <div className="flex flex-col my-1">
          <label className="px-2">Note</label>
          <textarea
            className="border rounded-md p-2 w-full resize-none outline-0"
            placeholder="Note"
            value={noteValue}
            onChange={(e) => {
              setNoteValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button className="bg-text-red text-white p-2 px-4 rounded-md">
          {pwaDictionary.confirm}
        </button>
        <button className="bg-gray-300 p-2 px-4 rounded-md">
          {pwaDictionary.cancel}
        </button>
      </div>
    </div>
  );
}
