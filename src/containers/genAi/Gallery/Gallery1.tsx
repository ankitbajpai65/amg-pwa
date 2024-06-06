// import {
//   threadDataType,
//   // filteredArrayType,
//   groupByDateType,
// } from "../type";

// const renderTitle = (text: string) =>
//   text && <p>{text.length > 15 ? `${text?.slice(0, 15)}...` : text}</p>;

// const renderText = (text: string) =>
//   text && <p>{text.length > 60 ? `${text?.slice(0, 60)}...` : text}</p>;

// const Gallery1 = ({
//   filteredArray,
//   setActiveItem,
// }: {
//   // filteredArray: filteredArrayType
//   filteredArray: groupByDateType;
//   setActiveItem: React.Dispatch<threadDataType>;
// }) => {
//   console.log(filteredArray);

//   const handleItemClicked = (item: threadDataType) => {
//     console.log(item);
//     setActiveItem(item);
//   };

//   return (
//     <div className="w-full mt-5">
//       {
//         // filteredArray.map(([date, items], index) => (
//         filteredArray.map(
//           (
//             items: {
//               date: string;
//               threadData: threadDataType[];
//             },
//             index: number
//           ) => {
//             if (!items.date) return;
//             // console.log(new Date(items.date).toDateString());

//             // const today = new Date();
//             // console.log(today.toDateString());

//             return (
//               <div key={index} className="">
//                 <h1
//                   className="font-futura text-xl my-6"
//                   style={{ fontSize: "20px", fontWeight: 400 }}
//                 >
//                   {/* {items.date ===
//                 new Date().toLocaleString("fr-CA", {
//                   day: "2-digit",
//                   month: "2-digit",
//                   year: "numeric",
//                 }) */}
//                   {new Date(items.date).toDateString() ===
//                   new Date().toDateString()
//                     ? "Oggi"
//                     : items.date}

//                   {/* {items.date === new Date().toISOString() ? "Oggi" : items.date} */}
//                 </h1>
//                 <div className="flex flex-wrap gap-3">
//                   {items.threadData.map(
//                     (item: threadDataType, index: number) => (
//                       <div
//                         onClick={() => handleItemClicked(item)}
//                         style={
//                           item.service !== "text_to_image"
//                             ? { width: "15%", minWidth: "10rem" }
//                             : { width: "12%", minWidth: "10rem" }
//                         }
//                         className={`bg-zinc-100 h-36 cursor-pointer rounded-lg ${
//                           item.service !== "text_to_image" && "p-3"
//                         }`}
//                         key={index}

//                         {item.service === "propchat" && (
//                           <h1 className="font-semibold mb-2">
//                             {item.data && item.data[0].question &&
//                               renderTitle(item.data[0].question)}
//                           </h1>
//                         )}
//                         {item.service === "propchat" && (
//                           <p>
//                             {item.data[0].answer &&
//                               renderText(item.data[0].answer)}
//                           </p>
//                         )}
//                         {item.service === "faq" && (
//                           <div className="h-full flex flex-col justify-around">
//                             <h1 className="font-semibold mb-2">
//                               {(item.data[0].file_name &&
//                                 renderTitle(item.data[0].file_name)) ??
//                                 (item.data[0].question &&
//                                   renderTitle(item.data[0].question))}
//                             </h1>
//                             <h2>Generated FAQ</h2>
//                           </div>
//                         )}
//                         {item.service === "cwyf" && (
//                           <h1 className="font-semibold mb-2">
//                             {(item.data[0].file_name &&
//                               renderTitle(item.data[0].file_name)) ??
//                               (item.data[0].question &&
//                                 renderTitle(item.data[0].question))}
//                           </h1>
//                         )}
//                         {item.service === "cwyf" && (
//                           <p>
//                             {(item.data &&
//                               item.data[0].qa &&
//                               item.data[0].qa[0]?.question &&
//                               item.data[0].qa[0]?.question) ??
//                               (item.data[0].answer &&
//                                 renderTitle(item.data[0].answer))}
//                           </p>
//                         )}
//                         {item.service === "image_to_text" && (
//                           <h1 className="font-semibold mb-2">
//                             {(item.data[0].image_name &&
//                               renderTitle(item.data[0].image_name)) ??
//                               (item.data[0].question &&
//                                 renderTitle(item.data[0].question))}
//                           </h1>
//                         )}
//                         {item.service === "image_to_text" && (
//                           <p>
//                             {(item.data[0].response &&
//                               renderText(item.data[0].response)) ??
//                               (item.data[0].answer &&
//                                 renderTitle(item.data[0].answer))}
//                           </p>
//                         )}
//                         {item.service === "text_to_image" &&
//                           item.data[0]?.image_url && (
//                             <img
//                               src={item.data[0].image_url}
//                               alt=""
//                               className="h-full w-full"
//                             />
//                           )}
//                         {item.service === "text_to_image" &&
//                           item.data[0]?.answer && (
//                             <img
//                               src={item?.data[0]?.answer}
//                               alt=""
//                               className="h-full w-full"
//                             />
//                           )}
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             );
//           }
//         )
//       }
//     </div>
//   );
// };

