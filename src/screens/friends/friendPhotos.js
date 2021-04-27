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

const FriendPhotos = ({friendId, navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  console.log(photos);
  const getFriendPhotos = () => {
    fetchPhotos('6087285db0732f34f4c3936e')
      .then(data => {
        setPhotos(data.photos);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
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
        onRefresh={getFriendPhotos}
        refreshing={isLoading}
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
