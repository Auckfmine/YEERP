/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isChecking: false,
  error: '',
};
const ScretKeySlice = createSlice({
  initialState,
  name: 'checkSecretKey',
  reducers: {
    checkKeyPending: state => {
      state.isChecking = true;
    },
    checkKeySuccess: state => {
      (state.isChecking = false), (state.error = '');
    },
    checkKeyFailed: (state, {payload}) => {
      (state.isChecking = false), (state.error = payload);
    },
  },
});

const {actions, reducer} = ScretKeySlice;
export const {checkKeyFailed, checkKeyPending, checkKeySuccess} = actions;
export default reducer;
