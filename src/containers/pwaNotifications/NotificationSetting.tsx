import BodyBackBtn from "@/components/appComponents/BodyBackBtn";
import { Switch } from "@/components/ui/switch";

const NotificationSetting = () => {
  return (
    <div>
      <BodyBackBtn btnText="Notifications" />
      <div className="py-4 px-5 text-text-blue">
        <p className="text-lg font-semibold">Notifications</p>
        <p>Choose what to be updated on.</p>
      </div>
      <div className="px-5 py-1">
        <div className="flex justify-between">
          <label htmlFor="faceId">Use Face ID for access</label>
          <Switch id="faceId" name="faceId" />
        </div>
        {/* Notifications about new services */}
        <div className="mb-2 py-3 flex flex-col">
          <div className="text-text-light-gray py-2">
            <div className="flex items-center">
              <p>Notifications about new services</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="email">Email</label>
            <Switch id="email" name="email" />
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="push">Push</label>
            <Switch id="push" name="push" />
          </div>
        </div>
        {/* Notifications about chat */}

        <div className="mb-2 py-3 flex flex-col">
          <div className="text-text-light-gray py-2">
            <div className="flex items-center">
              <p>Notifications about chat Copy</p>
            </div>
            <hr className="my-2 h-[0.5px] mx-0 px-0 border-t-0 bg-border-light-gray opacity-100 dark:opacity-50" />
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="email">Email</label>
            <Switch id="email" name="email" />
          </div>
          <div className="flex justify-between py-1">
            <label htmlFor="push">Push</label>
            <Switch id="push" name="push" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationSetting;
