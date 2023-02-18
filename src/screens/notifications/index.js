import React from 'react';
import { View, Text } from 'react-native';
import { AppStyle } from '../../assets/style';
import { default as Switch } from '../../components/Elements/Switch'; 
import { default as Layout } from '../../components/Layout/Home';
export default ({navigation, route}) => {
    const [enableAll, setEnableAll] = React.useState(false);
    const [social, setSocial] = React.useState(true);
    const [promos, setPromos] = React.useState(false);
    const [order, setOrder] = React.useState(true);
    return <Layout containerStyle={AppStyle.style.marginLarge}>
        <View style={[AppStyle.style.groupContainer, AppStyle.style.paddingLarge, AppStyle.style.marginBottom, {flexDirection: "row"}]}>
            <View style={[{flex: 1}, AppStyle.style.marginRightLarge]}>
                <Text style={[AppStyle.style.h5, AppStyle.style.marginBottom]}>Enable All</Text>
                <Text style={[AppStyle.style.p, {color: AppStyle.color.gray}]}>Tap to Receive all Notifications</Text>
            </View>
            <Switch value={enableAll} onChangeValue={(state) => setEnableAll(state)} />
        </View>
        <View style={[AppStyle.style.groupContainer, AppStyle.style.paddingLarge, AppStyle.style.marginBottom, {flexDirection: "row"}]}>
            <View style={[{flex: 1}, AppStyle.style.marginRightLarge]}>
                <Text style={[AppStyle.style.h5, AppStyle.style.marginBottom]}>Social Notifications</Text>
                <Text style={[AppStyle.style.p, {color: AppStyle.color.gray}]}>Get Notified when someone follows your Profile, or when you get likes & comments.</Text>
            </View>
            <Switch value={social} onChangeValue={(state) => setSocial(state)} />
        </View>
        <View style={[AppStyle.style.groupContainer, AppStyle.style.paddingLarge, AppStyle.style.marginBottom, {flexDirection: "row"}]}>
            <View style={[{flex: 1}, AppStyle.style.marginRightLarge]}>
                <Text style={[AppStyle.style.h5, AppStyle.style.marginBottom]}>Promos and Offers</Text>
                <Text style={[AppStyle.style.p, {color: AppStyle.color.gray}]}>Receive Coupons, Promotions & Money Saving Offers</Text>
            </View>
            <Switch value={promos} onChangeValue={(state) => setPromos(state)} />
        </View>
        <View style={[AppStyle.style.groupContainer, AppStyle.style.paddingLarge, AppStyle.style.marginBottom, {flexDirection: "row"}]}>
            <View style={[{flex: 1}, AppStyle.style.marginRightLarge]}>
                <Text style={[AppStyle.style.h5, AppStyle.style.marginBottom]}>Orders and Purchases</Text>
                <Text style={[AppStyle.style.p, {color: AppStyle.color.gray}]}>Receive Updates related to order status, Membership, table booking & more</Text>
            </View>
            <Switch value={order} onChangeValue={(state) => setOrder(state)} />
        </View>
        
    </Layout>
}