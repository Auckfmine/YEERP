/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
const {Posts} = require('../../data/dummyData');
const screenSize = Dimensions.get('window').width;
const tile = screenSize / 2;
const userMusic = () => {
  const renderItem = ({item}) => {
    return (
      <Image
        style={{height: tile, width: tile, marginLeft: 2, marginTop: 2}}
        source={{uri: item.image}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={item => item.id}
        data={Posts}
        renderItem={renderItem}
      />
    </View>
  );
};

export default userMusic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
