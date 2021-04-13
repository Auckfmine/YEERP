/* eslint-disable prettier/prettier */
import axios from 'axios';
import React from 'react';
import {View, Image, Button, Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const SERVER_URL = 'http://localhost:8000';

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
  const [photo, setPhoto] = React.useState(null);
  console.log(createFormData(photo));
  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
        console.log(photo);
      }
    });
  };

  const handleUploadPhoto = () => {
    axios
      .post(
        'http://localhost:8000/upload/605911e7452cd506f053c3db',
        createFormData(photo),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
          },
        },
      )
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error.message);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {photo && (
        <>
          <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

export default App;
