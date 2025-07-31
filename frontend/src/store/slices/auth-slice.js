import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  user: {
    userId: null,
    role: null,
    profilePic: null,
    name: null,
  },
  loading: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.loading = false;
      state.user.name = action.payload.name;
      state.user.profilePic = action.payload.profilePic;
      state.user.role = action.payload.role;
      state.user.userId = action.payload.userId;
    },
    removeUser(state, action) {
      state.isLoggedIn = false;
      state.user = {
        userId: null,
        role: null,
        profilePic: null,
        name: null,
      };
    },
  },
});
export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
