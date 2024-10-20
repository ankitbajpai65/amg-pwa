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
// import PrivacyPolicy2 from "./containers/privacyPolicy/PrivacyPolicy2.tsx";
import QrCodeScan from "./containers/qrCodeScan/QrCodeScan.tsx";
import ScanNow from "./containers/qrCodeScan/ScanNow.tsx";
import UploadScan from "./containers/qrCodeScan/UploadScan.tsx";
import PwaMap from "./containers/map/PwaMap.tsx";
// import PrivacyDisplayOnly from "./containers/privacyPolicy/PrivacyDisplayOnly.tsx";
import AiBot from "./containers/aibot/AiBot.tsx";
// import ChatWithYourFiles from "./containers/genAi/chatwithyourfiles/ChatWithYourFiles.tsx";
// import Gpt_prompt from "./containers/genAi/gpt-prompt/Gpt_prompt.tsx";
import Notifications from "./containers/pwaNotifications/Notifications.tsx";
import { registerSW } from "virtual:pwa-register";
import Mfa from "./containers/login/mfa/Mfa.tsx";
import PrivacyLayout from "./layout/PrivacyLayout.tsx";
import PwaSettings from "./containers/pwaSettings/PwaSettings.tsx";
import PwaCalendar from "./containers/calendar/PwaCalendar.tsx";
import PrivacyAndSecurity from "./containers/privacyPolicy/PrivacyAndSecurity.tsx";
import HelpSupport from "./containers/help&support/HelpSupport.tsx";
import HelpFAQ from "./containers/help&support/HelpFAQ.tsx";
import FaqDisplay from "./containers/help&support/FaqDisplay.tsx";
import NotificationSetting from "./containers/pwaNotifications/NotificationSetting.tsx";
// import CwyfChat from "./containers/genAi/chatwithyourfiles/CwyfChat.tsx";
import IframePg from "./containers/iframePg/IframePg.tsx";
import PatientListProvider from "./lib/context/patientListContext.tsx";
import PatientsPrivacy from "./containers/patientsMeetings/patientsPrivacy.tsx";
import PatientMeetingList from "./containers/patientsMeetings/ListPatientMeeting.tsx";
import MeetingListProvider from "./lib/context/meetingsListContext.tsx";
import MeetingDetails from "./containers/patientsMeetings/MeetingDetails.tsx";
import PatientLayout from "./layout/PatientLayout.tsx";
import NewMeeting from "./containers/patientsMeetings/NewMeeting.tsx";
import OperatorListProvider from "./lib/context/operatorListContext.tsx";
import HomePatientsMeetings from "./containers/patientsMeetings/HomePatientsMeetings.tsx";
import GenaiLayout from "./containers/genAi/GenaiLayout.tsx";
import GptPrompt from "./containers/genAi/GptPrompt.tsx";
// import ImgToText from "./containers/genAi/ImgToText.tsx";

import NotificationProvider from "./lib/context/notificationContext.tsx";
import NotificationFlagProvider from "./lib/context/notificationFlagContext.tsx";
import Signup from "./containers/login/Signup.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";

registerSW({ immediate: true });

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="signup" element={<Signup />} />
      <Route path="changePassword" element={<ChangePass />} />
      <Route path="forgotPassword" element={<ForgotPass />} />
      <Route
        path="mfa/"
        element={
          <ProtectedRoutes>
            <Mfa />
          </ProtectedRoutes>
        }
      />
      <Route
        path="policy/"
        element={
          <ProtectedRoutes>
            <PrivacyLayout />
          </ProtectedRoutes>
        }
      >
        {/* <Route
          path="privacy/"
          element={
            <ProtectedRoutes>
              <PrivacyPolicy />
            </ProtectedRoutes>
          }
        /> */}
        {/* <Route
          path="privacy2/"
          element={
            <ProtectedRoutes>
              <PrivacyPolicy2 />
            </ProtectedRoutes>
          }
        /> */}
      </Route>
      <Route
        path="pwa/"
        element={
          <ProtectedRoutes>
            <Layout />
           </ProtectedRoutes>
        }
      >
        <Route
          path="home/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route path="privacy&security/" element={<PrivacyAndSecurity />} />
        <Route
          path="privacy&security/privacy"
          element={
            <ProtectedRoutes>
              <PrivacyPolicy />
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
        <Route path="aibot/" element={<AiBot />} />

        <Route path="settings/" element={<PwaSettings />} />
        <Route path="calendar/" element={<PwaCalendar />} />
        <Route path="help&support/" element={<HelpSupport />} />
        <Route path="notificationSetting/" element={<NotificationSetting />} />
        <Route path="notifications/" element={<Notifications />} />

        <Route path="helpFaq/" element={<HelpFAQ />} />
        <Route path="faqDisplay/" element={<FaqDisplay />} />
        <Route path="iframePg/" element={<IframePg />} />

        <Route path="Booking/" element={<PatientLayout />}>
          <Route path="patientMeetings/" element={<HomePatientsMeetings />} />
          <Route path="patientPrivacy/" element={<PatientsPrivacy />} />
          <Route path="patientMeetingList/" element={<PatientMeetingList />} />
          <Route path="meetingDetails/" element={<MeetingDetails />} />
          <Route path="newMeeting/" element={<NewMeeting />} />
        </Route>
      </Route>

      <Route
        path="pwa/genaiservices"
        element={
          <ProtectedRoutes>
            <GenaiLayout />
          </ProtectedRoutes>
        }
      >
        {/* <Route path="chat-with-your-files/" element={<ChatWithYourFiles />} /> */}
        {/* <Route path="chat-with-your-files/cwyfchat/" element={<CwyfChat />} /> */}
        {/* <Route path="gpt-prompt/" element={<Gpt_prompt />} /> */}
        <Route path="gpt-prompt/" element={<GptPrompt />} />
        {/* <Route path="image_text/" element={<ImgToText />} /> */}
        {/* <Route path="image_text/" element={<ImgToText/>} />
        <Route path="image_text/" element={<ImgToText/>} /> */}
      </Route>
    </Route>
    // </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ToastContainer />
      <ThemeContextProvider>
        <UserDetailsProvider>
          <NotificationFlagProvider>
            <NotificationProvider>
              <PatientListProvider>
                <MeetingListProvider>
                  <OperatorListProvider>
                    <RouterProvider router={router} />
                  </OperatorListProvider>
                </MeetingListProvider>
              </PatientListProvider>
            </NotificationProvider>
          </NotificationFlagProvider>
        </UserDetailsProvider>
      </ThemeContextProvider>
    </I18nextProvider>
  </React.StrictMode>
);
