/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

export default class videoPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Video
        source={{uri: this.props.route.params.url}} // Can be a URL or a local file.
        ref={ref => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      />
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
  },
});
