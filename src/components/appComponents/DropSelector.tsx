import { useEffect, useState } from "react";
import { amgStartTableType, selectorValueType } from "@/lib/types";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

type optionType = { label: string; value: string };

export default function DropSelector(props: {
  amgStartTable?: amgStartTableType;
  setSelectorValue: React.Dispatch<React.SetStateAction<selectorValueType>>;
  id?: number;
  placeholder?: string;
  selectType?: string;
  apiSelectedValue?: string;
}) {
  // const [value, setValue] = useState<string>("");
  const [crewOptions, setOptions] = useState<optionType[]>([]);
  const [selectedValue, setSelectedValue] = useState<optionType>();
  const createOption = (label: string, value: string) => ({
    label,
    value,
  });

  useEffect(() => {
    if (props.apiSelectedValue) {
      if (props.amgStartTable) {
        setSelectedValue(() =>
          createOption(
            props.amgStartTable?.find(
              (item) =>
                item.itemCode.toLowerCase() ===
                props.apiSelectedValue?.toLowerCase()
            )?.itemValue as string,
            props.apiSelectedValue as string
          )
        );
      }
    }
  }, [props.apiSelectedValue]);

  useEffect(() => {
    const tempArray: optionType[] = [];

    if (props.amgStartTable) {
      props.amgStartTable?.map((item) => {
        tempArray.push(createOption(item.itemValue, item.itemCode));
      });
      setOptions(tempArray);
    }
  }, [props.amgStartTable]);

  const handleChange = (inputValue: { label: string; value: string }) => {
    // console.log(crewOptions, inputValue);
    props.setSelectorValue({
      id: props?.id,
      label: inputValue.label,
      value: inputValue.value,
    });
  };
  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue, inputValue);
    setOptions((prev) => [...prev, newOption]);
    setSelectedValue(newOption);
  };
  // console.log(selectedValue);
  return (
    <>
      {props.selectType === "create" ? (
        <CreatableSelect
          options={crewOptions}
          // isClearable
          placeholder={props.placeholder}
          onChange={(newValue) =>
            handleChange({
              label: newValue?.label as string,
              value: newValue?.value as string,
            })
          }
          onCreateOption={handleCreate}
          // value={optionvalue}
          value={selectedValue}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: "#9191914d",
              primary: "#A9A9A9",
            },
          })}
        />
      ) : (
        <Select
          options={crewOptions}
          // isClearable
          placeholder={props.placeholder}
          onChange={(newValue) =>
            handleChange({
              label: newValue?.label as string,
              value: newValue?.value as string,
            })
          }
          value={selectedValue as optionType}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: "#9191914d",
              primary: "#A9A9A9",
            },
          })}
        />
      )}
    </>
  );
}
