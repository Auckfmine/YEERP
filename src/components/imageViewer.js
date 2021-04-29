/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Modal,
  BackHandler,
  TouchableOpacity,
  Text,
} from 'react-native';
import Image from 'react-native-image-zoom-viewer';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
const ImageViewer = ({route, navigation}) => {
  const {url} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return navigation.goBack();
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <Modal visible={true} transparent={true}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: '3%',
          left: '3%',
          zIndex: 3,
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="white" />
        <Text style={{color: 'white', fontSize: 20}}>Retourner</Text>
      </TouchableOpacity>

      <Image
        loadingRender={() => {
          <ActivityIndicator color="white" size="large" />;
        }}
        enableSwipeDown={true}
        onSwipeDown={() => {
          navigation.goBack();
        }}
        imageUrls={url}
      />
    </Modal>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({});
