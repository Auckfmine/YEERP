import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  isLoading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      (state.isLoading = false), (state.user = payload), (state.error = null);
    },
    getUserFailed: (state, { payload }) => {
      (state.isLoading = false), (state.error = payload);
    },
  },
});

const { reducer, actions } = userSlice;
export const { getUserSuccess, getUserFailed, getUserPending } = actions;
export default reducer;