// export default Gallery1;

import React from "react";
import { threadDataType, groupByDateType } from "../type";

const renderTitle = (text: string) =>
  text ? <p>{text.length > 15 ? `${text.slice(0, 15)}...` : text}</p> : null;

const renderText = (text: string) =>
  text ? <p>{text.length > 60 ? `${text.slice(0, 60)}...` : text}</p> : null;

const Gallery1 = ({
  filteredArray,
  setActiveItem,
}: {
  filteredArray: groupByDateType;
  setActiveItem: React.Dispatch<React.SetStateAction<threadDataType | null>>;
}) => {
  console.log(filteredArray);

  const handleItemClicked = (item: threadDataType) => {
    console.log(item);
    setActiveItem(item);
  };

  return (
    <div className="w-full mt-5">
      {filteredArray.map((items, index) => {
        if (!items.date) return null;

        return (
          <div key={index}>
            <h1
              className="font-futura text-xl my-6"
              style={{ fontSize: "20px", fontWeight: 400 }}
            >
              {new Date(items.date).toDateString() === new Date().toDateString()
                ? "Oggi"
                : items.date}
            </h1>
            <div className="flex flex-wrap gap-3">
              {items.threadData.map((item, index) => (
                <div
                  onClick={() => handleItemClicked(item)}
                  style={
                    item.service !== "text_to_image"
                      ? { width: "15%", minWidth: "10rem" }
                      : { width: "12%", minWidth: "10rem" }
                  }
                  className={`bg-zinc-100 h-36 cursor-pointer rounded-lg ${
                    item.service !== "text_to_image" && "p-3"
                  }`}
                  key={index}
                >
                  {item.service === "propchat" && (
                    <>
                      <h1 className="font-semibold mb-2">
                        {item.data?.[0]?.question &&
                          renderTitle(item.data[0].question)}
                      </h1>
                      <p>
                        {item.data?.[0]?.answer &&
                          renderText(item.data[0].answer)}
                      </p>
                    </>
                  )}
                  {item.service === "faq" && (
                    <div className="h-full flex flex-col justify-around">
                      <h1 className="font-semibold mb-2">
                        {renderTitle(
                          item.data?.[0]?.file_name ??
                            item.data?.[0]?.question ??
                            ""
                        )}
                      </h1>
                      <h2>Generated FAQ</h2>
                    </div>
                  )}
                  {item.service === "cwyf" && (
                    <>
                      <h1 className="font-semibold mb-2">
                        {renderTitle(
                          item.data?.[0]?.file_name ??
                            item.data?.[0]?.question ??
                            ""
                        )}
                      </h1>
                      <p>
                        {renderText(
                          item.data?.[0]?.qa?.[0]?.question ??
                            item.data?.[0]?.answer ??
                            ""
                        )}
                      </p>
                    </>
                  )}
                  {item.service === "image_to_text" && (
                    <>
                      <h1 className="font-semibold mb-2">
                        {renderTitle(
                          item.data?.[0]?.image_name ??
                            item.data?.[0]?.question ??
                            ""
                        )}
                      </h1>
                      <p>
                        {renderText(
                          item.data?.[0]?.response ??
                            item.data?.[0]?.answer ??
                            ""
                        )}
                      </p>
                    </>
                  )}
                  {item.service === "text_to_image" && (
                    <>
                      {item.data?.[0]?.image_url && (
                        <img
                          src={item.data[0].image_url}
                          alt=""
                          className="h-full w-full"
                        />
                      )}
                      {item.data?.[0]?.answer && (
                        <img
                          src={item.data[0].answer}
                          alt=""
                          className="h-full w-full"
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery1;
