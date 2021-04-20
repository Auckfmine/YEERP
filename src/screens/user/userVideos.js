/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getUserVideos} from '../../../redux/user/videos/videoActions';

const screenSize = Dimensions.get('window').width;
const tile = screenSize / 3;
const UserVideos = ({navigation}) => {
  const videos = useSelector(state => state.userVideos.videos);
  const isLoading = useSelector(state => state.userVideos.isLoading);
  const dispatch = useDispatch();
  const getVideos = async () => {
    const dataObject = await AsyncStorage.getItem('user');
    const json = await JSON.parse(dataObject);

    dispatch(getUserVideos(json.user._id));
  };
  useEffect(() => {
    getVideos();
  }, []);

  if (isLoading === true) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#121212',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Video', {url: item.source});
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
        onRefresh={getVideos}
        refreshing={isLoading}
        numColumns={3}
        keyExtractor={item => item._id}
        data={videos}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UserVideos;

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
