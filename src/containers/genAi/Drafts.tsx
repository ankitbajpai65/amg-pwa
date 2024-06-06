const renderResponse = (text: string) =>
  text && (
    <p className="">{text.length > 150 ? `${text?.slice(0, 150)}...` : text}</p>
  );

const Drafts = (props: {
  response: string;
  label: string;
  isSelected: boolean;
  onClick: (question: string, response: string) => void;
}) => {
  const { response, label, isSelected, onClick } = props;
  return (
    <div
      onClick={() => onClick(response, label)}
      className={`w-1/3 p-3 rounded-md text-xs flex flex-col cursor-pointer ${
        isSelected ? "bg-red-200" : "bg-zinc-100"
      }`}
    >
      <span
        className={`w-fit py-1 px-3 text-xs rounded-xl font-semibold mb-2 ${
          isSelected ? "bg-red-300" : "bg-zinc-200"
        }`}
      >
        {label}
      </span>
      {/* <div>{response}</div> */}
      <div>{renderResponse(response)}</div>
    </div>
  );
};

export default Drafts;
