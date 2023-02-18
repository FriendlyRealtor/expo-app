import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { AppStyle } from '../../assets/style';
const width = Dimensions.get('window').width;
export default ({ moneyTotal=0, shippingFee=0, estimatingTax=0, discount=0 }) => {

    const renderShowCartDetail = (title, money, type) => {
        return <View style={{ flexDirection: "row", marginBottom: width * 0.03 }}>
            <Text style={{ ...AppStyle.style.p, flex: 1 }}>{title}:</Text>
            <Text style={{ ...AppStyle.style.p, flex: 1, textAlign: "right", color: type == 1 ? "#EC5858" : "black" }}>{type == 1 ? "-" : ""} ${money ? money : 0}</Text>
        </View>
    }
    const total = () => {
        let tl = eval(`${moneyTotal ? moneyTotal : 0} + ${shippingFee ? shippingFee : 0} + ${estimatingTax ? estimatingTax : 0} - ${discount}`);
        return tl;
    }

    return <>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#97979740"}}>
            {
                renderShowCartDetail("Sub Total", moneyTotal, 0)
            }
            {
                renderShowCartDetail("Shipping Fee", shippingFee, 0)
            }
            {
                renderShowCartDetail("Coupon Code", discount, 1)
            }
            {
                renderShowCartDetail("Estimating Tax", estimatingTax, 0)
            }
        </View>
        <View style={{ flexDirection: "row", marginVertical: width * 0.03 }}>
            <Text style={{ ...AppStyle.style.h5, flex: 1 }}>Total:</Text>
            <Text style={{ ...AppStyle.style.h5, flex: 1, textAlign: "right" }}>${total()}</Text>
        </View>
    </>
}