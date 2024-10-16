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

  const updatePrivacyDetails = async () => {
    const reqBody = {
      Show_full_name_and_image: true,
      Use_Face_ID_for_access: true,
      Personalized_emails: true,
      Custom_push_notifications: true,
      Advertising_platforms_and_social_media: true,
    };
    
    setLoading(true);
    try {
      const response = await fetch(`${url}/pwa/user_details/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken as string,
        },
        body: JSON.stringify(reqBody),
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
  };
};

export default useUserDetailsApi;
