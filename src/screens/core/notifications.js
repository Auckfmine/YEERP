import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const notifications = () => {
  return (
    <View style={styles.container}>
      <Text> Notification Screen</Text>
    </View>
  );
};

export default notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
