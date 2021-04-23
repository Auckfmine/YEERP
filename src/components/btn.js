/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const btn = ({disabled, onClick, isLoading, title, color}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: color}]}
        onPress={onClick}
        disabled={disabled}>
        {isLoading === true ? (
          <Text style={styles.text}>Loading ...</Text>
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },

  text: {
    textAlign: 'center',
    marginVertical: '5%',
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  button: {
    borderRadius: 20,
  },
});
export default btn;
