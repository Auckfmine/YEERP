/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const Input = ({title, value, onChange}) => {
  return (
    <View style={styles.userInfo}>
      <Text style={styles.pseudo}>{title}</Text>
      <TextInput
        style={styles.centerTextInput}
        value={value}
        placeholderTextColor="white"
        onChangeText={onChange}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  pseudo: {
    fontSize: 15,
    color: 'white',
  },
  centerTextInput: {
    borderBottomColor: 'white',

    color: 'white',
    marginHorizontal: 50,
  },
});
