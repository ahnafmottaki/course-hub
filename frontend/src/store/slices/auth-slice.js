import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    isLoggedIn: false,
    userId: null,
  },
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user.isLoggedIn = true;
      state.user.userId = action.payload.userId;
    },
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
