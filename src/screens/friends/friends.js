/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import api from '../../../api/apiCall';
import {Card, SearchBar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const SearchFriends = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const currentUser = useSelector(state => state.user.user);

  const handleSearch = item => {
    setSearch(item);
  };
  useEffect(() => {
    const getFriends = async () => {
      const response = await api.get(`getAllFriends/${currentUser._id}`);
      console.log('friend', response.data.friends[0].friends);
      setUsers(response.data.friends[0].friends);
    };
    getFriends();
  }, [currentUser._id]);

  const renderItem = ({item}) => {
    return (
      <Card
        containerStyle={{
          borderRadius: 20,
          borderColor: 'black',
          backgroundColor: 'black',
        }}>
        <View style={styles.user}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: item.image}}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FriendProfileScreen', {id: item.id});
            }}>
            {/*  if the user clicks on the name then navigate to user profile*/}
            <View>
              <Text style={styles.info}>{item.name}</Text>
              <Text style={styles.name}>
                {item.firstName && item.lastName
                  ? item.firstName + ' ' + item.lastName
                  : ''}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{position: 'absolute', right: 10}}>
            <TouchableOpacity onPress={() => {}}>
              <Feather name="user-check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color="white" size={24} />
        </TouchableOpacity>

        <SearchBar
          containerStyle={{
            width: '80%',
            backgroundColor: '#121212',
            borderColor: '#121212',
            borderTopColor: '#121212',
            borderBottomColor: '#121212',
          }}
          placeholder="Cherchez ..."
          onChangeText={handleSearch}
          value={search}
        />
      </View>

      <FlatList
        onRefresh={() => {}}
        refreshing={loading}
        keyExtractor={item => item._id}
        data={users}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  info: {
    color: 'white',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 10,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  name: {
    color: 'grey',
    fontSize: 12,
  },
});
