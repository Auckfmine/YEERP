import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const footer = () => {
  return (
    <View style={styles.footer}>
      <Button title="nav1"></Button>
      <Button title="nav1"></Button>
      <Button title="nav1"></Button>
      <Button title="nav1"></Button>
      <Button title="nav1"></Button>
    </View>
  );
};

export default footer;

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
