import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const create = () => {
  return (
    <View style={styles.container}>
      <Text>Create Screen</Text>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
