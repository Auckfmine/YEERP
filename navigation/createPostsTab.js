/* eslint-disable prettier/prettier */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createMaterialTopTabNavigator();
import CreatePhotos from '../src/screens/core/create/photos';
import CreateMusic from '../src/screens/core/create/music';
import CreateVideo from '../src/screens/core/create/videos';
const createPostsTab = () => {
  return (
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
        name="createPosts"
        component={CreatePhotos}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-videocam-outline" color="white" size={24} />
          ),
        }}
        name="createVideos"
        component={CreateVideo}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-musical-notes-outline" color="white" size={24} />
          ),
        }}
        name="createMusic"
        component={CreateMusic}
      />
    </Tab.Navigator>
  );
};

export default createPostsTab;
