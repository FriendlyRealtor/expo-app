import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },  
    backgroundColor: {
        backgroundColor: '#682C0E80',
    },
    color: {
        color: "white",
        fontWeight: 'normal'
    },
    form: {flex: 1, width: '100%', paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' },
    inputContainer: {borderColor: 'white', backgroundColor: '#682C0E20', borderWidth: 1},
    note: {padding: 4, borderWidth: 1, borderColor: 'white', borderRadius: 30},
    containerCamera: { borderRadius: 8, width: width * 0.2, height: width * 0.2, marginBottom: width * 0.02, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}
});