import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: width * 0.03
    }, 
    checkboxContainer: {
       borderWidth: 2, borderRadius: 5
    },
    label: {
        fontSize: 15,
        marginLeft: width * 0.01
    },
    shadowContainer: {
        borderWidth: 0, shadowOpacity: 0.8, elevation: 2, shadowColor: "#C4C4C4", shadowOffset: {width: 2, height: 2}
    }
});