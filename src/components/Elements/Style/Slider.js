import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
export const Style = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 15,
    width: 15,
    borderRadius: 15,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  imageContainer: {
    width: width,
    height: height * 0.6,
    backgroundColor: 'transparent',
  },
  image: {width: '100%', height: '100%'},
});
