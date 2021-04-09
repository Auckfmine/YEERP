import React from 'react';
import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
import {data} from '../data/dummyData';
const listScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listElement}
        data={data}
        renderItem={element => {
          return (
            <Text key={element.index}>
              {element.item.name} - {element.item.age}
            </Text>
          );
        }}
      />
      <Button
        title="click me "
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default listScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
  listElement: {
    backgroundColor: 'red',
  },
});
