/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
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
const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" />
      <View style={styles.topHalf}>
        <View style={styles.topBar}>
          <Text style={styles.text}>Profile</Text>
          <Icon style={styles.homeIcon} size={30} name="menu" />
        </View>

        <View style={styles.UserInfo}>
          <Image
            style={styles.ProfileImage}
            source={{
              uri:
                'https://images.unsplash.com/photo-1594270410221-e6a33cbc6fb9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fGh1bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            }}
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

  bottomHalf: {
    flex: 1,
    marginTop: '5%',
  },
});
