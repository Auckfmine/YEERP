/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

const EditProfile = ({route, navigation}) => {
  const {logo} = route.params;
  return (
    <View style={styles.container}>
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
        <Image style={styles.profileImage} source={{uri: logo}} />
        <TouchableOpacity style={styles.changeImage}>
          <Text style={{color: '#3897F0'}}>Change Profile Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
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
});
