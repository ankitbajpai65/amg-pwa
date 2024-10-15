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

      if (res.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", reqBody.email);
        localStorage.setItem("AccessToken", res.token);
      }
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/auth/pwa_logout_user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  const forgetPassword = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/auth/pwa_forget_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
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
    logout,
    forgetPassword,
  };
};

export default useAuthApi;
