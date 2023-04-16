import React, { useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { SplashScreenStyles } from './SplashScreenStyles';

export const SplashScreen = () => {
  const styles = SplashScreenStyles;
  const animation = useRef(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        speed={0.5}
        ref={animation}
        style={styles.lottieView}
        source={require('../../../assets/splash.json')}
      />
    </View>
  );
};
