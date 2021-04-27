/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import api from '../../../../api/apiCall';
import {getUserPhotos} from '../../../../redux/user/imagesAction';
import {Alert} from 'react-native';
const Photos = () => {
  const [image, setImage] = useState({
    uri:
      'https://wearesocial-net.s3.amazonaws.com/wp-content/uploads/2017/08/video-facebook.jpg',
  });
  const [isLoading, setIsLoading] = useState(false);
  const USER_ID = useSelector(state => state.user.user._id);
  const dispatch = useDispatch();

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

  const handleTakePhoto = () => {
    launchCamera({mediaType: 'photo', saveToPhotos: true}, response => {
      if (response) {
        setImage(response);
        console.log(response);
      }
    });
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setImage(response);
        console.log(response);
        console.log(image);
      }
    });
  };

  const handleUploadPhoto = () => {
    setIsLoading(true);
    api
      .post(`/upload/${USER_ID}`, createFormData(image), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('response', response.data);
        dispatch(getUserPhotos(USER_ID));
        Alert.alert('Ajout de Photo', 'Photo Ajoutée avec Succés');
      })
      .catch(error => {
        console.log('error', error.message);
      });
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          style={{width: 200, height: 200, borderRadius: 20}}
          source={{
            uri: image.uri,
          }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <TextInput
          style={{width: '100%'}}
          placeholderTextColor="white"
          placeholder="Description (optionnelle) ..."
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.choisirPhoto}
          onPress={() => handleTakePhoto()}>
          <Text
            style={{color: 'white', textAlign: 'center', marginVertical: 5}}>
            Prendre une Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choisirPhoto}
          onPress={() => handleChoosePhoto()}>
          <Text
            style={{color: 'white', textAlign: 'center', marginVertical: 5}}>
            Choisir une Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirmer}
          onPress={() => handleUploadPhoto()}>
          <Text
            style={{color: 'white', textAlign: 'center', marginVertical: 5}}>
            confirmer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  photoContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  descriptionContainer: {
    width: '80%',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'black',
    shadowOpacity: 10,
    shadowColor: 'white',
    elevation: 3,
  },
  buttonsContainer: {
    width: '40%',

    alignSelf: 'center',
    marginVertical: '10%',
  },
  choisirPhoto: {
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmer: {
    borderWidth: 1,
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 5,
  },
});
