import {Dimensions, StyleSheet} from 'react-native';
import { AppStyle } from '.';
const width = Dimensions.get('window').width;
export const Style = StyleSheet.create({
    avatar: { alignSelf: "center",},
    avatarContainer: (theme) => ({borderWidth: 2, borderColor: theme.colors.active, alignSelf: 'center', padding: 5, borderRadius: width, marginBottom: 15}),
    icons: {width: 18, height: 18, resizeMode: "contain"},
    sexButtonLeft: { height: 50, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: AppStyle.color.lightGray, borderTopRightRadius: 0, borderBottomRightRadius: 0, flex: 1 },
    sexButtonRight: { height: 50, borderTopRightRadius: 8, borderBottomRightRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: AppStyle.color.lightGray, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, flex: 1 },
    sexButtonMiddle: { height: 50, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderColor: AppStyle.color.lightGray, borderRadius: 0, flex: 1 },
    selectedSexButton: (sex, label) => {
        return {backgroundColor: sex == label?  AppStyle.color.backgroundColor : AppStyle.color.mainColor, borderColor: sex == label? AppStyle.color.backgroundColor : AppStyle.color.lightGray}
    }
})