/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Text,
  Caption,
  Drawer,
  Switch,
  TouchableRipple,
  Paragraph,
  Title,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';

const DrawerContent = props => {
  const paperTheme = useTheme();
  let {user} = useSelector(state => state.user); //get the user data from redux either from signup or from rendering the profile page
  //console.log('redux user', user);
  const handleSignOut = () => {
    AsyncStorage.removeItem('user')
      .then(() => props.navigation.navigate('Login'))
      .catch(err => Alert.alert(err));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
              }}>
              <Avatar.Image
                source={{
                  uri: user.photo,
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>
                  {user.firstName && user.lastName
                    ? user.firstName + ' ' + user.lastName
                    : 'Anonyme'}
                </Title>
                <Caption style={styles.caption}>@{user.userName}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {user.posts}
                </Paragraph>
                <Caption style={styles.caption}>Publications</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {user === {} ? '' : user.friends.length}
                </Paragraph>
                <Caption style={styles.caption}>Amis</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="account-details-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Mes Details"
              onPress={() => {
                props.navigation.navigate('EditProfile', {
                  logo: user.photo,
                  id: user._id,
                });
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Mes Amis"
              onPress={() => {
                props.navigation.navigate('SearchFriends');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-group" color={color} size={size} />
              )}
              label="Mes groupes"
              onPress={() => {
                props.navigation.navigate('BookmarkScreen');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Securité">
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-alert-outline" color={color} size={size} />
              )}
              label="Gérer le mot de passe"
              onPress={() => {
                props.navigation.navigate('BookmarkScreen');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => {}}>
              <View style={styles.preference}>
                <Text>Changer le theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Deconnexion"
          onPress={() => {
            handleSignOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 14,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
