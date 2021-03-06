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

const screenSize = Dimensions.get('window').width;
const tile = screenSize / 3;
//user id need to get imported from redux state

const UserMusic = ({route, navigation}) => {
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

  if (isLoading === true || photos === undefined) {
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
        onRefresh={getLocalData}
        refreshing={isLoading}
        numColumns={3}
        keyExtractor={item => item._id}
        data={photos}
        renderItem={renderItem}
      />
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
