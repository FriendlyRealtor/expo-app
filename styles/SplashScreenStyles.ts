import {StyleSheet} from 'react-native';
import {Colors} from '../src/config';

export const SplashScreenStyles = StyleSheet.create({
  animationContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lottieView: {
    width: 200,
    height: 200,
    backgroundColor: Colors.white,
  },
});
