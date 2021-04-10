/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const userVideos = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Videos Here</Text>
    </View>
  );
};

export default userVideos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
