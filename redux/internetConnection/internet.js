/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isConnected: true,
};
const internetSlice = createSlice({
  initialState,
  name: 'checkInternet',
  reducers: {
    internetConnected: state => {
      state = state;
    },
    internetDisconnected: state => {
      state.isConnected = false;
    },
  },
});

const {actions, reducer} = internetSlice;
export const {internetConnected, internetDisconnected} = actions;
export default reducer;
