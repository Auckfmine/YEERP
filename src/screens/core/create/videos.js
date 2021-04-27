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
import {getUserVideos} from '../../../../redux/user/videos/videoActions';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
const Videos = () => {
  const [image, setImage] = useState();
  const [thumb, setThumb] = useState({
    uri: 'https://www.iab.com/wp-content/uploads/2017/11/Video_Marketing.jpg',
  });
  const [isLoading, setIsLoading] = useState(false);
  const USER_ID = useSelector(state => state.user.user._id);
  const dispatch = useDispatch();
  console.log(USER_ID);
  const videoUrlCopy = async (uri, fileName) => {
    const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
    await RNFS.copyFile(uri, destPath);
    await RNFS.stat(destPath);
    return destPath;
  };

  const createFormData = (photo, cover, body = {}) => {
    const data = new FormData();
    console.log('video', photo);
    data.append('file', {
      name: photo.name,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    data.append('thumbnail', {
      name: cover.name,
      type: cover.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleChooseVideo = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
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
  const handleChooseThumb = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setThumb(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const handleUploadVideo = () => {
    setIsLoading(true);
    api
      .post(`/upload/video/${USER_ID}`, createFormData(image, thumb), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('response', response.data);
        dispatch(getUserVideos(USER_ID));
        Alert.alert('Ajout de Video', 'Video Ajoutée avec Succés');
        setImage({uri: ''});
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
              height: 200,
              width: 200,
              alignSelf: 'center',
              borderRadius: 20,
            }}
            source={{uri: thumb.uri}}
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
          onPress={() => handleChooseThumb()}>
          <Text
            style={{color: 'white', textAlign: 'center', marginVertical: 5}}>
            Choisir une photo thumb
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choisirPhoto}
          onPress={() => handleChooseVideo()}>
          <Text
            style={{color: 'white', textAlign: 'center', marginVertical: 5}}>
            Choisir une Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!image ? true : false}
          style={styles.confirmer}
          onPress={() => handleUploadVideo()}>
          <Text
            style={{color: 'white', textAlign: 'center', marginVertical: 5}}>
            confirmer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Videos;

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
