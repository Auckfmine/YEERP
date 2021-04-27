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
import DocumentPicker from 'react-native-document-picker';
const Music = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cover, setCover] = useState({
    uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtyvqdBZkfk-EBfl3NcBVd5KAh7mE-oP-cxQ&usqp=CAU',
  });
  const USER_ID = useSelector(state => state.user.user._id);
  const dispatch = useDispatch();

  const createFormData = (photo, cover, body = {}) => {
    const data = new FormData();

    data.append('file', {
      name: photo.name,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    data.append('artwork', {
      name: cover.name,
      type: cover.type,
      uri: Platform.OS === 'ios' ? cover.uri.replace('file://', '') : cover.uri,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleChoosePhoto = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      setImage(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const handleChooseCover = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setCover(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleUploadPhoto = () => {
    setIsLoading(true);
    api
      .post(`/upload/music/${USER_ID}`, createFormData(image, cover), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('response', response.data);

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
        <View>
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              borderRadius: 20,
            }}
            source={{uri: cover.uri}}
          />
        </View>
        <Text style={{color: 'white', fontSize: 20}}>
          {!image ? '' : image.name}
        </Text>
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
          onPress={() => handleChooseCover()}>
          <Text
            style={{color: 'white', textAlign: 'center', marginVertical: 5}}>
            Choisir cover
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choisirPhoto}
          onPress={() => handleChoosePhoto()}>
          <Text
            style={{color: 'white', textAlign: 'center', marginVertical: 5}}>
            Choisir Fichier
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

export default Music;

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
