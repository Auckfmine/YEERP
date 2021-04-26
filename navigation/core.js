/* eslint-disable prettier/prettier */
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
import ICon from 'react-native-vector-icons/Feather';
import AddButton from '../src/components/tabBar/addButton';
import Menu from './menuDrawer';
const Tab = createBottomTabNavigator();

const CoreRoutes = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Profiles"
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
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search-outline" color={color} size={size} />
          ),
        }}
        name="Search"
        component={Search}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
        name="HomePage"
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
            <ICon name="user" color={color} size={size} />
          ),
        }}
        name="Profiles"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default CoreRoutes;
