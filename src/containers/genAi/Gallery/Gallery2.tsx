// import { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// // import pdfIcon2 from '../../../assets/icons/pdfIcon-2.png';
// import pdfIcon from "@/assets/icons/pdfIcon.png";
// // import { BsDownload } from "react-icons/bs";
// // import shareIcon from '../../../../assets/icons/shareIcon.png';
// // import publish from '../../../../assets/icons/publish.png';
// import { threadDataType, faqResType } from "../type";
// // import Loader from "@/components/Loader";
// // import useDownloadImgApi from "@/apiHooks/genaiservices/txtToImg/useDownloadImgApi";
// // import useDownloadFaqApi from "@/apiHooks/genaiservices/faq/useDownloadFaqApi";

// const renderTitle = (text: string) =>
//   text && <p>{text.length > 15 ? `${text?.slice(0, 15)}...` : text}</p>;

// const renderText = (text: string) =>
//   text && <p>{text.length > 60 ? `${text?.slice(0, 60)}...` : text}</p>;

// const Gallery2 = ({
//   activeItem,
//   activeServiceType,
//   handleOpenFile,
// }: {
//   activeItem: threadDataType;
//   activeServiceType: string;
//   handleOpenFile: () => void;
// }) => {
//   const [faqData, setFaqData] = useState<faqResType[]>([]);

//   // const { isDownloadImgLoading, handleImageDownload } = useDownloadImgApi();
//   // const { isDownloadFaqLoading, handleFaqDownload } = useDownloadFaqApi();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (activeServiceType === "faq" && activeItem && activeItem.data) {
//         console.log(activeItem);
//         const url =
//           activeItem.data[0].json_file ?? activeItem.data[0].file_path;

//         if (url) {
//           try {
//             const response = await fetch(url);
//             const res = await response.json();
//             console.log(res);

//             setFaqData(res);
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="flex flex-col md:flex md:flex-row items-start gap-5 md:gap-20 my-5 h-full md:h-4/5 z-1">
//       <div
//         className={`red-500 w-4/5 h-96 sm:w-3/5 sm:h-full bg-gray-200 relative ${
//           activeItem.service !== "text_to_image" ? "p-4 overflow-y-auto" : ""
//         }`}
//       >
//         <div
//           className={`text-lg font-bold ${
//             activeItem.service !== "text_to_image" && "mb-2"
//           }`}
//         >
//           {activeServiceType !== "text_to_image" &&
//             activeItem &&
//             activeItem.data &&
//             (activeItem.data[0].file_name ??
//               activeItem.data[0].image_name ??
//               activeItem.data[0].question)}
//         </div>

//         {activeServiceType === "propchat" && activeItem && activeItem.data && (
//           <>
//             {/* <div className="font-bold mb-4">{activeItem.data[0].question}</div> */}
//             <div className="">
//               <ReactMarkdown
//                 children={activeItem.data[0].answer}
//               ></ReactMarkdown>
//             </div>
//           </>
//         )}
//         {activeServiceType === "faq" &&
//           faqData.map((faq, index) => (
//             <>
//               <div key={index} className="font-semibold mb-2">
//                 {faq.Question}
//               </div>
//               <div className="mb-4">{faq.Answer}</div>
//             </>
//           ))}
//         {activeServiceType === "image_to_text" && activeItem.data && (
//           <div className="h-60">
//             {activeItem.data[0].response ?? activeItem.data[0].answer}
//           </div>
//         )}
//         {activeServiceType === "cwyf" &&
//           activeItem &&
//           activeItem.data &&
//           activeItem.data[0].qa &&
//           activeItem.data[0].qa.map((item, index) => (
//             <>
//               <div key={index} className="font-semibold mb-2">
//                 {item.question}
//               </div>
//               <div className="mb-4">{item.answer}</div>
//             </>
//           ))}

