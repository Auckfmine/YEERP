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

const Tab = createMaterialTopTabNavigator();

const FriendProfileScreen = ({route, navigation}) => {
  const user = useSelector(state => state.user.user);

  // console.log('userr', user);
  const [isLoading, setIsLoading] = useState(true);
  const [friend, setFriend] = useState();
  const userId = route.params.id;
  console.log('friend', friend);
  const getFriend = async id => {
    try {
      const response = await api.get(`/user/${id}`);
      console.log(response.data);
      setFriend(response.data);
      return setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (friend === undefined) {
      getFriend(userId);
    }
  }, [userId, friend]);
  if (isLoading) {
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
      </View>

      <View style={styles.bottomHalf}>
        <Tab.Navigator
          tabBarOptions={{
            style: {backgroundColor: 'black'},
            showLabel: false,
            showIcon: true,
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="md-image-outline" color="white" size={24} />
              ),
            }}
            name="FriendMusic"
            component={Music}
          />

          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="ios-videocam-outline" color="white" size={24} />
              ),
            }}
            name="FriendVideos"
            component={Videos}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon
                  name="ios-musical-notes-outline"
                  color="white"
                  size={24}
                />
              ),
            }}
            name="FriendsPosts"
            component={Posts}
          />
        </Tab.Navigator>
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
});
