/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import axios from 'axios';
import {View, Image, Button, Platform} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUserPhotos} from '../../../redux/user/imagesAction';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CreatePostsTab from '../../../navigation/createPostsTab';
const SERVER_URL = 'http://localhost:8000';
const Tab = createMaterialTopTabNavigator();

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = React.useState(null);
  const USER_ID = useSelector(state => state.user.user._id);
  const dispatch = useDispatch();

  //this function allows us to chose a photo from the library
  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
        console.log(photo);
      }
    });
  };

  // this function allow us to take a picture and upload it directly

  /* const handleTakePhoto = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, response => {
      if (response) {
        console.log(response);
      }
    });
  };*/

  //this function allows us to upload the current image found in the state (from library or from take photo)

  return <CreatePostsTab />;
};

export default App;
