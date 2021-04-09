import {getUserFailed, getUserPending, getUserSuccess} from './user';
import {fetchUser} from '../../api/user/fetchUser';
export const getUserProfile = id => async dispatch => {
  try {
    dispatch(getUserPending());
    const user = await fetchUser(id);
    if (user.success !== true) {
      dispatch(getUserFailed(user.msg));
    } else {
      dispatch(getUserSuccess(user.user));
    }
  } catch (error) {
    dispatch(getUserFailed(error.msg));
  }
};
