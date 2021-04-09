import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={styles.searchBar}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          console.log(searchTerm);
        }}>
        <Icon size={30} name="search" />
      </TouchableOpacity>

      <TextInput
        value={searchTerm}
        onChangeText={text => {
          setSearchTerm(text);
        }}
        onEndEditing={() => {
          console.log(searchTerm);
        }}
        style={styles.textInput}
        placeholder="Search"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  searchBar: {
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
  },
});
