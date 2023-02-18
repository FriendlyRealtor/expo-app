import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
    containerStyle: {paddingVertical: width * 0.05},
    containerRadio: {borderRadius: 50, borderWidth: 2, width: 25, height: 25, padding: 3, marginLeft: width * 0.05},
    backgroundRadio: {flex: 1, backgroundColor: "black", borderRadius: 50, opacity: 0}
});