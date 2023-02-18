import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
    containerCheckout: { paddingTop: width * 0.05},
    cartItemContainer: {flex: 1, flexDirection: "row", backgroundColor: "#f9f9f9", borderBottomColor: "#C4C4C470", borderBottomWidth: 1, overflow: "hidden"},
    cartItemImageContainer: {width: width * 0.25, height: width * 0.25, backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 15, shadowColor: "#C4C4C4", shadowOffset: {width: 3, height: 3}, shadowOpacity: 0.6, elevation: 15, marginTop: 15},
    cartItemImage: {width: "100%", height: "100%", resizeMode: "cover", borderRadius: 15},
    colorChange: {
        color: "#EC5858"
    },
    rightButton: { backgroundColor: "#F9f9f9", shadowOpacity: 0, elevation: 0, alignItems: "center", justifyContent: "center" }
});