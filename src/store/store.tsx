import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../containers/login/loginSlice";
export const store = configureStore({
  reducer: {
    loginReducer,
  },
});
