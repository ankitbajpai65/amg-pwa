import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
  isLoggedIn: boolean;
}
const initialState: ThemeState = {
  theme: "",
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    addTheme: (state, action) => {
      const themes = action.payload;
      state.theme = themes;
    },
    setIsLoggedIn: (state, action) => {
      const isLoggedIn = action.payload;
      state.isLoggedIn = isLoggedIn;
    },
  },
});

export const { addTheme, setIsLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
