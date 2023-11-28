import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}
const initialState: ThemeState = {
  theme: "",
};

export const loginSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    addTheme: (state, action) => {
      const themes = action.payload;
      state.theme = themes;
    },
  },
});

export const { addTheme } = loginSlice.actions;

export default loginSlice.reducer;
