import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import api from '../../../api/apiCall';
import {Card, SearchBar} from 'react-native-elements';
import axios from 'axios';
import {TouchableOpacity} from 'react-native';
import { Button } from 'react-native-share';

const search = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErros] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = item => {
    setSearch(item);
  };

  const getUsers = () => {
    setLoading(true);
    api
      .get('search/users/', {headers: {term: search}})
      .then(users => {
        console.log(search);
        console.log(users.data);
        setUsers(users.data.users);
        setLoading(false);
      })
      .catch(err => setErros(err.message));
  };

  useEffect(() => {
    getUsers();
  }, [search]);

  const renderItem = ({item}) => {
    //console.log(item.photo)
    return (
      <TouchableOpacity
        onPress={() => {
          /* navigate the the specific user's profile*/
        }}>
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
              source={{uri: item.photo}}
            />
            <Button title="Visiter"/>
            <Text style={styles.info}>{item.userName}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={handleSearch}
        value={search}
      />
      {loading ? (
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          color="red"
          size="large"
        />
      ) : search.length === 0 ? (
        <Text style={{color: 'white'}}>
          Pou Pouvez cherchez Des personne ici
        </Text>
      ) : (
        <FlatList
          onRefresh={getUsers}
          refreshing={loading}
          keyExtractor={item => item._id}
          data={users}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default search;

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
});
