import { useState } from "react";

const url = "https://genaiservices-be.datapartners.ch";

const useAuthApi = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const signup = async (reqBody: {
    name: string;
    email: string;
    mobile: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/auth/pwa_sign_up/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: accessToken as string,
        },
        body: JSON.stringify({
          name: reqBody.name,
          email: reqBody.email,
          phone_number: reqBody.mobile,
          password: reqBody.password,
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

  const login = async (reqBody: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/auth/pwa_sign_in/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: reqBody.email,
          password: reqBody.password,
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
    signup,
    login,
  };
};

export default useAuthApi;
