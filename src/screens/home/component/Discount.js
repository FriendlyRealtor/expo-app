import * as React from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';
import { AppStyle } from '../../../assets/style';
import { Style } from '../../../assets/style/home';
const width = Dimensions.get('window').width;
export default ({data}) => {
    return <View style={[AppStyle.style.paddingHorizontalLarge, AppStyle.style.paddingBottomLarge]}>
        {
            data.map((value, index) => <ImageBackground key={`discount-${index}-${value.id}`} source={value.image != undefined? value.image : null} style={Style.imageContainer} imageStyle={{ opacity: 0.5 }}>
            <View style={Style.imageContentContainer}>
                <Text style={[AppStyle.style.p, {
                    color: 'white',
                }]}>{value.description}</Text>
                <Text style={[AppStyle.style.h4, {
                    color: 'white',
                    fontWeight: 'normal'
                }]}>{value.title}</Text>
            </View>
        </ImageBackground> )
        }
        <View style={{width: '100%'}}>

        </View>
    </View>
}