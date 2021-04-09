import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Posts} from '../data/dummyData';

import Card from '../components/card';
import SearchBar from '../components/searchBar';
const homeScreen = () => {
  return (
    <View style={styles.screen}>
      <SearchBar />
      <FlatList
        data={Posts}
        renderItem={item => {
          return (
            <FlatList
              key={item.index}
              horizontal
              data={Posts}
              renderItem={item => {
                return (
                  <Card
                    key={item.index}
                    source={require('../assets/images/food.jpeg')}
                    name={item.item.item}
                    stars={item.item.item}
                    Reviews={item.item.item}
                  />
                );
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default homeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
