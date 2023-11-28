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
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import Home from "./containers/home/Home.tsx";
import { ProtectedRoutes } from "./lib/ProtectedRoutes.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="" element={<Layout />}>
        <Route
          path="home"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
