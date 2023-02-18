import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { AppStyle } from '../../../assets/style';
export default ({ delivery }) => {
    return (<View style={[AppStyle.style.groupContainer, AppStyle.style.paddingLarge, AppStyle.style.marginBottomLarge]}>
        <View style={{ flexDirection: "row", ...AppStyle.style.marginBottomLarge }}>
            <Text style={[AppStyle.style.p, { fontWeight: "normal", flex: 1 }]}>DELIVERY ADDRESS</Text>
        </View>
        {
            delivery? <View style={{width: "70%"}}>
                <Text style={{ ...AppStyle.style.marginBottom, color: "black" }}>
                    {
                        delivery.name
                    }
                </Text>
                <Text style={{ ...AppStyle.style.marginBottom, color: "black", opacity: 0.5 }}>
                    {
                        delivery.address
                    }
                </Text>
                <Text style={{ ...AppStyle.style.marginBottom, color: "black", opacity: 0.5 }}>
                    {
                        delivery.phone
                    }
                </Text>
            </View> : <View>
                <Text style={[{ color: AppStyle.color.red }, AppStyle.style.p]}>Do you need a delivery address?</Text>
            </View>
        }
    </View>)
}