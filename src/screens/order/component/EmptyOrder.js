import * as React from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { default as Button } from '../../../components/Elements/Button';
import { AppStyle } from '../../../assets/style';
import { icons } from '../../../assets/icons';
const width = Dimensions.get('window').width;
export default ({onBackPress}) => {
    return <View style={[AppStyle.style.middle, AppStyle.style.paddingHorizontal, {paddingVertical: width * 0.25}]}>
        <Image source={icons.emptyOrder} style={{width: width * 0.6, height: width * 0.6, resizeMode: "contain"}} />
        <Text style={[AppStyle.style.h5, AppStyle.style.marginVerticalLarge]}>
            {'There is no Current Orders'.toUpperCase()}
        </Text>
        <Text style={[{textAlign: "center", color: AppStyle.color.gray}, AppStyle.style.p, AppStyle.style.marginBottomLarge]}>
            {'You don’t have any active Order. Please make sure you have switch on your Available to receive Order.'}
        </Text>
        <Button onPress={onBackPress} label={"Go Back"} />
    </View>
}