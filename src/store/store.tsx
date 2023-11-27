import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../containers/login/loginSlice";
export const store = configureStore({
  reducer: {
    themeReducer,
  },
});
