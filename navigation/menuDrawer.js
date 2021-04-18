/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
import Core from './core';
import DrawerContent from '../src/screens/user/drawerContent';
export default function DrawerNav() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Profile2" component={Core} />
    </Drawer.Navigator>
  );
}
