/* eslint-disable prettier/prettier */
import * as React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import Core from './core';
import DrawerContent from '../src/screens/user/drawerContent';
const DrawerNav = ({navigation}) => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Profile2" component={Core} />
    </Drawer.Navigator>
  );
};
export default DrawerNav;
