import * as React from 'react';
import { View, Text, Dimensions, FlatList, Image, StyleSheet, FlatListProps } from 'react-native';
import { AppStyle } from '../../../assets/style';
import { icons } from '../../../assets/icons';
const {width} = Dimensions.get("window");
const Style = StyleSheet.create({
    iconVerify: {width: width * 0.05, height: width * 0.05, resizeMode: "contain", ...AppStyle.style.marginRight},
    textDot: {width: width * 0.05, textAlign: "center", ...AppStyle.style.marginBottom}
})
export default ({trackOrder, ...FlatListProps}) => {
    const renderItem = ({item, index}) => {
        return <View style={[AppStyle.style.marginHorizontalLarge]}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Image source={icons.verify} style={[Style.iconVerify, {opacity: index < trackOrder.realtime.length - 1 ? 0.6 : 1}]} />
                <View style={[{flex: 1}, AppStyle.style.marginRight]}>
                    <Text style={[AppStyle.style.p, {fontWeight: "normal"}]}>{item.title}</Text>
                    <Text style={[{color: "gray", fontSize: 13}]}>{item.subTitle}</Text>
                </View>
                {
                    item.endTrack? <Text style={[AppStyle.style.p, {color: AppStyle.color.green}]}>
                        Confirmed
                    </Text> :
                    <Text>
                        {item.time}
                    </Text>
                }
            </View>
            {
                index < trackOrder.realtime.length - 1? <>
                    <Text style={Style.textDot}>.</Text>
                    <Text style={Style.textDot}>.</Text>
                </> : null
            }
        </View>
    }
    const header = React.useCallback(() => <View style={AppStyle.style.marginHorizontalLarge}> 
        <View style={[{flexDirection: "row"},  AppStyle.style.marginBottom]}>
            <Text style={[AppStyle.style.p, {flex: 1}]}>{trackOrder.date}</Text>
            <Text style={[AppStyle.style.p]}>Amt: ${trackOrder.total}</Text>
        </View>
        <Text style={[AppStyle.style.p, AppStyle.style.marginBottomLarge]}>Order Number: <Text style={{color: "gray"}}>#{trackOrder.orderNumber}</Text></Text>
        <Text style={[AppStyle.style.h5, {fontWeight: "normal"}]}>ETA: <Text style={{color: AppStyle.color.gray}}>{trackOrder.eta}</Text></Text>
    </View>, [])
    return trackOrder? (<View style={[AppStyle.style.marginBottomLarge]}>
        <FlatList 
            data={trackOrder.realtime}
            keyExtractor={(item, index) => `realtime-${index}`}
            renderItem={renderItem}
            ListHeaderComponent={header}
            ListFooterComponentStyle={AppStyle.style.marginTopLarge}
            ListHeaderComponentStyle={AppStyle.style.marginVerticalLarge}
            showsVerticalScrollIndicator={false}
            {...FlatListProps}
        
        />
     </View>) : null
}