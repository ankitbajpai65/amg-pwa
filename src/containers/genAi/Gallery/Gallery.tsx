import { useState, useEffect } from "react";
// import FileViewerModal from "../FileViewerModal";
import { threadDataType, groupByDateType } from "../type";
// import back from "../../../../assets/icons/back.png";
import textIcon from "@/assets/icons/textIcon.png";
import chatquestionsIcon from "@/assets/icons/faq.png";
import documentIcon from "@/assets/icons/cwyf.png";
import materialIcon from "@/assets/icons/imgTxt.png";
import { PiFileImageDuotone } from "react-icons/pi";
import { IoChevronBackOutline } from "react-icons/io5";
import Gallery1 from "./Gallery1";
import Gallery2 from "./Gallery2";

const groupByDate = (array: threadDataType[]) => {
  console.log(array);
  const newThreadDateArray: string[] = [];
  array.forEach((item, idx) => {
    if (
      idx < array.length - 1 &&
      item.created_at?.split(" ")[0] !==
        array[idx + 1].created_at?.split(/[ T]/)[0]
    ) {
      newThreadDateArray.push(item?.created_at?.split(/[ T]/)[0] as string);
    } else {
      if (
        idx === array.length - 1 &&
        array[array.length - 2]?.created_at?.split(/[ T]/)[0] ===
          array[array.length - 1]?.created_at?.split(/[ T]/)[0]
      ) {
        newThreadDateArray.push(item?.created_at?.split(/[ T]/)[0] as string);
      } else if (array.length === 1) {
        newThreadDateArray.push(item?.created_at?.split(/[ T]/)[0] as string);
      }
    }
  });
  console.log({ newThreadDateArray });
  //!if  DATa IS SORTED by DATE
  let newThreadDateArrayFlag = 0;
  const group: { date: string; threadData: threadDataType[] }[] = [];
  let subGroup: threadDataType[] = [];
  array.forEach((item, idx) => {
    if (
      newThreadDateArrayFlag < newThreadDateArray.length &&
      idx !== array.length - 1 &&
      newThreadDateArray[newThreadDateArrayFlag] ===
        item.created_at?.split(/[ T]/)[0]
    ) {
      subGroup.push(item);
    } else {
      if (idx === array.length - 1) {
        subGroup.push(item);
      }
      group.push({
        date: newThreadDateArray[newThreadDateArrayFlag],
        threadData: subGroup,
      });
      subGroup = [item];
      newThreadDateArrayFlag = newThreadDateArrayFlag + 1;
    }
  });
  console.log({ group });
  return group;
};

const Gallery = (props: {
  setShowGallery: React.Dispatch<boolean>;
  activeServiceType: string;
  threadArray: threadDataType[] | undefined;
  // uploadedFileDetails: uploadedFileDetailsType;
}) => {
  const {
    setShowGallery,
    activeServiceType,
    threadArray,
    // uploadedFileDetails,
  } = props;
  const [filteredArray, setFilteredArray] = useState<groupByDateType>([]);
  const [activeItem, setActiveItem] = useState<threadDataType | null>(null);

  // const [openedFileDetail, setOpenedFileDetail] = useState({})
  // const [isFileModalVisible, setIsFileModalVisible] = useState<boolean>(false);
  // const [openedFileDetail, setOpenedFileDetail] =
  //   useState<openedThreadFileDetailType>({
  //     file: "",
  //     fileName: "",
  //   });

  // console.log("openedThreadFileDetail", uploadedFileDetails);
  // console.log("openedFileDetail", openedFileDetail);

  const handleOpenFile = () => {
    if (activeItem && activeItem.data) {
      const a = document.createElement("a");
      a.href = activeItem?.data[0]?.file_path ?? "";
      a.setAttribute("target", "_blank");
      a.click();
    }
  };

  useEffect(() => {
    if (threadArray) {
      const array = threadArray.filter(
        (item) => item.service === activeServiceType
      );
      const groupedArray = groupByDate(array);
      console.log(groupedArray);

      setFilteredArray(groupedArray);
    }
  }, [activeServiceType, threadArray]);

  console.log(filteredArray);

  return (
    <div className={`grow flex w-full p-3 sm:p-5 overflow-scroll`}>
      {/* {isFileModalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
      )} */}
      <div className="w-full">
        <div className="flex gap-6 items-center">
          {/* <img
            src={back}
            alt=""
            className="h-4 w-2 cursor-pointer"
            onClick={() => {
              if (activeItem) setActiveItem(null);
              else setShowGallery(false);
            }}
          /> */}
          <IoChevronBackOutline
            onClick={() => {
              if (activeItem) setActiveItem(null);
              else setShowGallery(false);
            }}
          />
          <div className="w-48 bg-zinc-100 flex gap-2 items-center p-2">
            {activeServiceType === "text_to_image" ? (
              <PiFileImageDuotone />
            ) : (
              <img
                src={
                  activeServiceType === "propchat"
                    ? textIcon
                    : activeServiceType === "cwyf"
                    ? documentIcon
                    : activeServiceType === "faq"
                    ? chatquestionsIcon
                    : activeServiceType === "image_to_text"
                    ? materialIcon
                    : ""
                }
                alt=""
                className="h-4"
              />
            )}
            {activeServiceType === "cwyf" ? (
              <p className="font-semibold">Files</p>
            ) : activeServiceType === "propchat" ||
              activeServiceType === "image_to_text" ? (
              <p className="font-semibold">Testi</p>
            ) : activeServiceType === "text_to_image" ? (
              <p className="font-semibold">Immagini</p>
            ) : activeServiceType === "faq" ? (
              <p className="font-semibold">Faqs</p>
            ) : null}
          </div>

          {/* {activeItem?.service === "faq" && (
            <button
              onClick={() => handleFaqDownload(activeItem._id)}
              className="block md:hidden hover:bg-zinc-200 p-2 rounded-full ml-auto"
            >
              <BsDownload />
            </button>
          )} */}
          {/* {activeItem?.service === "text_to_image" && (
            <button
              onClick={() =>
                activeItem?.data &&
                handleImageDownload(
                  activeItem?.data[0]?.image_url ??
                    (activeItem?.data[0]?.answer as string)
                )
              }
              className="block md:hidden hover:bg-zinc-200 p-2 rounded-full ml-auto"
            >
              <BsDownload />
            </button> 
          )} */}
        </div>
        {/* <input type="text" placeholder="Search..." className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" /> */}
        {!activeItem ? (
          <Gallery1
            filteredArray={filteredArray}
            setActiveItem={setActiveItem}
          />
        ) : (
          <Gallery2
            activeItem={activeItem}
            activeServiceType={activeServiceType}
            handleOpenFile={handleOpenFile}
          />
        )}
      </div>
      {/* {isFileModalVisible && (
        <FileViewerModal
          setIsFileModalVisible={setIsFileModalVisible}
          openedThreadFileDetail={openedFileDetail}
          uploadedFileDetails={uploadedFileDetails}
        />
      )} */}

    </div>
  );
};

export default Gallery;
