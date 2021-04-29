/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import api from '../../../../api/apiCall';
import {Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActivityIndicator} from 'react-native-paper';
const Music = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cover, setCover] = useState({
    uri: null,
  });
  const USER_ID = useSelector(state => state.user.user._id);

  const createFormData = (photo, cover, body = {}) => {
    const data = new FormData();

    if (photo) {
      data.append('file', {
        name: photo.name,
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
    }

    if (cover.uri) {
      data.append('artwork', {
        name: cover.name,
        type: cover.type,
        uri:
          Platform.OS === 'ios' ? cover.uri.replace('file://', '') : cover.uri,
      });
    }

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleChoosePhoto = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      //console.log(res);
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
      //console.log(res);
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

        setIsLoading(false);
        Alert.alert('Ajout de Musique', 'Piéce Musicale Ajoutée avec Succés');
        setCover({uri: null});
        setImage(null);
      })
      .catch(error => {
        console.log('error', error.message);
        setIsLoading(false);
        setCover({uri: null});
        setImage(null);
        Alert.alert(
          'Ajout de Musique',
          'veuillez selectioner le fichier mp3  avant de confirmer',
        );
      });
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.photoContainer}>
        <View>
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              borderRadius: 20,
            }}
            source={
              !cover.uri
                ? require('../../../assets/images/addImage.jpg')
                : {uri: cover.uri}
            }
          />
        </View>
        <Text style={{color: 'white', fontSize: 20}}>
          {!image ? '' : image.name}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <TextInput
          style={{width: '100%', color: 'white'}}
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
            Choisir cover (optionnel)
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
        <View>
          {isLoading ? (
            <View style={{marginTop: 10}}>
              <ActivityIndicator color="white" size="small" />
              <Text style={{color: 'white', alignSelf: 'center'}}>
                telechargement ...{' '}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </KeyboardAwareScrollView>
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
