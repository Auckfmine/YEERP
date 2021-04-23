/* eslint-disable prettier/prettier */
import {
  getUserImagesFailed,
  getUserImagesPending,
  getUserImagesSuccess,
} from './images';
import {fetchPhotos} from '../../api/user/fetchUserPhotos';
export const getUserPhotos = id => async dispatch => {
  try {
    dispatch(getUserImagesPending());
    const photos = await fetchPhotos(id);
    //console.log('photos', photos);
    if (photos.success !== true) {
      dispatch(getUserImagesFailed(photos.msg));
    } else {
      dispatch(getUserImagesSuccess(photos.photos));
    }
  } catch (error) {
    dispatch(getUserImagesFailed(error.msg));
  }
};
