import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const home = () => {
  return (
    <View style={styles.container}>
      <Text>HomePage</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
