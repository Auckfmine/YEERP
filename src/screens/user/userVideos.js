/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {Videos} = require('../../data/videos');
const screenSize = Dimensions.get('window').width;
const tile = screenSize / 2;
const userVideos = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Video', {url: item.sources});
        }}>
        <View>
          <Icon
            style={styles.VideoIcon}
            name="ios-videocam-outline"
            size={24}
          />
          <Image style={styles.thumbNail} source={{uri: item.thumbNail}} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={item => item.id}
        data={Videos}
        renderItem={renderItem}
      />
    </View>
  );
};

export default userVideos;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#121212',
  },
  thumbNail: {
    marginBottom: 1,
    marginLeft: 1,
    height: tile,
    width: tile,
  },
  VideoIcon: {
    color: 'white',
    position: 'absolute',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    right: 10,
    zIndex: 1,
  },
});
