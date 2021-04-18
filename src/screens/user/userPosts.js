/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//const {music} = require('../../data/music');
const screenSize = Dimensions.get('window').width;
const tile = screenSize / 2;
const UserPosts = ({navigation}) => {
  const [music, setMusic] = useState([]);
  const getMusic = () => {
    axios
      .get('http://10.0.2.2:8000/music/6077673d0b7a273524d76ba2')
      .then(track => setMusic(track.data.tracks))
      .catch(err => Alert.alert(err));
  };
  useEffect(() => {
    getMusic();
  }, []);
  console.log(music);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MusicPlayer', {song: item});
        }}>
        <Image style={styles.image} source={{uri: item.artwork}} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={item => item.id}
        data={music}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UserPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#121212',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {height: tile, width: tile, marginLeft: 2, marginTop: 2},
});
