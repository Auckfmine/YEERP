/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Music from '../user/userMusic';
import Posts from '../user/userPosts';
import Videos from '../user/userVideos';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {getUserProfile} from '../../../redux/user/userAction';
import api from '../../../api/apiCall';
import FriendPhotos from './friendPhotos';
import {Alert} from 'react-native';
import FriendVideos from './friendVideos';
import FriendMusic from './friendMusic';

const Tab2 = createMaterialTopTabNavigator();

const FriendProfileScreen = ({route, navigation}) => {
  const user = useSelector(state => state.user.user); //user Id  from the redux store

  // console.log('userr', user);
  const [isLoading, setIsLoading] = useState(true);
  const [friend, setFriend] = useState('');

  const userId = route.params.id;
  const dispatch = useDispatch();

  const getFriend = async id => {
    try {
      const response = await api.get(`/user/${id}`);

      setFriend(response.data.user);
      return setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFriend(userId);
    checkIsFriend();
  }, [userId]);

  const checkIsFriend = () => {
    let result = false;
    user.friends.map(person => {
      if (person.id === friend._id) {
        result = true;
      }
    });
    return result;
  };

  const handleUnfriend = async () => {
    try {
      const data = await api.post('/unfriend/', {
        myId: user._id,
        friendId: friend._id,
      });

      Alert.alert('Succés', `${friend.userName} est retiré(e) avec succés`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendInvitations = async () => {
    try {
      const response = await api.post('/sendInvitation/', {
        myId: user._id,
        myName: user.userName,
        friendId: friend._id,
        friendName: friend.userName,
      });
      console.log(response.data);
      dispatch(getUserProfile(user._id));
    } catch (error) {
      console.log(error);
    }
  };
  const checkISInvitationSent = () => {
    let result = false;
    user.sentRequests.map(request => {
      if (request.id === friend._id) {
        result = true;
      }
    });
    return result;
  };
  const handleCancelInvitation = async () => {
    try {
      const response = await api.post('/cancelInvitation', {
        myId: user._id,
        myName: user.userName,
        friendId: friend._id,
        friendName: friend.userName,
      });
      dispatch(getUserProfile(user._id));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loadingScreen}
        color="white"
        size="large"
      />
    );
  }

  if (friend === undefined) {
    return (
      <ActivityIndicator
        style={styles.loadingScreen}
        color="white"
        size="large"
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" />
      <View style={styles.topHalf}>
        <View style={styles.topBar}>
          <Text style={styles.text}>Profile</Text>
          <TouchableOpacity style={styles.homeIcon}>
            <Icon
              style={{color: '#F9F9F9'}}
              size={30}
              name="arrow-back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.UserInfo}>
          <Image
            style={styles.ProfileImage}
            source={{
              uri: friend.photo,
            }}
          />
          <Text style={styles.UserName}>@{friend.userName}</Text>
          <View
            style={{
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Text style={styles.userInfoText}>publications</Text>
              <Text style={styles.userInfoText}>amis</Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Text style={styles.userInfoText}>{friend.posts}</Text>
              <Text style={styles.amis}></Text>
            </View>
          </View>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.UserName}>{friend.bio}</Text>
        </View>
        <View style={styles.buttons}>
          {checkIsFriend() ? (
            <>
              <TouchableOpacity
                style={styles.chatContainer}
                onPress={() => navigation.navigate('chat', {id: friend._id})}>
                <Text style={{color: '#ffffff'}}>message</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.chatContainer}
                onPress={() => handleUnfriend()}>
                <Text style={{color: '#ffffff'}}>retirer</Text>
              </TouchableOpacity>
            </>
          ) : checkISInvitationSent() ? (
            <TouchableOpacity
              style={[styles.chatContainer, {backgroundColor: '#008AFF'}]}
              onPress={() => {
                handleCancelInvitation();
              }}>
              <Text style={{color: '#ffffff'}}>{'invitation envoyeé'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.chatContainer}
              onPress={() => {
                handleSendInvitations();
              }}>
              <Text style={{color: '#ffffff'}}>{'ajouter'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.bottomHalf}>
        <Tab2.Navigator
          tabBarOptions={{
            style: {backgroundColor: 'black'},
            showLabel: false,
            showIcon: true,
          }}>
          <Tab2.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="md-image-outline" color="white" size={24} />
              ),
            }}
            name="FriendsPosts"
            children={() => (
              <FriendPhotos navigation={navigation} friendId={friend._id} />
            )}
          />

          <Tab2.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="ios-videocam-outline" color="white" size={24} />
              ),
            }}
            name="FriendVideos"
            children={() => (
              <FriendVideos navigation={navigation} friendId={friend._id} />
            )}
          />
          <Tab2.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon
                  name="ios-musical-notes-outline"
                  color="white"
                  size={24}
                />
              ),
            }}
            name="FriendMusic"
            component={FriendMusic}
          />
        </Tab2.Navigator>
      </View>
    </View>
  );
};

export default FriendProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topHalf: {
    marginHorizontal: '5%',
  },
  text: {
    color: '#F9F9F9',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '4%',
  },
  homeIcon: {
    position: 'absolute',
    left: 0,
  },
  ProfileImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F9F9F9',
  },
  UserInfo: {
    //flexDirection: 'row',

    alignItems: 'center',
  },
  userInfoText: {
    color: '#F9F9F9',
    paddingRight: 20,
  },
  amis: {
    color: 'white',
  },
  UserName: {
    color: '#F9F9F9',
    marginBottom: 10,
    alignSelf: 'center',
  },
  bioContainer: {marginVertical: 10},
  editProfile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileBtn: {
    backgroundColor: '#000000',
    borderRadius: 6,
    borderWidth: 1,

    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },

  bottomHalf: {
    flex: 1,
    marginTop: '5%',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chatContainer: {
    marginHorizontal: 20,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: 'white',
    elevation: 5,
  },
});
