/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from '../src/screens/core/notifications';
import Search from '../src/screens/core/search';
import Profile from '../src/screens/user/ProfileScreen';
import Home from '../src/screens/core/home';
import Create from '../src/screens/core/create';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export default function CoreRoutes() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {position: 'absolute', backgroundColor: 'black'},
        showLabel: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-home-outline" color={color} size={size} />
          ),
        }}
        name="Create"
        component={Create}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-notifications-outline" color={color} size={size} />
          ),
        }}
        name="Notification"
        component={Notification}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
        name="HomePage"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-heart-outline" color={color} size={size} />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../src/assets/images/profile.png')}
              color={color}
              style={{
                width: size,
                height: size,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: 'white',
              }}
            />
          ),
        }}
        name="Profiles"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
