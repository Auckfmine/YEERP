/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './redux/rootReducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
