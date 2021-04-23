/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import Btn from '../../components/btn';
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
import {registerUser} from '../../../api/auth/register';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {
  registerPending,
  registerSuccess,
  registerFailed,
  clearData,
} from '../../../redux/auth/register';
//redux actions

import {useSelector} from 'react-redux';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [userName, setUserName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    value: '',
    error: '',
  });
  const [emptyField, setEmptyField] = useState(false);
  const {isLoading, accountCreated, error} = useSelector(
    state => state.registration,
  );
  useEffect(() => {
    helper();
  }, [error]);
  //parsing validation errors coming from nodejs and making it comfortable to our front part
  const helper = () => {
    if (error) {
      error.map(err => {
        if (err.param) {
          if (err.param === 'password') {
            setPassword({...password, error: err.msg});
          }
          if (err.param === 'email') {
            setEmail({...email, error: err.msg});
          }
        } else {
          if (err.type === 'email') {
            setEmail({...email, error: err.msg});
          }
          if (err.type === 'password') {
            setPassword({...passwordConfirmation, error: err.msg});
          }
        }
      });
    }
  };

  const handleUserRegister = async () => {
    //check if fields are empty before calling the api
    dispatch(registerPending());
    if (
      !userName.value ||
      !email.value ||
      !password.value ||
      !passwordConfirmation.value
    ) {
      dispatch(registerFailed());
      return setEmptyField(true);
    }
    try {
      const response = await registerUser({
        userName: userName.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value,
      });
      //if response  is succesfull

      if (response.data.success === true) {
        return dispatch(registerSuccess());
      } else if (response.data.msg) {
        //if response successfull  but  there is an error in the body of thee data
        return dispatch(registerFailed([response.data]));
      } else {
        return dispatch(registerFailed(response.data.errors));
      }
      //check for validation errors
    } catch (err) {
      return dispatch(registerFailed(err));
    }
  };
  return (
    <KeyboardAwareScrollView
      scrollEnabled={true}
      scrollToOverflowEnabled={true}
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <AwesomeAlert
        show={emptyField}
        showProgress={false}
        title="Oops"
        message="veuillez remplir toutes les champs"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Continuer"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setEmptyField(false);
        }}
      />
      <AwesomeAlert
        show={accountCreated}
        showProgress={false}
        title="Félicitation"
        message="Votre compte a été créé avec succès"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Continuer"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          dispatch(clearData());
          navigation.navigate('Login');
        }}
      />

      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="chevron-left" size={35} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>S'inscrire</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          value={userName.value}
          onChangeText={text => {
            setUserName({value: text});
          }}
          placeholder="Pseudo"
          leftIcon={<Icon name="user" size={24} color="#4368B0" />}
          errorStyle={{color: 'red'}}
          errorMessage=""
        />
        <Input
          value={email.value}
          onChangeText={text => {
            setEmail({value: text});
          }}
          placeholder="Email"
          leftIcon={<Icon name="email" size={24} color="#4368B0" />}
          errorStyle={{color: 'red'}}
          errorMessage={email.error}
        />
        <Input
          value={password.value}
          onChangeText={text => {
            setPassword({value: text});
          }}
          placeholder=" Mot De Passe"
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
          errorStyle={{color: 'red'}}
          errorMessage={password.error}
          secureTextEntry={hidden}
        />
        <Input
          value={passwordConfirmation.value}
          onChangeText={text => {
            setPasswordConfirmation({value: text});
          }}
          placeholder="Confirmez Le Mot De Passe"
          leftIcon={<Icon name="key" size={24} color="#4368B0" />}
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                setHidden2(!hidden2);
              }}>
              <Icon
                name={hidden2 === false ? 'eye' : 'eye-with-line'}
                size={24}
                color="#4368B0"
              />
            </TouchableOpacity>
          }
          errorStyle={{color: 'red'}}
          errorMessage={passwordConfirmation.error}
          secureTextEntry={hidden2}
        />
      </View>
      <View style={styles.BtnContainer}>
        <Btn color="#DA1F26" onClick={handleUserRegister} title="S'inscrire" />
      </View>
      <View style={styles.login}>
        <Text
          style={{
            color: '#000000',
            fontSize: 14,
            lineHeight: 18,
            fontFamily: 'Poppins-Medium',
            fontWeight: '400',
          }}>
          Vous avez deja un compte ?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text
            style={{
              color: '#DA1F26',
              fontFamily: 'Poppins-Medium',
              fontWeight: '500',
            }}>
            connectez-vous
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    lineHeight: 36,
  },
  ButtonContainer: {},
  textContainer: {
    alignSelf: 'center',
    marginVertical: '5%',
  },
  login: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  BtnContainer: {},
  backBtn: {
    position: 'absolute',
    top: 20,
  },
  inputContainer: {
    marginVertical: 60,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
