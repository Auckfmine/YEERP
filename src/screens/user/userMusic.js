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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {set} from 'react-native-reanimated';
const screenSize = Dimensions.get('window').width;
const tile = screenSize / 3;
//user id need to get imported from redux state

const UserMusic = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const photos = useSelector(state => state.userPhotos.photos);
  const dispatch = useDispatch();

  //get the stored user from localstorage and grab all his images to show them in the profile
  const getLocalData = async () => {
    const StringUser = await AsyncStorage.getItem('user');
    const user = JSON.parse(StringUser);

    dispatch(getUserPhotos(user.user._id));
  };
  useEffect(() => {
    setIsLoading(true);
    getLocalData();
    setIsLoading(false);
  }, []);

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
      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="white" size="large" />
      ) : (
        <FlatList
          numColumns={3}
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
    flex: 1,
  },
});
