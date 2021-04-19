/* eslint-disable prettier/prettier */
import {
  getUserVideosFailed,
  getUserVideosPending,
  getUserVideosSuccess,
} from './videos';
import {fechVideos} from '../../../api/user/fetchUserVideos';
export const getUserVideos = id => async dispatch => {
  try {
    dispatch(getUserVideosPending());
    const videos = await fechVideos(id);
    //console.log('videos are :', videos);
    //console.log('photos', photos);
    if (videos.success !== true) {
      dispatch(getUserVideosFailed(videos.msg));
    } else {
      dispatch(getUserVideosSuccess(videos));
    }
  } catch (error) {
    dispatch(getUserVideosFailed(error.msg));
  }
};
