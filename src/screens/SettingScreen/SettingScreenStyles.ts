import { StyleSheet } from 'react-native';
import { Colors } from '../../config';

export const SettingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
	input: {
		width: 200,
	},
  top: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  textView: {
    justifyContent: 'center',
  },
  layout: {
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 24,
    backgroundColor: Colors.lightGray,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 24,
    justifyContent: 'space-between',
    paddingRight: 16,
    marginHorizontal: 24,
  },
});
