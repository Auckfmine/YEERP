import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const userPosts = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Posts Here</Text>
    </View>
  );
};

export default userPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});
