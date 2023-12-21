import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router";
import Layout from "./layout/Layout.tsx";
import Home from "./containers/home/Home.tsx";
import { ProtectedRoutes } from "./lib/ProtectedRoutes.tsx";
import ChangePass from "./containers/login/ChangePass/ChangePass.tsx";
import ForgotPass from "./containers/login/ForgotPass/ForgotPass.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContextProvider from "./lib/context/themeContext.tsx";
import PrivacyPolicy from "./containers/privacyPolicy/PrivacyPolicy.tsx";
import UserDetailsProvider from "./lib/context/userDetailsContext.tsx";
import UserProfile from "./containers/userProfile/UserProfile.tsx";
import PrivacyPolicy2 from "./containers/privacyPolicy/PrivacyPolicy2.tsx";
import QrCodeScan from "./containers/qrCodeScan/QrCodeScan.tsx";
import ScanNow from "./containers/qrCodeScan/ScanNow.tsx";
import UploadScan from "./containers/qrCodeScan/UploadScan.tsx";
import PwaMap from "./containers/map/PwaMap.tsx";
import PrivacyDisplayOnly from "./containers/privacyPolicy/PrivacyDisplayOnly.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="changePassword" element={<ChangePass />} />
      <Route path="forgotPassword" element={<ForgotPass />} />
      <Route path="pwa/" element={<Layout />}>
        <Route
          path="home/:userEmail"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="privacy/"
          element={
            <ProtectedRoutes>
              <PrivacyPolicy />
            </ProtectedRoutes>
          }
        />
        <Route
          path="privacy2/"
          element={
            <ProtectedRoutes>
              <PrivacyPolicy2 />
            </ProtectedRoutes>
          }
        />
        <Route
          path="privacyDisplay/"
          element={
            <ProtectedRoutes>
              <PrivacyDisplayOnly />
            </ProtectedRoutes>
          }
        />

        <Route
          path="profile/"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="qrScan/"
          element={
            <ProtectedRoutes>
              <QrCodeScan />
            </ProtectedRoutes>
          }
        />
        <Route
          path="qrScan/scanNow"
          element={
            <ProtectedRoutes>
              <ScanNow />
            </ProtectedRoutes>
          }
        />
        <Route
          path="qrScan/uploadScan"
          element={
            <ProtectedRoutes>
              <UploadScan />
            </ProtectedRoutes>
          }
        />
        <Route
          path="pwaMap/"
          element={
            <ProtectedRoutes>
              <PwaMap />
            </ProtectedRoutes>
          }
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <ThemeContextProvider>
      <UserDetailsProvider>
        <RouterProvider router={router} />
      </UserDetailsProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
