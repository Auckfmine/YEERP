import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const header = () => {
  return (
    <View style={styles.header}>
      <Button title="back" onPress={() => {}}></Button>
      <Text style={styles.text}> Guess Game</Text>
    </View>
  );
};

export default header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 10,
    backgroundColor: '#20B2AA',
  },
  text: {
    paddingRight: '40%',
  },
});
