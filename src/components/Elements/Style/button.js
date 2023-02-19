import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
  container: {
    borderRadius: 30,
    paddingVertical: 8,
  },
  label: {
    fontSize: 15,
  },
});
