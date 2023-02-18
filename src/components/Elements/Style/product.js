import { Dimensions, StyleSheet } from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: width * 0.5,
        borderRadius: 10,
        backgroundColor: "black"
    },
    title: {
        textAlign: 'left',
        marginVertical: 5,
        fontSize: 13
    },
    bottomBar: {
        flexDirection: 'row',
    },
    borderBottomProduct: {height: 1, width: width * 0.2, backgroundColor: 'rgba(0,0,0,0.3)'}
});