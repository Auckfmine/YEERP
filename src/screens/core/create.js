/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import axios from 'axios';
import {View, Image, Button, Platform} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const SERVER_URL = 'http://localhost:8000';
const USER_ID = '605911e7452cd506f053c3db';

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
  const handleUploadPhoto = () => {
    setIsLoading(true);
    axios
      .post(
        `http://yeerp-back-end.herokuapp.com/upload/${USER_ID}`,
        createFormData(photo),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(response => {
        console.log('response', response.data);
      })
      .catch(error => {
        console.log('error', error.message);
      });
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {photo && (
        <>
          <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
          <Button
            title={isLoading ? 'uploading ...' : 'Upload Photo'}
            onPress={handleUploadPhoto}
          />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

export default App;
