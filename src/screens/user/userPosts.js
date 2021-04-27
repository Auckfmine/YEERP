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
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import api from '../../../api/apiCall';
//const {music} = require('../../data/music');
const screenSize = Dimensions.get('window').width;
const tile = screenSize / 3;
const UserPosts = ({navigation}) => {
  const [music, setMusic] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const userId = useSelector(state => state.user.user._id);
  const getMusic = () => {
    if (userId === undefined) {
      return setLoading(true);
    }
    setLoading(true);
    api
      .get(`/music/${userId}`)
      .then(track => {
        setMusic(track.data.tracks);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getMusic();
  }, [userId]);

  if (isLoading === true) {
    console.log('isLoadingggg');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

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
        onRefresh={getMusic}
        refreshing={isLoading}
        numColumns={3}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
