import { useNotificationContext } from "@/lib/context/notificationContext";

const useUpdateNotificationContext = () => {
  const { notificationList, setNotificationList } = useNotificationContext();
  const updateNotificationContext = (props: {
    title: string;
    body: string;
  }) => {
    if (notificationList && notificationList?.length > 0) {
      const tempNotificationArray = [
        ...notificationList,
        { id: notificationList?.length, title: props.title, body: props.body },
      ];
      setNotificationList(tempNotificationArray);
    } else {
      setNotificationList([{ id: 1, title: props.title, body: props.body }]);
    }
  };
  return { updateNotificationContext };
};
export default useUpdateNotificationContext;
