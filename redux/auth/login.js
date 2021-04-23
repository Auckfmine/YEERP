/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoading: false,
  isAuth: false,
  error: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    loginPending: state => {
      state.isLoading = true;
    },
    loginSuccess: state => {
      (state.isLoading = false), (state.isAuth = true), (state.error = '');
    },
    loginFail: (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const {actions, reducer} = loginSlice;
export const {loginFail, loginPending, loginSuccess} = actions;
export default reducer;
