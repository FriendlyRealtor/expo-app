import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
  backgroundColor: {backgroundColor: '#F9E0AE'},
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: width * 0.03,
    alignItems: 'center',
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginRight: width * 0.03,
    fontSize: 15,
    color: 'black',
    height: '100%',
    padding: 0,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: width * 0.05,
  },
  imageContentContainer: {
    backgroundColor: '#682C0E50',
    paddingHorizontal: width * 0.05,
    height: width * 0.35,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  trendContainer: {
    flexDirection: 'row',
    marginRight: width * 0.05,
    marginBottom: width * 0.05,
  },
  imageTrendsContainer: {
    width: width * 0.2,
    height: width * 0.2,
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginRight: width * 0.03,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
