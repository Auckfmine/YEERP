/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, Image, StyleSheet, View, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {Posts} = require('../../data/dummyData');
const screenSize = Dimensions.get('window').width;
const tile = screenSize / 2;
const userMusic = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Viewer', {url: [{url: item.image}]});
        }}>
        <Image style={styles.image} source={{uri: item.image}} />
      </TouchableOpacity>
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

    backgroundColor: '#121212',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {height: tile, width: tile, marginLeft: 2, marginTop: 2},
});
