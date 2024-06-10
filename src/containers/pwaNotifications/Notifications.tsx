import useDeleteNotificationsApi from "@/components/hooks/notificationAPI/notificationList/deleteNotification";
import { useNotificationContext } from "@/lib/context/notificationContext";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const Notifications = () => {
  const [deletedNotificationId, setDeletedNotificationId] = useState("");

  const { notificationList, setNotificationList } = useNotificationContext();

  const { deleteNotification, deleteNotificationRes } =
    useDeleteNotificationsApi();

  useEffect(() => {
    if (
      deleteNotificationRes?.response === "notification deleted successfully"
    ) {
      console.log(
        notificationList?.find((item) => item.id === deletedNotificationId)
      );
      const tempNotificationList = notificationList?.filter(
        (item) => item.id !== deletedNotificationId
      );
      tempNotificationList && setNotificationList(tempNotificationList);
    }
  }, [deleteNotificationRes]);

  const handleNotificationDelete = (id: string) => {
    setDeletedNotificationId(id);
    deleteNotification({
      notificationId: id,
    });
  };

  return (
    <div className="h-full px-2">
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Notification</p>
        {/* <p>Change your settings and information.</p> */}
      </div>
      <div className="px-5 py-1">
        {notificationList &&
          notificationList?.length > 0 &&
          notificationList?.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 border-b border-border-light-gray cursor-pointer"
              >
                <div className="flex flex-col items-start justify-between px-8 py-3">
                  <div className="flex items-center text-xs">{item.title}</div>
                  <div>{item.body}</div>
                </div>
                <button
                  className="bg-red-500 text-white p-1 rounded-md"
                  onClick={() => handleNotificationDelete(item.id)}
                >
                  <MdDeleteForever size={25} />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Notifications;
