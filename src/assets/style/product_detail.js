import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
  name: {fontWeight: 'normal', marginBottom: width * 0.03},
  starContainer: {flex: 1, flexDirection: 'row', marginBottom: width * 0.03},
  iconStar: {width: 24, height: 24, resizeMode: 'contain', marginRight: 8},
  buttonCountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  moreDetailContainer: {flexDirection: 'row', marginTop: width * 0.03},
  moreDetailTitle: {fontSize: 13, flex: 1, marginRight: width * 0.03},
  moreDetailValue: {fontSize: 13, flex: 1},
  groupCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
  },
  selectWidgetContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: width * 0.03,
    borderRadius: 5,
    shadowColor: '#c4c4c4',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    elevation: 1,
  },
});