//         {activeServiceType === "text_to_image" &&
//           activeItem &&
//           activeItem.data &&
//           activeItem.data[0].image_url && (
//             <img
//               src={activeItem.data[0].image_url}
//               alt=""
//               className="h-full w-full"
//             />
//           )}
//         {activeServiceType === "text_to_image" &&
//           activeItem &&
//           activeItem.data &&
//           activeItem.data[0].answer && (
//             <img
//               src={activeItem.data[0].answer}
//               alt=""
//               className="h-full w-full"
//             />
//           )}
//       </div>
//       <div className="w-2/4">
//         <div className="mb-3">
//           {activeServiceType === "cwyf" ? (
//             <span className="mr-3">File</span>
//           ) : activeServiceType === "propchat" ||
//             activeServiceType === "image_to_text" ? (
//             <span className="mr-3">Testo</span>
//           ) : activeServiceType === "text_to_image" ? (
//             <span className="mr-3">Immagine</span>
//           ) : activeServiceType === "faq" ? (
//             <span className="mr-3">Faqs</span>
//           ) : null}
//           {activeItem.created_at?.split(".")[0]}
//         </div>
//         {activeServiceType === "propchat" ? (
//           <div
//             // style={{ width: '15%' }}
//             className="bg-zinc-100 h-36 w-60 cursor-pointer rounded-lg p-3"
//           >
//             <h1 className="font-semibold mb-2">
//               {activeItem &&
//                 activeItem.data &&
//                 activeItem.data[0].question &&
//                 renderTitle(activeItem.data[0].question)}
//             </h1>
//             <p>
//               {activeItem &&
//                 activeItem.data &&
//                 activeItem.data[0].question &&
//                 activeItem.data[0].answer &&
//                 renderText(activeItem.data[0].answer)}
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="text-lg font-bold mt-5 mb-4">
//               {activeItem &&
//                 activeItem.data &&
//                 (activeItem.data[0].file_name ?? activeItem.data[0].image_name)}
//             </div>
//             {activeServiceType === "text_to_image" ? (
//               <p className="font-bold">
//                 {activeItem && activeItem.data && activeItem.data[0].prop}
//               </p>
//             ) : (
//               activeServiceType !== "faq" && (
//                 <div
//                   onClick={() =>
//                     activeServiceType === "cwyf" && handleOpenFile()
//                   }
//                   className="h-56 w-72 bg-zinc-200 flex justify-center items-center rounded-xl"
//                 >
//                   {activeServiceType === "cwyf" && (
//                     <img src={pdfIcon} alt="pdfIcon" className="h-10" />
//                   )}
//                   {activeServiceType === "image_to_text" &&
//                     activeItem.data &&
//                     activeItem.data[0].image_path && (
//                       <img
//                         src={activeItem.data[0].image_path}
//                         alt="pdfIcon"
//                         className="h-full w-full"
//                       />
//                     )}
//                 </div>
//               )
//             )}
//           </>
//         )}
//       </div>

//       {/* {activeItem.service === "faq" && (
//         <button
//           onClick={() => handleFaqDownload(activeItem._id)}
//           className="hover:bg-zinc-200 p-2 rounded-full"
//         >
//           <BsDownload />
//         </button>
//       )}
//       {activeItem.service === "text_to_image" && (
//         <button
//           onClick={() =>
//             handleImageDownload(
//               activeItem.data[0].image_url ??
//                 (activeItem.data[0].answer as string)
//             )
//           }
//           className="hover:bg-zinc-200 p-2 rounded-full"
//         >
//           <BsDownload />
//         </button>
//       )} */}

//       {/* {(isDownloadImgLoading || isDownloadFaqLoading) && <Loader />} */}
//     </div>
//   );
// };

// export default Gallery2;

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import pdfIcon from "@/assets/icons/pdfIcon.png";
import { BsDownload } from "react-icons/bs";
import { threadDataType, faqResType } from "../type";
import useDownloadImgApi from "@/components/hooks/genaiservices/txtToImg/useDownloadImgApi";
import NewLoader from "@/components/appComponents/NewLoader";
import useDownloadFaqApi from "@/components/hooks/genaiservices/faq/useDownloadFaqApi";

const renderTitle = (text: string) =>
  text && <p>{text.length > 15 ? `${text.slice(0, 15)}...` : text}</p>;

const renderText = (text: string) =>
  text && <p>{text.length > 60 ? `${text.slice(0, 60)}...` : text}</p>;

