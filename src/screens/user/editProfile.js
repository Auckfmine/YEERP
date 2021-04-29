/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import Input from '../../components/userProfileComponnents/input';
import {Divider} from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../../../redux/user/userAction';
import api from '../../../api/apiCall';
import {onChange} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import DocumentPicker from 'react-native-document-picker';

const EditProfile = ({route, navigation}) => {
  const USER_ID = useSelector(state => state.user.user._id) || route.params.id;

  const userData = useSelector(state => state.user.user);
  const [image, setImage] = useState({uri: route.params.logo});
  const [video, setVideo] = useState({uri: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(userData);
  const sheetRef = React.createRef();
  const VideoRef = React.createRef();
  const MusicRef = React.createRef();
  const dispatch = useDispatch();

  const getLocalData = async () => {
    const data = await AsyncStorage.getItem('user');
    const user = await JSON.parse(data).user._id;
    //get the user Id either from localstorage if it is saved or  from redux after logging in
    setUserInfo({...userInfo, _id: !USER_ID ? user : USER_ID});
  };

  console.log('selectedImage', image);

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('file', {
      name: !photo.name ? photo.fileName : photo.name,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  useEffect(() => {
    getLocalData();
    dispatch(getUserProfile(userInfo._id));
  }, [userInfo._id]);

  //a function to handle opening the camera
  const takePhotoFromCamera = () => {
    launchCamera(
      {
        maxWidth: 300,
        maxHeight: 300,
        cameraType: 'back',
        quality: 0.7,
        saveToPhotos: true,
      },
      res => {
        //console.log(res);
        setImage(res);
      },
    );
  };
  //chose video from library
  const chooseVideoFromLibrary = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('image', res);
      setImage(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  //function to handle opening the phone's library
  const choosePhotoFromLibrary = () => {
    launchImageLibrary(
      {
        title: 'Select a picture',
        cancelButtonTitle: 'Cancel',

        takePhotoButtonTitle: 'Take picture',
        chooseFromLibraryButtonTitle: 'Phone',
        mediaType: 'photo',
      },
      res => {
        setImage(res);
        console.log(res.type);
        console.log('uploaded Image', res);
      },
    );
  };
  //this function allows us to update the profile
  const handleUploadPhoto = () => {
    setIsLoading(true);
    //check if the image changed or no
    if (image.fileName) {
      api
        .patch(`/userImage/${USER_ID}`, createFormData(image), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('response', response.data);
          dispatch(getUserProfile(USER_ID));
          setIsLoading(false); //dispatch getProfile Action to update the store with the new image
          Alert.alert(
            'Mes details',
            'la photo de profle a été modifié avec succés',
          );
        })
        .catch(error => {
          console.log('error', error.message);
        });
      setIsLoading(false);
    }
  };
  const handleUploadVideo = () => {
    setIsLoading(true);
    //check if the image changed or no
    if (image.fileName) {
      axios
        .patch(`/userImage/${USER_ID}`, createFormData(video), {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('response', response.data);
          //dispatch(getUserProfile(USER_ID)); //dispatch getProfile Action to update the store with the new image
          Alert.alert('Succes', 'contenue modifié avec succés');
        })
        .catch(error => {
          console.log('error', error.message);
        });
      setIsLoading(false);
    }
  };
  const handleUserInfoChange = () => {
    api
      .patch(`/user/${USER_ID}`, userInfo)
      .then(response => {
        dispatch(getUserProfile(USER_ID));
        Alert.alert('Mes details', 'Vos details ont été mises à jour');
      })
      .catch(err => {
        Alert.alert('Erreur', "une erreur s'est produite veuillez réessayer");
      });
  };
  // a function to show the  sliding modal
  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Photo de Profile</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>prendre une photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choisir depuis la galerie</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          sheetRef.current.snapTo(1);
        }}>
        <Text style={styles.panelButtonTitle}>Fermer</Text>
      </TouchableOpacity>
    </View>
  );
  const renderVideoContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Video</Text>
        <Text style={styles.panelSubtitle}>Choisir Un mini Video</Text>
      </View>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={chooseVideoFromLibrary}>
        <Text style={styles.panelButtonTitle}>selectionner un Video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          VideoRef.current.snapTo(1);
        }}>
        <Text style={styles.panelButtonTitle}>retour</Text>
      </TouchableOpacity>
    </View>
  );

  //the view of the page
  return (
    <ScrollView style={styles.container}>
      <BottomSheet
        initialSnap={1}
        ref={sheetRef}
        snapPoints={[Dimensions.get('window').height / 2, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
      <BottomSheet
        initialSnap={1}
        ref={VideoRef}
        snapPoints={[250, 0]}
        borderRadius={10}
        renderContent={renderVideoContent}
      />

      <StatusBar style={{backgroundColor: '#121212'}} />
      <View style={styles.upperBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.cancel}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.editProfile}>Profile</Text>
        <TouchableOpacity
          onPress={() => {
            handleUploadPhoto();
            handleUserInfoChange();
          }}>
          <Text style={styles.done}>Confirmer</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image style={styles.profileImage} source={{uri: image.uri}} />

        <TouchableOpacity
          style={styles.changeImage}
          onPress={() => sheetRef.current.snapTo(0)}>
          <Text style={{color: '#3897F0'}}>modifier ma photo de profil</Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 15, color: 'white', marginLeft: 15}}>
        Informations Generales :{' '}
      </Text>
      <Input
        placeholder="modifier votre Pseudo"
        title="Pseudo :"
        value={userInfo.userName}
        onChange={e => {
          setUserInfo({...userInfo, userName: e});
        }}
      />
      <Divider style={{backgroundColor: 'black'}} />
      <Input
        placeholder="modifier votre Nom"
        title="Nom :"
        value={userInfo.firstName}
        onChange={e => {
          setUserInfo({...userInfo, firstName: e});
        }}
      />
      <Divider style={{backgroundColor: 'black'}} />
      <Input
        placeholder="modifier votre Prenom"
        title="Prenom :"
        value={userInfo.lastName}
        onChange={e => {
          setUserInfo({...userInfo, lastName: e});
        }}
      />
      <Divider style={{backgroundColor: 'black'}} />
      <Input
        placeholder="modifier votre biographie"
        title="Bio :"
        value={userInfo.bio}
        onChange={e => {
          setUserInfo({...userInfo, bio: e});
        }}
      />
      <Divider style={{backgroundColor: 'black'}} />
      <Text
        style={{fontSize: 15, color: 'white', marginLeft: 15, marginTop: 10}}>
        Informations Privées :{' '}
      </Text>
      <Input
        placeholder="modifier votre E-mail"
        title="E-mail :"
        value={userInfo.email}
        onChange={e => {
          setUserInfo({...userInfo, email: e});
        }}
      />
      <Divider style={{backgroundColor: 'black'}} />
      <Input
        placeholder="Numéro de téléphone"
        title="Numéro de téléphone :"
        value={userInfo.phone}
      />

      <Divider style={{backgroundColor: 'black'}} />
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  upperBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 30,
  },
  cancel: {
    fontSize: 15,
    color: 'white',
  },
  done: {
    fontSize: 15,
    color: 'white',
  },
  editProfile: {
    fontSize: 20,
    color: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 100,
  },
  changeImage: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  //modal styles here
  panel: {
    padding: 20,
    backgroundColor: 'gray',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: 'white',
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#121212',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  videoChose: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});
