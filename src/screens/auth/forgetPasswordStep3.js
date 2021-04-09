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
} from '../../../redux/auth/register';
//redux actions
import {changePassword} from '../../../api/auth/changePassFromReset';
import {useSelector} from 'react-redux';

const forgetPasswordStep3 = ({navigation}) => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);

  const [password, setPassword] = useState({value: '', error: ''});
  const [passwordConfirmation, setPasswordConfirmation] = useState({
    value: '',
    error: '',
  });
  const [emptyField, setEmptyField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const {userId} = useSelector(state => state.passwordResetRequest);

  //parsing validation errors coming from nodejs and making it comfortable to our front part

  const handleChangePassword = async () => {
    setIsLoading(true);
    //check if fields are empty before calling the api
    if (!password.value || !passwordConfirmation.value) {
      setIsLoading(false);
      return setEmptyField(true);
    }
    try {
      const response = await changePassword({
        userId: userId,
        data: {
          password: password.value,
          passwordConfirmation: passwordConfirmation.value,
        },
      });

      //if response  is succesfull
      if (response.data.success === true) {
        setIsLoading(false);
        return setSuccessMessage(true);
      }

      setIsLoading(false);
      return setPassword({...password, error: response.data.msg});

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
        show={successMessage}
        showProgress={false}
        title="Félicitaions"
        message=" Mot de Passe est changé avec Succés"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Continuer"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setEmptyField(false);
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
        <Text style={styles.text}>Changer Votre Mot De Passe</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          value={password.value}
          onChangeText={text => {
            setPassword({value: text});
          }}
          placeholder=" Nouveau Mot De Passe"
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
          errorMessage={password.error}
          secureTextEntry={hidden2}
        />
      </View>
      <View style={styles.BtnContainer}>
        <Btn onClick={handleChangePassword} title="Confirmer" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default forgetPasswordStep3;

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
    marginVertical: '20%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
