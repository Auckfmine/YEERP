/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import Input from '../../components/userProfileComponnents/input';
import {Divider} from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../../../redux/user/userAction';

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

const EditProfile = ({route, navigation}) => {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sheetRef = React.createRef();
  const ProfileImage = useSelector(state => state.user.user.photo);
  const dispatch = useDispatch();
  const USER_ID = useSelector(state => state.user.user._id);

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
        console.log(res);
      },
    );
  };

  const handleUploadPhoto = () => {
    setIsLoading(true);
    axios
      .patch(
        `http://10.0.2.2:8000/userImage/${USER_ID}`,
        createFormData(image),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(response => {
        console.log('response', response.data);
        dispatch(getUserProfile(USER_ID)); //dispatch getProfile Action to update the store with the new image
      })
      .catch(error => {
        console.log('error', error.message);
      });
    setIsLoading(false);
  };
  //function to handle opening the phone's library
  const choosePhotoFromLibrary = () => {
    launchImageLibrary(
      {
        maxWidth: 200,
        maxHeight: 200,
        mediaType: 'photo',
      },
      res => {
        setImage(res);
        console.log(res);
        handleUploadPhoto();
      },
    );
  };
  // a function to show the  sliding modal
  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          sheetRef.current.snapTo(1);
        }}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  //the view of the page
  return (
    <ScrollView style={styles.container}>
      <BottomSheet
        initialSnap={1}
        ref={sheetRef}
        snapPoints={[450, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
      <StatusBar style={{backgroundColor: '#121212'}} />
      <View style={styles.upperBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.editProfile}>Edit Profile</Text>
        <TouchableOpacity>
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image style={styles.profileImage} source={{uri: ProfileImage}} />
        <TouchableOpacity
          style={styles.changeImage}
          onPress={() => sheetRef.current.snapTo(0)}>
          <Text style={{color: '#3897F0'}}>Change Profile Photo</Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 15, color: 'white', marginLeft: 15}}>
        Informations Generales :{' '}
      </Text>
      <Input title="Pseudo" value="AuckFmine" />
      <Divider style={{backgroundColor: 'black'}} />
      <Input title="Nom" value="Rouatbi" />
      <Divider style={{backgroundColor: 'black'}} />
      <Input title="Prenom" value="Mouhamed Amine " />
      <Divider style={{backgroundColor: 'black'}} />
      <Input title="Bio" value="ingenieur logiciel chez off agency" />
      <Divider style={{backgroundColor: 'black'}} />
      <Text
        style={{fontSize: 15, color: 'white', marginLeft: 15, marginTop: 10}}>
        Informations Privées :{' '}
      </Text>
      <Input title="E-mail" value="mouhamedaminerouatbi@gmail.com" />
      <Divider style={{backgroundColor: 'black'}} />
      <Input title="Num TLF" value="+21625892319" />
      <Divider style={{backgroundColor: 'black'}} />
      <Input title="Sexe" value="Male" />
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
    marginVertical: 25,
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
});
