/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NetworkProvider} from 'react-native-offline';
import {LanguageProvider} from 'react-native-translation';

//screens
import LoginScreen from './src/screens/auth/login';
import RegisterScreen from './src/screens/auth/register';
import Forget1 from './src/screens/auth/forgetPasswordStep1';
import Forget2 from './src/screens/auth/forgetPasswordStep2';
import Forget3 from './src/screens/auth/forgetPasswordStep3';
import splashScreen from './src/screens/splash';
import EditProfile from './src/screens/user/editProfile';
import ImageViewer from './src/components/imageViewer';
import videoPlayer from './src/components/videoPlayer';
import MusicPlayer from './src/components/musicPlayer';
import DrawerNav from './navigation/menuDrawer';
//socket Io
import {io} from 'socket.io-client';
const socket = io('http://10.0.2.2:8000');
//navigation
const stack = createStackNavigator();
socket.on('connect', () => {
  console.log('connected');
});
socket.emit('cliendEvent', () => {});
//redux
import {Provider} from 'react-redux';
import store from './store';
import SearchFriends from './src/screens/friends/friends';
import FriendProfileScreen from './src/screens/friends/friendsProfile';

const App = ({navigation}) => {
  return (
    <LanguageProvider language="fr-FR">
      <Provider store={store}>
        <NetworkProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <stack.Navigator headerMode={false}>
                <stack.Screen name="Splash" component={splashScreen} />
                <stack.Screen name="Login" component={LoginScreen} />
                <stack.Screen name="Main" component={DrawerNav} />
                <stack.Screen name="Register" component={RegisterScreen} />
                <stack.Screen name="Forget1" component={Forget1} />
                <stack.Screen name="Forget2" component={Forget2} />
                <stack.Screen name="Forget3" component={Forget3} />
                <stack.Screen name="Viewer" component={ImageViewer} />
                <stack.Screen name="Video" component={videoPlayer} />
                <stack.Screen name="MusicPlayer" component={MusicPlayer} />
                <stack.Screen name="EditProfile" component={EditProfile} />
                <stack.Screen name="SearchFriends" component={SearchFriends} />
                <stack.Screen
                  name="FriendProfileScreen"
                  component={FriendProfileScreen}
                />
              </stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </NetworkProvider>
      </Provider>
    </LanguageProvider>
  );
};

export default App;
