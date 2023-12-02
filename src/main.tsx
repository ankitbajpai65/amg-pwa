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
import AppSetting from "./containers/appSetting/AppSetting.tsx";
import ThemeContextProvider from "./lib/context/themeContext.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="changePassword" element={<ChangePass />} />
      <Route path="forgotPassword" element={<ForgotPass />} />
      <Route path="" element={<Layout />}>
        <Route
          path="home/:userEmail"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="setting"
          element={
            <ProtectedRoutes>
              <AppSetting />
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
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>
);
