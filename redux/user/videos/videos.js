/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isLoading: false,
  videos: [],
  error: '',
};
const VideoSlice = createSlice({
  name: 'Videos',
  initialState,
  reducers: {
    getUserVideosPending: state => {
      state.isLoading = true;
    },
    getUserVideosSuccess: (state, {payload}) => {
      (state.isLoading = false), (state.videos = payload.videos);
      state.error = '';
    },
    getUserVideosFailed: (state, {payload}) => {
      (state.isLoading = false), (state.error = {payload});
    },
  },
});

const {actions, reducer} = VideoSlice;

export const {
  getUserVideosFailed,
  getUserVideosPending,
  getUserVideosSuccess,
} = actions;

export default reducer;
