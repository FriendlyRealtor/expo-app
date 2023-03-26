import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

export const SplashScreen = () => {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        loop
        speed={0.5}
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#FFFFFF',
        }}
        source={require('../../assets/splash.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
