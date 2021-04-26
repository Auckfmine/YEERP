/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUserPhotos} from '../../../redux/user/imagesAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../api/apiCall';
import {fetchPhotos} from '../../../api/user/fetchUserPhotos';

const screenSize = Dimensions.get('window').width;
const tile = screenSize / 3;
//firends Id needs to be imported from the routes

const FriendPhotos = ({route, friendId, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  
  
  useEffect(() => {
    const getFriendPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPhotos(friendId);
        if (response.success) {
          setPhotos(response.photos);
          console.log("photos",photos.length);
          return setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriendPhotos();
  }, []);

  if (isLoading === true) {
    console.log('isLoading ffff');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
  if (photos.length === 0) {
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
          navigation.navigate('Viewer', {url: [{url: item.url}]});
        }}>
        <Image style={styles.image} source={{uri: item.url}} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        keyExtractor={item => item._id}
        data={photos}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FriendPhotos;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#121212',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {height: tile, width: tile, marginLeft: 2, marginTop: 2},
  loader: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
