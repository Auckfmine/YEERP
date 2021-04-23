/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  photos: [],
  error: '',
};
const UserMusicSlice = createSlice({
  initialState,
  name: 'Photos',
  reducers: {
    getUserImagesPending: state => {
      state.loading = true;
    },
    getUserImagesSuccess: (state, {payload}) => {
      (state.loading = false), (state.photos = payload);
    },
    getUserImagesFailed: (state, {payload}) => {
      (state.loading = false), (state.error = payload);
    },
  },
});

const {actions, reducer} = UserMusicSlice;

export const {
  getUserImagesFailed,
  getUserImagesPending,
  getUserImagesSuccess,
} = actions;

export default reducer;
