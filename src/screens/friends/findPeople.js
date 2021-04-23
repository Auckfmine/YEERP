import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import api from '../../../api/apiCall';

const FindPPl = () => {
  const [users, setUsers] = useState([]);
  const [errors, setErros] = useState([]);
  const getUsers = () => {
    api
      .get('/users')
      .then(users => {
        setUsers(users);
      })
      .catch(err => setErros(err.message));
  };

  useEffect(() => {
    getUsers();
  }, []);


    
  return (
    <View>
      <Text>Find PPl</Text>
        <Text>{users.length!==0 ? users : "not found"}</Text>
    </View>
  );
};

export default FindPPl;

const styles = StyleSheet.create({});
