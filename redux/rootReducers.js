/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import loginReducer from './auth/login';
import UserReducer from './user/user';
import registerReducer from './auth/register';
import passwordResetReducer from './auth/resetPass';
import checkInternetReducer from '../redux/internetConnection/internet';
import checkVerificationCodeReducer from '../redux/auth/verificationCode';
import userPhotosReducer from '../redux/user/images';
export default combineReducers({
  login: loginReducer,
  registration: registerReducer,
  user: UserReducer,
  userPhotos: userPhotosReducer,
  passwordResetRequest: passwordResetReducer,
  checkInternet: checkInternetReducer,
  verificationCode: checkVerificationCodeReducer,
});
