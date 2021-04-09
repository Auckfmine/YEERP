/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
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
import Profile from './src/screens/user/profile';
import ProfileScreen from './src/screens/user/ProfileScreen';
import Core from './navigation/core';

//navigation
const stack = createStackNavigator();

//redux
import {Provider} from 'react-redux';
import store from './store';
import Login from './src/screens/auth/login';
const App = ({navigation}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3500);
  }, []);
  return (
    <LanguageProvider language="fr-FR">
      <Provider store={store}>
        <NetworkProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <stack.Navigator headerMode={false}>
                <stack.Screen name="Profile2" component={Core} />
                <stack.Screen name="Splash" component={splashScreen} />
                <stack.Screen name="Login" component={LoginScreen} />
                <stack.Screen name="Register" component={RegisterScreen} />
                <stack.Screen name="Forget1" component={Forget1} />
                <stack.Screen name="Forget2" component={Forget2} />
                <stack.Screen name="Forget3" component={Forget3} />
                <stack.Screen name="Profile" component={Profile} />
              </stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </NetworkProvider>
      </Provider>
    </LanguageProvider>
  );
};

export default App;
