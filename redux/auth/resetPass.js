/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  resetEmailLoading: false,
  emailSent: false,
  errors: '',
  userId: '',
};

const ResetPassSlice = createSlice({
  initialState,
  name: 'restPassRequest',
  reducers: {
    resetPending: state => {
      state.resetEmailLoading = true;
    },
    resetSucceeded: (state, {payload}) => {
      (state.resetEmailLoading = false),
        (state.emailSent = true),
        (state.errors = null),
        (state.userId = payload);
    },
    resetFailed: (state, {payload}) => {
      (state.resetEmailLoading = false),
        (state.emailSent = false),
        (state.errors = payload);
    },
  },
});

const {actions, reducer} = ResetPassSlice;

export const {resetSucceeded, resetPending, resetFailed} = actions;

export default reducer;
