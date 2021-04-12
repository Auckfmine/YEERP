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
import api from '../../../api/apiCall';
const {Posts} = require('../../data/dummyData');
const screenSize = Dimensions.get('window').width;
const tile = screenSize / 2;
const userId = '605911e7452cd506f053c3db'; //user id need to get imported from redux state

const UserMusic = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //get the images for the specific user from the backend
    const getData = async () => {
      try {
        const response = await api.get(`/user/${userId}/images`);
        //console.log(response.data);
        setData(response.data.photos);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
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
      {data.length === 0 ? (
        <ActivityIndicator style={styles.loader} size="large" color="white" />
      ) : (
        <FlatList
          numColumns={2}
          keyExtractor={item => item._id}
          data={data}
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
