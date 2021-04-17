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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

import Music from '../user/userMusic';
import Posts from '../user/userPosts';
import Videos from '../user/userVideos';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {getUserPhotos} from '../../../redux/user/imagesAction';
import {getUserProfile} from '../../../redux/user/userAction';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({route, navigation}) => {
  const [userr, setUser] = useState('');
  const {user} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const {local} = route.params || '';
  //get user details without redux
  /*const getUser = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/user/${local.user._id}`,
      );
      console.log(response.data);
      if (response.data) {
        console.log('before adding data to state', userr);
        setUser(response.data.user);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };*/
  //get the data from the api if there is no state stored in redux
  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserProfile(local.user._id));
    dispatch(getUserPhotos(local.user._id));
    setIsLoading(false);

    //if (!user.email) return getUser();
  }, []);
  //console.log(isLoading);
  //console.log(user);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" />
      {isLoading ? (
        <ActivityIndicator color="black" />
      ) : (
        <View style={styles.topHalf}>
          <View style={styles.topBar}>
            <Text style={styles.text}>Profile</Text>
            <TouchableOpacity style={styles.homeIcon} onPress={() => {}}>
              <Icon style={{color: '#F9F9F9'}} size={30} name="menu" />
            </TouchableOpacity>
          </View>

          <View style={styles.UserInfo}>
            <Image
              style={styles.ProfileImage}
              source={{
                uri: !user.photo
                  ? 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                  : user.photo,
              }}
            />
            <Text style={styles.UserName}>
              @{!user.userName ? userr.userName : user.userName}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Text style={styles.userInfoText}>Postes</Text>
                <Text style={styles.userInfoText}>Folowers</Text>
                <Text style={styles.userInfoText}>Folowing</Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Text style={styles.userInfoText}>{user.posts}</Text>
                <Text style={styles.userInfoText}>{user.folowing}</Text>
                <Text style={styles.userInfoText}>{user.folowers}</Text>
              </View>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.UserName}>
              {!user.bio ? userr.bio : user.bio}
            </Text>
          </View>
          <View style={styles.editProfile}>
            <TouchableOpacity
              style={styles.editProfileBtn}
              onPress={() => {
                navigation.navigate('EditProfile', {
                  logo: !user.photo ? userr.photo : user.photo,
                  id: local.user._id,
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
      )}

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
    //flexDirection: 'row',

    alignItems: 'center',
  },
  userInfoText: {
    color: '#F9F9F9',
    paddingRight: 15,
  },
  UserName: {
    color: '#F9F9F9',
    marginBottom: 10,
    alignSelf: 'center',
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
