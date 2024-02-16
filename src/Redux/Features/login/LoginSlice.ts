import { createSlice } from "@reduxjs/toolkit";
type TinitialState = {
  username: string;
  accessToken: string;
};
const initialState = {
  username: "",
  accessToken: "",
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userInfo: (state: TinitialState, action) => {
      const { username, accessToken } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.username = "";
      state.accessToken = "";
    },
  },
});

export const { userInfo, logout } = LoginSlice.actions;

export default LoginSlice.reducer;
