/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome';
import Btn from '../../components/btn';
import {Input} from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  resetFailed,
  resetPending,
  resetSucceeded,
} from '../../../redux/auth/resetPass';
import {resetPass} from '../../../api/auth/resetPass';
import {useDispatch, useSelector} from 'react-redux';
const ForgetPasswordStep1 = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [showError, setShowError] = useState(false);
  const [internetError, setInternetError] = useState('');
  const {resetEmailLoading, emailSent, errors, userId} = useSelector(
    state => state.passwordResetRequest,
  );
  const {isConnected} = useSelector(state => state.checkInternet);
  const dispatch = useDispatch();

  const forceSpinnerToStop = () => {
    if (isConnected === false)
      setTimeout(() => {
        setInternetError('Veuillez verifier votre conenction internet');
      }, 6000);
  };

  const handleConfirm = async () => {
    dispatch(resetPending());
    if (!email.value) {
      dispatch(resetFailed());
      return setShowError(true);
    }
    try {
      const response = await resetPass({email: email.value});
      /*console.log(email.value);
      console.log(response.data);*/
      if (response.status === 200) {
        if (response.data.success === true) {
          dispatch(resetSucceeded(response.data.user._id));
          return navigation.navigate('Forget2', {email: email.value});
        }
        return dispatch(
          resetFailed(
            'impossible de trouver votre compte . Verifiez votre Adresse Email',
          ),
        );
      }
    } catch (error) {
      console.log(error);
      return dispatch(resetFailed('une erreur produite veuillez ressayez'));
    }
  };
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <AwesomeAlert
        show={showError}
        showProgress={false}
        title="Oops"
        message="Veuillez Remplir Le Champ"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Continuer"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowError(false);
        }}
      />

      <Spinner
        visible={resetEmailLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Icon name="close" size={30} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.imageContainer}
        source={require('../../assets/images/Mail.png')}
      />

      <Text style={styles.title}>Entrez Votre Email </Text>
      <Text style={styles.subTitle}>
        vous pouvez reinitialiser votre mote de passe ici
      </Text>
      <View style={styles.input}>
        <Input
          errorMessage={errors}
          value={email.value}
          placeholder="Adress E-mail"
          leftIcon={<Icon2 name="email" size={24} color="#4368B0" />}
          errorStyle={styles.errorMsg}
          onChangeText={text => {
            setEmail({value: text});
          }}
        />
      </View>

      <View style={styles.btnContainer}>
        <Btn
          color="#DA1F26"
          title="Confirmer"
          onClick={() => {
            handleConfirm();
            forceSpinnerToStop();
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPasswordStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: '15%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  btnContainer: {
    marginVertical: 20,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    top: 20,
    right: 20,
  },
  subTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  input: {
    marginVertical: 20,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
