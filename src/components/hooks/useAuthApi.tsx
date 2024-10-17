import { useState } from "react";

const url = "https://genaiservices-be.datapartners.ch";

const useAuthApi = () => {
  const accessToken = localStorage.getItem("AccessToken");
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
        localStorage.setItem("userName", res.user_name);
        localStorage.setItem("userMobile", res.phone_number);
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

  const forgetPassword = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/auth/pwa_forget_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken as string,
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

  const verifyOtp = async (reqBody: {
    email: string;
    otp: string;
    newPassword: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/auth/pwa_forget_verify_otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: reqBody.email,
          passcode: reqBody.otp,
          new_password: reqBody.newPassword,
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
    verifyOtp,
  };
};

export default useAuthApi;
