/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
// components
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import Btn from '../../components/btn';

//redux
import api from '../../../api/apiCall';
import {useDispatch, useSelector} from 'react-redux';
//actions
import {loginFail, loginPending, loginSuccess} from '../../../redux/auth/login';
import {getUserProfile} from '../../../redux/user/userAction';
import {checkConnection} from '../../../redux/internetConnection/handleInternetState';
import Spinner from 'react-native-loading-spinner-overlay';

import NetInfo from '@react-native-community/netinfo';
import {useBackHandler} from '@react-native-community/hooks';

//internetCheck actions
import {
  internetConnected,
  internetDisconnected,
} from '../../../redux/internetConnection/internet';
import {getUserPhotos} from '../../../redux/user/imagesAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Screen

const Login = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const [email, setEmail] = useState({value: '', err: '', reduxError: ''});
  const [password, setPassword] = useState({
    value: '',
    err: '',
    reduxError: '',
  });
  const isConnected = useSelector(state => {
    state.checkInternet;
  });

  //backButton handler

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    NetInfo.fetch().then(networkState => {
      console.log(networkState.isConnected);
      if (networkState.isConnected) {
        return dispatch(internetConnected());
      }
      return dispatch(internetDisconnected());
    });
  }, [isConnected]);

  const {error, isAuth, isLoading} = useSelector(state => state.login);

  //check for connection evry time the component mounts

  //call api and dispatch redux actions  and handle error validation
  const getData = async () => {
    if (!email.value && !password.value) {
      setEmail({...email, err: "L'email ne peut pas etre vide"});
      setPassword({
        ...password,
        err: 'Le Mot de Passe ne peut pas etre vide',
      });

      return;
    }

    if (!email.value) {
      return setEmail({...email, err: "L'email ne peut pas etre vide"});
    }
    if (!password.value) {
      return setPassword({
        ...password,
        err: 'Le Mot de Passe ne peut pas etre vide',
      });
    }

    dispatch(loginPending());
    try {
      const response = await api.post('/signin', {
        email: email.value,
        password: password.value,
      });

      if (response.data.auth === true) {
        dispatch(getUserProfile(response.data.user._id));
        dispatch(getUserPhotos(response.data.user._id));
        dispatch(loginSuccess());
        await AsyncStorage.setItem('user', JSON.stringify(response.data));

        return navigation.navigate('Profile2', {
          screen: 'Profiles',
          params: {local: response.data},
        });
      }

      dispatch(loginFail(response.data.msg));
      if (response.data.type === 'email') {
        return setEmail({...email, reduxError: response.data.msg});
      } else {
        return setPassword({...password, reduxError: response.data.msg});
      }
    } catch (err) {
      return loginFail(err.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <Spinner
        visible={isLoading}
        textContent={'Chargement...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-3.png')}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input
          inputStyle={{color: 'white'}}
          placeholderTextColor="white"
          value={email.value}
          onChangeText={text => {
            setEmail({value: text});
          }}
          placeholder="Email"
          leftIcon={<Icon name="email" size={24} color="#4368B0" />}
          errorStyle={styles.errorMsg}
          errorMessage={!email.reduxError ? email.err : email.reduxError}
        />
        <Input
          inputStyle={{color: 'white'}}
          placeholderTextColor="white"
          onChangeText={text => {
            setPassword({value: text});
          }}
          value={password.value}
          placeholder="Mot De Passe"
          leftIcon={<Icon name="key" size={24} color="#4368B0" />}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setHidden(!hidden);
              }}>
              <Icon
                name={hidden === false ? 'eye' : 'eye-with-line'}
                size={24}
                color="#4368B0"
              />
            </TouchableOpacity>
          }
          errorStyle={styles.errorMsg}
          errorMessage={
            !password.reduxError ? password.err : password.reduxError
          }
          secureTextEntry={hidden}
        />
      </View>
      <TouchableOpacity
        style={styles.forgetPassBtn}
        onPress={() => {
          navigation.navigate('Forget1');
        }}>
        <Text style={styles.forgetPassText}>mot de passe oubliée ?</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Btn
          color="#DA1F26"
          title="S'identifier"
          isLoading={isLoading}
          disabled={isLoading ? true : false}
          onClick={() => {
            getData();
          }}
        />
      </View>
      <View style={styles.inscriptionContainer}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            lineHeight: 18,
            fontFamily: 'Poppins-Medium',
            fontWeight: '400',
          }}>
          vous n'avez pas de compte ?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text
            style={{
              color: '#DA1F26',
              fontFamily: 'Poppins-Medium',
              fontWeight: '500',
            }}>
            Inscrivez-vous
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    height: hp('80%'),
  },

  upperPart: {
    width: '100%',
    overflow: 'hidden',
  },
  logo: {
    height: 250,
    width: 250,
  },
  inputContainer: {
    marginHorizontal: wp('5%'),
  },
  forgetPassBtn: {
    alignSelf: 'flex-end',
    marginHorizontal: wp('5%'),
    marginVertical: hp('2.5%'),
  },
  forgetPassText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    color: '#DA1F26',
  },
  buttonContainer: {
    marginHorizontal: wp('10%'),
    marginVertical: hp('2%'),
  },
  inscriptionContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMsg: {
    color: '#DA1F26',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
});
