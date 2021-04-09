/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  console.log('heelo');
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#121212" />
      <View style={styles.topHalf}>
        <View style={styles.topBar}>
          <Text style={styles.text}>Profile</Text>
          <Icon style={styles.homeIcon} size={24} name="menu" />
        </View>

        <View style={styles.UserInfo}>
          <Image
            style={styles.ProfileImage}
            source={require('../../assets/images/profile.png')}
          />
          <Text style={styles.userInfoText}>Postes</Text>
          <Text style={styles.userInfoText}>Folowers</Text>
          <Text style={styles.userInfoText}>Folowing</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.UserName}>@User_Name</Text>
          <Text style={styles.UserName}>
            Digital goodies designer @pixsellz Everything is designed.
          </Text>
        </View>
        <View style={styles.editProfile}>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text
              style={{
                color: 'white',
                marginHorizontal: '30%',
                marginVertical: 5,
              }}>
              edit profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1}}>
        <Text>amine</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topHalf: {
    marginHorizontal: 10,
  },
  text: {
    color: '#F9F9F9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '4%',
  },
  homeIcon: {
    position: 'absolute',
    color: '#F9F9F9',
    right: 0,
  },
  ProfileImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#F9F9F9',
  },
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfoText: {
    color: '#F9F9F9',
  },
  UserName: {
    color: '#F9F9F9',
    marginBottom: 10,
  },
  bioContainer: {marginVertical: 10},
  editProfile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileBtn: {
    backgroundColor: '#000000',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F9F9F9',
  },
});
