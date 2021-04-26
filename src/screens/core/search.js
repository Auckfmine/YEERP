/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import api from '../../../api/apiCall';
import {Card, SearchBar} from 'react-native-elements';
import axios from 'axios';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {cos} from 'react-native-reanimated';
import {getUserProfile} from '../../../redux/user/userAction';
import Feather from 'react-native-vector-icons/Feather';
const Search = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErros] = useState([]);
  const [search, setSearch] = useState('');
  const currentUser = useSelector(state => state.user.user);
  const [icon, setIcon] = useState('');
  const dispatch = useDispatch();
  const handleSearch = item => {
    setSearch(item);
  };

  const getUsers = () => {
    setLoading(true);
    api
      .get('search/users/', {headers: {term: search}})
      .then(ppl => {
        console.log(search);
        console.log(ppl.data);
        setUsers(ppl.data.users);
        setLoading(false);
      })
      .catch(err => setErros(err.message));
  };

  useEffect(() => {
    getUsers();
  }, [search]);

  const checkisFriends = item => {
    let result = false;
    console.log('currentUser', currentUser);
    currentUser.friends.map(friend => {
      if (item._id === friend.id) {
        result = true;
      }
    });
    return result;
  };
  const chekISMeFirst = item => {
    let result = false;
    if (currentUser._id === item._id) {
      result = true;
    }
    return result;
  };
  const checkISInvitationSent = item => {
    let result = false;
    currentUser.sentRequests.map(request => {
      if (request.id === item._id) {
        result = true;
      }
    });
    return result;
  };
  const checkISInvitationrecived = item => {
    let result = false;
    console.log(currentUser);
    currentUser.friendRequests.map(request => {
      if (request.id === item._id) {
        result = true;
      }
    });
    return result;
  };
  const handleSendInvitations = async item => {
    try {
      const response = await api.post('/sendInvitation/', {
        myId: currentUser._id,
        myName: currentUser.userName,
        friendId: item._id,
        friendName: item.userName,
      });
      console.log(response.data);
      dispatch(getUserProfile(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelInvitation = async item => {
    try {
      const response = await api.post('/cancelInvitation', {
        myId: currentUser._id,
        myName: currentUser.userName,
        friendId: item._id,
        friendName: item.userName,
      });
      dispatch(getUserProfile(currentUser._id));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptInvitation = async item => {
    try {
      const response = await api.post('/acceptRequest', {
        myId: currentUser._id,
        myName: currentUser.userName,
        friendId: item._id,
        friendName: item.userName,
        myImage: currentUser.photo,
        friendImage: item.photo,
      });
      console.log(response.data);
      dispatch(getUserProfile(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    getUsers();
    dispatch(getUserProfile(currentUser._id));
  };

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
            source={{uri: item.photo}}
          />
          <TouchableOpacity onPress={() => {navigation.navigate("FriendProfileScreen",{id:item._id})}}>
            {/*  if the user clicks on the name then navigate to user profile*/}
            <View>
              <Text style={styles.info}>{item.userName}</Text>
              <Text style={styles.name}>
                {item.firstName && item.lastName
                  ? item.firstName + ' ' + item.lastName
                  : ''}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{position: 'absolute', right: 10}}>
            {chekISMeFirst(item) ? (
              <Text> </Text>
            ) : checkisFriends(item) ? (
              <Feather name="user-check" size={24} color="white" />
            ) : checkISInvitationSent(item) ? (
              <TouchableOpacity onPress={() => handleCancelInvitation(item)}>
                <Icon2 name="account-remove" size={24} color="white" />
              </TouchableOpacity>
            ) : checkISInvitationrecived(item) ? (
              <View>
                <TouchableOpacity onPress={() => handleAcceptInvitation(item)}>
                  <Icon name="checkmark-done-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="close-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => handleSendInvitations(item)}>
                <Icon name="ios-person-add-outline" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={{
          backgroundColor: '#121212',
          borderBottomColor: '#121212',
          borderTopColor: '#121212',
        }}
        placeholder="Type Here..."
        onChangeText={handleSearch}
        value={search}
      />
      {loading ? (
        <ActivityIndicator
          style={{alignSelf: 'center'}}
          color="white"
          size="large"
        />
      ) : search.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="search" color="white" size={25} />
          <Text
            style={{
              color: 'white',
              marginTop: '5%',
            }}>
            Vous Pouvez cherchez Des personnes ici
          </Text>
        </View>
      ) : (
        <FlatList
          onRefresh={() => handleRefresh()}
          refreshing={loading}
          keyExtractor={item => item._id}
          data={users}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Search;

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
    borderRadius: 10,
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
