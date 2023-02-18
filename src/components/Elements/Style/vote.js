import {StyleSheet, Dimensions} from 'react-native';
import { AppStyle } from '../../../assets/style';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
    container: {
        width: '100%'
    }, 
    star: {
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: "contain"
    }
});