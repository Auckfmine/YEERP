/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Music from '../user/userMusic';
import Posts from '../user/userPosts';
import Videos from '../user/userVideos';
import axios from 'axios';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({navigation}) => {
  const [userr, setUser] = useState('');
  const {user} = useSelector(state => state.user);
  console.log(user.photo);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/user/${user._id}`,
        );
        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" />
      <View style={styles.topHalf}>
        <View style={styles.topBar}>
          <Text style={styles.text}>Profile</Text>
          <TouchableOpacity style={styles.homeIcon}>
            <Icon style={{color: '#F9F9F9'}} size={30} name="menu" />
          </TouchableOpacity>
        </View>

        <View style={styles.UserInfo}>
          <Image
            style={styles.ProfileImage}
            source={{
              uri: user.photo,
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: '50%',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.userInfoText}>Postes</Text>
              <Text style={styles.userInfoText}>Folowers</Text>
              <Text style={styles.userInfoText}>Folowing</Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Text style={styles.userInfoText}>{user.folowers}</Text>
              <Text style={styles.userInfoText}>{user.folowing}</Text>
              <Text style={styles.userInfoText}>{user.posts}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.UserName}>@{user.userName}</Text>
          <Text style={styles.UserName}>
            Digital goodies designer @pixsellz Everything is designed.
          </Text>
        </View>
        <View style={styles.editProfile}>
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => {
              navigation.navigate('EditProfile', {
                logo: user.photo,
              });
            }}>
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

      <View style={styles.bottomHalf}>
        <Tab.Navigator
          tabBarOptions={{
            style: {backgroundColor: 'black'},
            showLabel: false,
            showIcon: true,
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="md-image-outline" color="white" size={24} />
              ),
            }}
            name="Music"
            component={Music}
          />

          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="ios-videocam-outline" color="white" size={24} />
              ),
            }}
            name="Videos"
            component={Videos}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon
                  name="ios-musical-notes-outline"
                  color="white"
                  size={24}
                />
              ),
            }}
            name="Posts"
            component={Posts}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topHalf: {
    marginHorizontal: '5%',
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

    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },

  bottomHalf: {
    flex: 1,
    marginTop: '5%',
  },
});
