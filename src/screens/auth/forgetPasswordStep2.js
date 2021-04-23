/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Modal} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../../api/apiCall';
import Btn from '../../components/btn';
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  checkKeyPending,
  checkKeySuccess,
  checkKeyFailed,
} from '../../../redux/auth/verificationCode';
const CELL_COUNT = 4;

const ForgetPasswordStep2 = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [reduxError, setReduxError] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {isChecking, error} = useSelector(state => state.verificationCode);
  const {userId} = useSelector(state => state.passwordResetRequest);

  useEffect(() => {
    setReduxError(error);
  }, [error]);

  const handleSecretKey = async () => {
    dispatch(checkKeyPending());

    try {
      const response = await api.get(`/user/${userId}`);

      //if the key entred matches the key in the user body then redireect to the next page
      if (response.data.user.secretNum == value) {
        //passing the user Id to the next screen  using route params
        dispatch(checkKeySuccess());
        return navigation.navigate('Forget3');
      } else {
        //show an error msg
        dispatch(checkKeyFailed('le clé entré est incorrect'));
        return setReduxError(error);
      }
    } catch (err) {
      dispatch(checkKeyFailed('Erreur Survenu '));
    }
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={isChecking}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <Text style={styles.title}>
        Veuillez inserez le code de 4 chiffres fournit à votre Email
      </Text>

      <View style={styles.codeContainer}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <Text style={styles.ErrorMessage}>{reduxError}</Text>
      <View style={styles.btnContainer}>
        <Btn
          color="#DA1F26"
          title="Confirmer"
          onClick={() => {
            setIsLoading(true);
            handleSecretKey();
            setIsLoading(false);
          }}
        />
      </View>
      <View style={styles.notSend}>
        <Text style={styles.notSendText}>
          vous n'avez pas reçu le code de vérification ?{' '}
        </Text>
      </View>
      <View style={styles.verifCode}>
        <TouchableOpacity
          onPress={() => {
            setIsLoading(true);
            api
              .post('/resetPassword', {email: route.params.email})
              .then(data => {
                setIsLoading(false);
              });
          }}>
          <Text style={{color: '#DA1F26', fontFamily: 'Poppins-Regular'}}>
            R'envoyer le code de vérification
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator
          style={{marginVertical: 15}}
          color="black"
          size="large"
        />
      ) : null}
    </View>
  );
};

export default ForgetPasswordStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    lineHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  codeFieldRoot: {marginTop: 0},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  codeContainer: {
    marginHorizontal: '20%',
    marginVertical: '25%',
  },
  btnContainer: {
    marginHorizontal: 30,
  },
  notSend: {
    alignSelf: 'center',
    marginVertical: '5%',
  },
  notSendText: {
    fontFamily: 'Poppins-Regular',
  },
  verifCode: {
    alignSelf: 'center',
  },
  ErrorMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#DA1F26',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
