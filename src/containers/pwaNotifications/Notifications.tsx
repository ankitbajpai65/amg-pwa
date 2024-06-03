import { useNotificationContext } from "@/lib/context/notificationContext";

const Notifications = () => {
  const { notificationList } = useNotificationContext();
  return (
    <div className="h-full px-2">
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Notification</p>
        {/* <p>Change your settings and information.</p> */}
      </div>
      <div className="px-5 py-1">
        {notificationList &&
          notificationList?.length > 0 &&
          notificationList?.map((item) => {
            return (
              <div className="flex flex-col items-start justify-between px-8 py-3 border-b border-border-light-gray cursor-pointer">
                <div className="flex items-center text-xs">{item.title}</div>
                <div>{item.body}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Notifications;
