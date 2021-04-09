import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const Card = ({source, name, stars, Reviews}) => {
  return (
    <View style={styles.card}>
      <Image style={styles.Image} source={source} />
      <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 5}}>
        {name}
      </Text>
      <View style={styles.details}>
        <Text style={{marginHorizontal: 10}}>{stars} Stars ,</Text>
        <Text>{Reviews} Reviews</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    top: 50,
    marginHorizontal: 20,
  },
  details: {
    flexDirection: 'row',
    position: 'absolute',
    top: '60%',
  },
  Image: {
    width: 300,
    height: 150,
  },
});
