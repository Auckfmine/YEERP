/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

export default class videoPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {url} = this.props.route.params;
    console.log(url);
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: '3%',
            left: '3%',
            zIndex: 3,
            alignItems: 'center',
          }}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
          <Text style={{color: 'white', fontSize: 20}}>Retourner</Text>
        </TouchableOpacity>
        <Video
          fullscreenAutorotate={true}
          fullscreenOrientation="landscape"
          resizeMode="contain"
          controls={true}
          automaticallyWaitsToMinimizeStalling={true}
          source={{uri: url}} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121212',
  },
});
