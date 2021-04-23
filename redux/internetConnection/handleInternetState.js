/* eslint-disable prettier/prettier */
import NetInfo from '@react-native-community/netinfo';

//internetCheck actions
import {internetConnected, internetDisconnected} from './internet';

export const checkConnection = () => dispatch => {
  NetInfo.fetch().then(networkState => {
    if (networkState.isConnected) {
      return dispatch(internetConnected());
    }
    return dispatch(internetDisconnected());
  });
};
