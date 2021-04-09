import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  accountCreated: false,
  error: null,
};
const registerSlice = createSlice({
  initialState: initialState,
  name: 'registration',
  reducers: {
    registerPending: state => {
      state.isLoading = true;
    },
    registerSuccess: state => {
      (state.isLoading = false),
        (state.accountCreated = true),
        (state.error = null);
    },
    registerFailed: (state, {payload}) => {
      (state.isLoading = false),
        (state.accountCreated = false),
        (state.error = payload);
    },
    clearData: state => {
      (state.isLoading = false),
        (state.accountCreated = false),
        (state.error = null);
    },
  },
});

const {actions, reducer} = registerSlice;
export const {
  registerSuccess,
  registerPending,
  registerFailed,
  clearData,
} = actions;
export default reducer;
