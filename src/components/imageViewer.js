/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Modal} from 'react-native';
import Image from 'react-native-image-zoom-viewer';
const ImageViewer = ({route, navigation}) => {
  const {url} = route.params;

  return (
    <Modal visible={true} transparent={true}>
      <Image
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
