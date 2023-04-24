import { StyleSheet } from 'react-native';
import { Colors } from '../../config';

export const LocalRestaurantScreenStyles = StyleSheet.create({
  layout: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 24,
    marginVertical: 16,
  },
  text: { padding: 16, color: Colors.primary },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notFound: { display: 'flex', alignItems: 'center', marginTop: 80 },
  container: {
    position: 'absolute',
    top: '50%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },
});
