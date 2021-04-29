/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../../redux/user/userAction';
const CostumProgressBar = Animatable.createAnimatableComponent(ProgressBar);

const Splash = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [localData, setLocalData] = useState(null);
  const dispatch = useDispatch();

  //check if userData  exists in localStorage
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          console.log('sotred user', value);
          return setLocalData(JSON.parse(value));
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  //this is to make the animation of the progress bar
  useEffect(() => {
    animate();
  }, []);

  //decide either redirect user to login or to home page based on localStorage content
  useEffect(() => {
    if (progress === 1) {
      if (localData) {
        dispatch(getUserProfile(localData.user._id));
        return navigation.navigate('Main', {
          screen: 'Profile2',
          params: {screen: 'Profiles', params: {id: localData.user._id}},
        });
      }
      return navigation.navigate('Login');
    }
  }, [dispatch, navigation, localData, progress]);

  //this is the animation of the progress bar
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

  //test if the phone is connected to internet or no
  /*if (!isConnected) {
    return (
      <AwesomeAlert
        show={!isConnected}
        showProgress={false}
        title="Oops"
        message="vous n'êtes pas connecté à Internet"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Continuer"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
      />
    );
  }*/

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animatable.Image
          delay={1000}
          animation="fadeIn"
          style={styles.logo}
          source={require('../assets/images/logoFinal.png')}
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