const Gallery2 = ({
  activeItem,
  activeServiceType,
  handleOpenFile,
}: {
  activeItem: threadDataType;
  activeServiceType: string;
  handleOpenFile: () => void;
}) => {
  const [faqData, setFaqData] = useState<faqResType[]>([]);
  const { isDownloadImgLoading, handleImageDownload } = useDownloadImgApi();
  const { isDownloadFaqLoading, handleFaqDownload } = useDownloadFaqApi();

  useEffect(() => {
    const fetchData = async () => {
      if (activeServiceType === "faq" && activeItem?.data?.[0]?.json_file) {
        const url =
          activeItem.data[0].json_file ?? activeItem.data[0].file_path;
        if (url) {
          try {
            const response = await fetch(url);
            const res = await response.json();
            setFaqData(res);
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    fetchData();
  }, [activeItem, activeServiceType]);

  const activeData = activeItem?.data?.[0];
  const activeQa = activeData?.qa;

  function formatDate(inputDate: string) {
    // Parse the input date string
    const date = new Date(inputDate);
    const today = new Date();

    // Check if the date is today
    if (date.toDateString() === today.toDateString()) {
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `Ogge alle ${hours}:${minutes}`;
    }

    // Get day, month, year, and time
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    // Format the date
    const formattedDate = `${day} ${month}, ${year} ${hours}:${minutes}`;

    // console.log("formattedDate", formattedDate);
    return formattedDate;
  }

  return (
    <div className="flex flex-col md:flex md:flex-row items-start gap-5 md:gap-20 my-5 h-full md:h-4/5 z-1">
      <div
        // className={`red-500 w-4/5 h-68 sm:w-3/5 sm:h-full bg-gray-200 relative ${
        className={`red-500 w-11/12 h-68 sm:w-3/5 sm:h-full bg-gray-200 relative ${
          activeItem?.service !== "text_to_image" ? "p-4 overflow-y-auto" : ""
        }`}
      >
        <div
          className={`text-md sm:text-lg font-bold ${
            activeItem?.service !== "text_to_image" && "mb-2"
          }`}
        >
          {activeServiceType !== "text_to_image" &&
            (activeData?.file_name ??
              activeData?.image_name ??
              activeData?.question)}
        </div>

        {activeServiceType === "propchat" && activeData?.answer && (
          <div>
            <ReactMarkdown children={activeData.answer}></ReactMarkdown>
          </div>
        )}

        {activeServiceType === "faq" &&
          faqData.map((faq, index) => (
            <div key={index}>
              <div className="font-semibold mb-2">{faq.Question}</div>
              <div className="mb-4">{faq.Answer}</div>
            </div>
          ))}

        {activeServiceType === "image_to_text" && (
          <div className="h-60">
            {activeData?.response ?? activeData?.answer}
          </div>
        )}

        {activeServiceType === "cwyf" &&
          activeQa?.map((item, index) => (
            <div key={index}>
              <div className="font-semibold mb-2">{item.question}</div>
              <div className="mb-4">{item.answer}</div>
            </div>
          ))}

        {activeServiceType === "text_to_image" && (
          <>
            {activeData?.image_url && (
              <img
                src={activeData.image_url}
                alt=""
                className="h-full w-full"
              />
            )}
            {activeData?.answer && (
              <img src={activeData.answer} alt="" className="h-full w-full" />
            )}
          </>
        )}
      </div>
      <div className="w-5/6 sm:w-2/4">
        <div className="mb-3">
          {activeServiceType === "cwyf" ? (
            <span className="mr-3">File</span>
          ) : activeServiceType === "propchat" ||
            activeServiceType === "image_to_text" ? (
            <span className="mr-3">Testo</span>
          ) : activeServiceType === "text_to_image" ? (
            <span className="mr-3">Immagine</span>
          ) : activeServiceType === "faq" ? (
            <span className="mr-3">Faqs</span>
          ) : null}
          {/* {activeItem?.created_at?.split(".")[0]} */}
          {formatDate(activeItem?.created_at ?? "")}
        </div>
        {activeServiceType === "propchat" ? (
          <div className="bg-zinc-100 h-36 w-60 cursor-pointer rounded-lg p-3">
            <h1 className="font-semibold mb-2">
              {activeData?.question && renderTitle(activeData.question)}
            </h1>
            <p>
              {activeData?.question &&
                activeData.answer &&
                renderText(activeData.answer)}
            </p>
          </div>
        ) : (
          <>
            <div className="text-md sm:text-lg font-bold mt-5 mb-4">
              {activeData?.file_name ?? activeData?.image_name}
            </div>
            {activeServiceType === "text_to_image" ? (
              <p className="font-bold">{activeData?.prop}</p>
            ) : (
              activeServiceType !== "faq" && (
                <div
                  onClick={() =>
                    activeServiceType === "cwyf" && handleOpenFile()
                  }
                  className="h-44 w-60 sm:h-56 sm:w-72 bg-zinc-200 flex justify-center items-center rounded-xl"
                >
                  {activeServiceType === "cwyf" && (
                    <img src={pdfIcon} alt="pdfIcon" className="h-10" />
                  )}
                  {activeServiceType === "image_to_text" &&
                    activeData?.image_path && (
                      <img
                        src={activeData.image_path}
                        alt="pdfIcon"
                        className="h-full w-full"
                      />
                    )}
                </div>
              )
            )}
          </>
        )}

        {activeItem.service === "faq" && (
          <button
            onClick={() => handleFaqDownload(activeItem._id)}
            className="flex gap-2 items-center bg-red-500 text-white py-1 px-3 mt-5 rounded-md"
          >
            <BsDownload /> Download
          </button>
        )}

        {activeItem.service === "text_to_image" && (
          <button
            onClick={() =>
              activeItem.data &&
              handleImageDownload(
                activeItem.data[0].image_url ??
                  (activeItem.data[0].answer as string)
              )
            }
            className="flex gap-2 items-center bg-red-500 text-white py-1 px-3 mt-5 rounded-md"
          >
            <BsDownload /> Download
          </button>
        )}
      </div>

      {/* {activeItem.service === "faq" && (
        <button
          onClick={() => handleFaqDownload(activeItem._id)}
          className="hidden md:block hover:bg-zinc-200 p-2 rounded-full"
        >
          <BsDownload />
        </button>
      )} */}
      {/* {activeItem.service === "text_to_image" && (
        <button
          onClick={() =>
            activeItem.data &&
            handleImageDownload(
              activeItem.data[0].image_url ??
                (activeItem.data[0].answer as string)
            )
          }
          className="hidden md:block hover:bg-zinc-200 p-2 rounded-full"
        >
          <BsDownload />
        </button>
      )} */}

      {(isDownloadImgLoading || isDownloadFaqLoading) && <NewLoader />}
    </div>
  );
};

export default Gallery2;
