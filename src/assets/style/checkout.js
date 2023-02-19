import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
  title: {},
  subTitle: {
    textAlign: 'center',
    color: 'gray',
  },
  image: {width: width * 0.7, height: width * 0.7, resizeMode: 'contain'},
});
