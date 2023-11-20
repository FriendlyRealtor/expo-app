import { StyleSheet } from 'react-native';
import { Colors } from '../../config';

export const SettingScreenStyles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  delete: {
    color: Colors.red,
  },
  top: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginTop: 24,
  },
  textView: {
    justifyContent: 'center',
  },
  rows: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 24,
  },
  listItem: {
    maxHeight: 400,
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
