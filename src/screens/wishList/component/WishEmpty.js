import React from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { default as Button } from '../../../components/Elements/Button';
import { AppStyle } from '../../../assets/style';
import { images } from '../../../assets/images/wish';
const { height } = Dimensions.get("window");
export default ({ onBackPress = () => { } }) => {
    return <View style={[{flex: 1, height: height - 115}, AppStyle.style.contentMiddle]}>
        <Image source={images.empty} style={[AppStyle.style.imageEmptyLarge, AppStyle.style.marginBottomLarge]} />
        <Text style={[AppStyle.style.h5, AppStyle.style.marginBottomLarge]}>{'Your Wishlist is Emp'.toUpperCase()}</Text>
        <Text style={[AppStyle.style.p, { textAlign: "center", color: AppStyle.color.gray }, AppStyle.style.marginBottomLarge]}>Add Items to you Wishlist. Review them anytime and them to the Bag.</Text>
        <Button label={"Add Items"} onPress={onBackPress} style={{width: '100%'}} />
    </View>
}