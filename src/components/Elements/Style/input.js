import {StyleSheet, Dimensions} from 'react-native';
import {AppStyle} from '../../../assets/style';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 8,
  },
  input: {
    height: 30,
    fontSize: 15,
    color: AppStyle.color.black,
    ...AppStyle.style.padding,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 13,
    marginVertical: 5,
  },
  error: {
    color: AppStyle.color.red,
    fontSize: 13,
    paddingHorizontal: 5,
    paddingTop: 3,
  },
});
