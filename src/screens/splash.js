import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';
import {NetworkConsumer, useIsConnected} from 'react-native-offline';
const CostumProgressBar = Animatable.createAnimatableComponent(ProgressBar);
const Splash = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const isConnected = useIsConnected();

  useEffect(() => {
    animate();
  }, []);
  useEffect(() => {
    if (progress === 1) {
      navigation.navigate('Login');
    }
  });
  const animate = () => {
    let progress = 0;
    setProgress(progress);
    setTimeout(() => {
      setInterval(() => {
        progress += 0.2;
        if (progress > 1) {
          progress = 1;
        }
        setProgress(progress);
      }, 500);
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={!isConnected}
        showProgress={false}
        title="Oops"
        message="vous n'êtes pas connecté à Internet"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        cancelText="Continuer"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
      />
      <View style={styles.imageContainer}>
        <Animatable.Image
          delay={1000}
          animation="bounceInDown"
          style={styles.logo}
          source={require('../assets/images/logo-3.png')}
        />
      </View>
      <Animatable.Text delay={3000} animation="fadeIn" style={styles.brand}>
        Bienvenue A YEERP !
      </Animatable.Text>
      <View style={styles.progressBar}>
        <CostumProgressBar
          delay={4000}
          animation="fadeIn"
          progress={progress}
          animated
          width={200}
        />
        <Animatable.Text
          delay={4000}
          iterationCount={5}
          style={styles.Loading}
          animation="fadeIn">
          chargement ...
        </Animatable.Text>
      </View>
      <Text style={styles.bottomText}> YEERP 2021 © All Rights Reserved .</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    marginVertical: '20%',
    alignSelf: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  brand: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 24,
    color: 'white',
  },
  progressBar: {
    flex: 1,
    alignSelf: 'center',
    marginVertical: '10%',
  },
  bottomText: {
    alignSelf: 'center',
    color: 'white',
    bottom: '5%',
  },
  Loading: {
    color: 'white',
    alignSelf: 'center',
  },
});
