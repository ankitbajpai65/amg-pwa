import { useState } from "react";

const url = "https://genaiservices-be.datapartners.ch";

const useUserDetailsApi = () => {
  const accessToken = localStorage.getItem("AccessToken");
  const [loading, setLoading] = useState<boolean>(false);

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/pwa/user_details/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken as string,
        },
      });

      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePrivacyDetails = async (reqBody: {
    faceId?: boolean;
    fullName?: boolean;
    personalizedEmail?: boolean;
    pushNotifications?: boolean;
    advertisingPlat?: boolean;
  }) => {
    // setLoading(true);
    console.log(reqBody);

    try {
      const response = await fetch(`${url}/pwa/privacy_details/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken as string,
        },
        body: JSON.stringify({
          Show_full_name_and_image: reqBody.fullName,
          Use_Face_ID_for_access: reqBody.faceId,
          Personalized_emails: reqBody.personalizedEmail,
          Custom_push_notifications: reqBody.pushNotifications,
          Advertising_platforms_and_social_media: reqBody.advertisingPlat,
        }),
      });

      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const changeEmail = async (oldEmail: string, newEmail: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/auth/pwa_change_email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken as string,
        },
        body: JSON.stringify({
          old_Email: oldEmail,
          new_Email: newEmail,
        }),
      });

      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getUserDetails,
    updatePrivacyDetails,
    changeEmail,
  };
};

export default useUserDetailsApi;
