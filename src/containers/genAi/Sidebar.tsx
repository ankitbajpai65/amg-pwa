import newChatIcon from "../../assets/icons/newChatIcon.png";
import { MdCancel } from "react-icons/md";
import { PiFileImageDuotone } from "react-icons/pi";
import textIcon from "@/assets/icons/textIcon.png";
import faqIcon from "@/assets/icons/faq.png";
import cwyfIcon from "@/assets/icons/cwyf.png";
import imgTxtIcon from "@/assets/icons/imgTxt.png";
import { threadDataType } from "./type";
import { forwardRef } from "react";
import { MdDelete } from "react-icons/md";
import useDeleteThreadApi from "@/components/hooks/genaiservices/useDeleteThreadApi";
import NewLoader from "@/components/appComponents/NewLoader";

const renderText = (text: string) =>
  text && (
    <p className="">{text.length > 16 ? `${text?.slice(0, 16)}...` : text}</p>
  );

const Sidebar = forwardRef<
  HTMLDivElement,
  {
    isOpen: boolean;
    toggleSidebar: () => void;
    threadArray: threadDataType[] | undefined;
    setThreadArray: React.Dispatch<
      React.SetStateAction<threadDataType[] | undefined>
    >;
    openedThread: threadDataType | undefined;
    setOpenedThread: React.Dispatch<
      React.SetStateAction<threadDataType | undefined>
    >;
    handleNewThread: (file: File | null, serviceType?: string) => void;
  }
>((props, ref) => {
  const {
    isOpen,
    toggleSidebar,
    threadArray,
    setThreadArray,
    openedThread,
    setOpenedThread,
    handleNewThread,
  } = props;

  const { deleteThread, isLoading } = useDeleteThreadApi();

  const handleDeleteThread = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    threadId: string,
    service: string
  ) => {
    e.stopPropagation();
    const confirmation = confirm("Do you want to delete this thread?");
    if (!confirmation) return;
    deleteThread(e, threadId, service, toggleSidebar);
    setThreadArray((prev) =>
      prev ? prev.filter((thread) => thread._id !== threadId) : []
    );
    // toggleSidebar()
  };

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 w-64 h-full bg-bg-header-gray transform z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <button onClick={toggleSidebar} className="absolute top-4 right-4">
        <MdCancel size={25} />
      </button>
      <div className="p-4 mt-10">
        <button
          onClick={() => {
            handleNewThread(null, "propchat");
            setOpenedThread({
              _id: "",
              created_at: new Date().toISOString(),
              service: "propchat",
            });
            // setConversation([{ id: +"", question: "", answer: "", image_name: "" }]);
          }}
          className="bg-gray-800 text-white flex justify-between px-4 py-2 rounded w-full mb-2"
        >
          Nuova Chat
          <img src={newChatIcon} alt="New Chat Icon" className="h-6" />
        </button>

        <div className="py-2 h-[calc(100vh-150px)] grow overflow-y-auto">
          <ul>
            {threadArray &&
              threadArray.map((item, idx) => {
                return (
                  <li
                    className={`p-[6px] flex gap-3 items-center hover:bg-red-200 cursor-pointer relative truncate ${
                      openedThread?._id === item?._id ? "bg-red-200" : ""
                    }`}
                    key={idx}
                    onClick={() => {
                      console.log(item);
                      setOpenedThread(item);
                      toggleSidebar();
                    }}
                  >
                    <div className="max-w-4 w-[10%]">
                      {item.service === "propchat" && (
                        <img src={textIcon} alt="textIcon" className="h-4" />
                      )}
                      {item.service === "faq" && (
                        <img src={faqIcon} alt="faqIcon" className="h-4" />
                      )}
                      {item.service === "cwyf" && (
                        <img src={cwyfIcon} alt="cwyfIcon" className="h-4" />
                      )}
                      {item.service === "image_to_text" && (
                        <img
                          src={imgTxtIcon}
                          alt="imgTxtIcon"
                          className="h-4"
                        />
                      )}
                      {item.service === "text_to_image" && (
                        <PiFileImageDuotone className="text-slate-600" />
                      )}
                    </div>

                    <div className="grow w-[40%]">
                      {item.service === "propchat" &&
                        item.data &&
                        renderText(item?.data[0].question as string)}
                      {item.service === "faq" &&
                        item.data &&
                        renderText(
                          item?.data[0]?.file_name ??
                            (item.data[0].question as string)
                        )}
                      {item.service === "cwyf" &&
                        item.data &&
                        renderText(
                          item.data[0].file_name ??
                            (item.data[0].question as string)
                        )}
                      {item.service === "text_to_image" &&
                        item.data &&
                        renderText(
                          item.data[0].prop ?? (item.data[0].question as string)
                        )}
                      {item.service === "image_to_text" &&
                        item.data &&
                        renderText(
                          item.data[0].image_name ??
                            (item.data[0].question as string)
                        )}
                    </div>
                    <MdDelete
                      size={25}
                      onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) =>
                        handleDeleteThread(e, item._id, item.service)
                      }
                      // className="text-white bg-red-500 p-1 rounded-md absolute top-0 right-2 bottom-0 m-auto cursor-pointer"
                      className="text-red p-1 rounded-md absolute top-0 right-2 bottom-0 m-auto cursor-pointer"
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      {isLoading && <NewLoader />}
    </div>
  );
});

export default Sidebar;
