/* eslint-disable prettier/prettier */
import axios from 'axios';
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
import api from '../../../api/apiCall';
import {useDispatch} from 'react-redux';
import {getUserPhotos} from '../../../redux/user/imagesAction';
const screenSize = Dimensions.get('window').width;
const tile = screenSize / 2;
//user id need to get imported from redux state

const UserMusic = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const userId = useSelector(state => state.user.user._id); //gets the userId Stored in redux
  const photos = useSelector(state => state.userPhotos.photos);
  const dispatch = useDispatch();

  const renderItem = ({item}) => {
    console.log(item.url);
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
      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="white" />
      ) : (
        <FlatList
          numColumns={2}
          keyExtractor={item => item._id}
          data={photos}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default UserMusic;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#121212',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {height: tile, width: tile, marginLeft: 2, marginTop: 2},
  loader: {
    position: 'absolute',
    left: '45%',
    top: '45%',
  },
});
