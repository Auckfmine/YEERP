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
import AddButton from '../src/components/tabBar/addButton';
import Menu from './menuDrawer';
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
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1594270410221-e6a33cbc6fb9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fGh1bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
              }}
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
        component={Create}
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
    </Tab.Navigator>
  );
}
