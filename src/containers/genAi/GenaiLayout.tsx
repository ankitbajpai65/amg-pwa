import { useEffect, useRef, useState } from "react";
import Header from "@/components/appComponents/Header";
import Footer from "@/components/appComponents/Footer";
import { useThemeContext } from "@/lib/context/themeContext";
import { useUserDetails } from "@/lib/context/userDetailsContext";
import useAmgStartApi from "@/components/hooks/AmgMS/useAmgStartApi";
import Sidebar from "@/containers/genAi/Sidebar";
import useUserHistory from "@/components/hooks/genaiservices/useUserHistory";
import { threadDataType } from "./type";
import GptPrompt from "./GptPrompt";
import ImgToText from "./ImgToText";
import TextToImg from "./TextToImg";
import Cwyf from "./Cwyf";
import Faq from "./Faq";
import NewLoader from "@/components/appComponents/NewLoader";

function GenaiLayout() {
  const root = document.querySelector(":root");
  const { theme, setTheme } = useThemeContext();

  const sidebarRef = useRef(null);

  const { userDetails } = useUserDetails();
  const { getUserDetails } = useAmgStartApi();
  const { fetchUserThreadRes, fetchUsersThread, isLoading } = useUserHistory();

  const userEmail = localStorage.getItem("email");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const [threadArray, setThreadArray] = useState<
    threadDataType[] | undefined
  >();
  const [openedThread, setOpenedThread] = useState<threadDataType>();

  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    if (accessToken) fetchUsersThread();
  }, [accessToken]);

  useEffect(() => {
    setThreadArray(fetchUserThreadRes?.user_history);
  }, [fetchUserThreadRes]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const getLocalStorageTheme = localStorage.getItem("theme");
    if (getLocalStorageTheme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
    setTheme(getLocalStorageTheme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (theme === "dark") root?.classList.add("dark");
    else root?.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    if (!userDetails) {
      getUserDetails({
        emailId: userEmail as string,
        customerId: "AMGDEMO",
      });
    }
  }, [userDetails]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleNewThread = (file?: File | null, serviceType?: string) => {
    console.log(file);

    if (
      threadArray &&
      threadArray[0].data &&
      threadArray[0]?.data[0].question === "New Thread"
    ) {
      if (serviceType) threadArray[0].service = serviceType;
      setOpenedThread(threadArray[0]);
      return;
    }

    const newThread = (service: string) => ({
      _id: "",
      service: service,
      created_at: new Date().toISOString(),
      data: [
        {
          id: 0,
          question: "New Thread",
          answer: "",
          created_at: new Date().toISOString(),
        },
      ],
    });

    if (serviceType === "text_to_image") {
      setThreadArray((prev = []) => [newThread("text_to_image"), ...prev]);
    } else if (serviceType === "cwyf") {
      setThreadArray((prev = []) => [newThread("cwyf"), ...prev]);
    } else if (serviceType === "image_to_text") {
      setThreadArray((prev = []) => [newThread("image_to_text"), ...prev]);
    } else {
      setThreadArray((prev = []) => [newThread("propchat"), ...prev]);
    }
  };

  const updateThreadArray = (
    threadId: string,
    chatQues: string,
    chatAns: string,
    serviceType: string,
    fileUrl?: string
  ) => {
    // console.log("updateThreadArray runs");
    console.log({ threadId, chatQues, chatAns, serviceType, fileUrl });

    if (!threadArray) {
      console.error("threadArray is undefined or null");
      return;
    }

    const existingThread = threadArray.find((item) => item._id === threadId);

    if (existingThread) {
      const updatedThreadArray = threadArray.map((item) => {
        if (item._id === threadId) {
          if (serviceType === "propchat") {
            return {
              ...item,
              data: [
                ...(item.data ?? []),
                {
                  question: chatQues,
                  answer: chatAns,
                  created_at: new Date().toISOString(),
                },
              ],
            };
          } else if (serviceType === "faq") {
            return {
              ...item,
              created_at: new Date().toISOString(),
              data: [
                {
                  question: chatQues,
                  answer: chatAns,
                  file_path: fileUrl,
                },
              ],
            };
          } else if (serviceType === "text_to_image") {
            return {
              ...item,
              data: [
                ...(item.data ?? []),
                {
                  question: chatQues,
                  answer: chatAns,
                  image_url: fileUrl,
                  created_at: new Date().toISOString(),
                },
              ],
            };
          } else if (serviceType === "cwyf") {
            return {
              ...item,
              data: [
                {
                  question: chatQues,
                  response: chatAns,
                  prop: null,
                  answer: null,
                  image_url: null,
                  image_name: null,
                  file_name: null,
                  image_path: null,
                  embeddings_path: null,
                  created_at: new Date().toISOString(),
                  qa:
                    item.data && item.data[0].qa
                      ? [
                          ...item.data[0].qa,
                          {
                            question: chatQues,
                            answer: chatAns,
                            created_at: new Date().toISOString(),
                          },
                        ]
                      : [
                          {
                            question: chatQues,
                            answer: chatAns,
                            created_at: new Date().toISOString(),
                          },
                        ],
                  json_file: null,
                },
              ],
            };
          }
          return item;
        }
        return item;
      });

      setThreadArray(updatedThreadArray);
    } else {
      const newThread = {
        _id: threadId,
        created_at: new Date().toISOString(),
        service: serviceType,
        data: [{ question: chatQues, answer: chatAns, image_path: "" }],
      };

      const tempThreadArray = threadArray.map((item) => {
        if (item.data && item.data[0]?.question === "New Thread") {
          return newThread;
        }
        return item;
      });

      if (serviceType === "image_to_text") {
        newThread.data[0].image_path = fileUrl as string;
      }

      let updatedArray;

      if (
        threadArray[0].data &&
        threadArray[0]?.data[0]?.question === "New Thread"
      ) {
        updatedArray = [...tempThreadArray];
      } else {
        updatedArray = [newThread, ...tempThreadArray];
      }

      if (serviceType === "propchat") setThreadArray(updatedArray);
      else setThreadArray(tempThreadArray);

      setOpenedThread(
        serviceType === "propchat" ? updatedArray[0] : tempThreadArray[0]
      );
    }
  };

  console.log("openedThread", openedThread);

  return (
    <div className="w-full h-full border-box flex flex-col justify-between">
      <Header toggleSidebar={toggleSidebar} />

      <Sidebar
        ref={sidebarRef}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        threadArray={threadArray}
        setThreadArray={setThreadArray}
        openedThread={openedThread}
        setOpenedThread={setOpenedThread}
        handleNewThread={handleNewThread}
      />
      <div className="grow overflow-auto">
        {(!openedThread || openedThread.service === "propchat") && (
          <GptPrompt
            openedThread={openedThread}
            setOpenedThread={setOpenedThread}
            handleNewThread={handleNewThread}
            threadArray={threadArray}
            setThreadArray={setThreadArray}
            updateThreadArray={updateThreadArray}
            isUploadModalOpen={isUploadModalOpen}
            setIsUploadModalOpen={setIsUploadModalOpen}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        )}
        {openedThread && openedThread.service === "image_to_text" && (
          <ImgToText
            openedThread={openedThread}
            setOpenedThread={setOpenedThread}
            handleNewThread={handleNewThread}
            threadArray={threadArray}
            updateThreadArray={updateThreadArray}
            isUploadModalOpen={isUploadModalOpen}
            setIsUploadModalOpen={setIsUploadModalOpen}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
          />
        )}
        {openedThread && openedThread.service === "text_to_image" && (
          <TextToImg
            openedThread={openedThread}
            setOpenedThread={setOpenedThread}
            handleNewThread={handleNewThread}
            setIsUploadModalOpen={setIsUploadModalOpen}
            threadArray={threadArray}
            updateThreadArray={updateThreadArray}
          />
        )}
        {openedThread && openedThread.service === "cwyf" && (
          <Cwyf
            openedThread={openedThread}
            setOpenedThread={setOpenedThread}
            handleNewThread={handleNewThread}
            isUploadModalOpen={isUploadModalOpen}
            setIsUploadModalOpen={setIsUploadModalOpen}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            threadArray={threadArray}
            updateThreadArray={updateThreadArray}
          />
        )}
        {openedThread && openedThread.service === "faq" && (
          <Faq
            openedThread={openedThread}
            setOpenedThread={setOpenedThread}
            handleNewThread={handleNewThread}
            isUploadModalOpen={isUploadModalOpen}
            setIsUploadModalOpen={setIsUploadModalOpen}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            threadArray={threadArray}
            updateThreadArray={updateThreadArray}
          />
        )}
      </div>
      <Footer />

      {isLoading && <NewLoader />}
    </div>
  );
}
export default GenaiLayout;
