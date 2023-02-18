import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppStyle } from '../../../assets/style';
import { cardNo as convertCardNo } from '../../../helper/utils/FormatUtils';
export default ({card, onChangePress = () => {}}) => { 
    return <View style={[AppStyle.style.marginTop]}>
        <View style={[{ flexDirection: "row"}, AppStyle.style.marginBottom]}>
            <View style={{ flex: 1 }}>
                <Text style={[AppStyle.style.p]}>
                    {card?.holder}
                </Text>
                {
                    card?.email? <Text style={[AppStyle.style.p, { opacity: 0.5 }]}>
                        {card?.email}
                    </Text> : null
                }
                {
                    card?.phone? <Text style={[AppStyle.style.p, AppStyle.style.marginBottom, { opacity: 0.5 }]}>
                        {card.phone}
                    </Text> : null
                }
                <View style={[AppStyle.style.paddingTop]}>
                    {
                        card?.cardNo? <View style={[{ flexDirection: "row" }, AppStyle.style.marginBottom]}>
                            <Text style={{ flex: 1 }}>Card No</Text>
                            <Text>:</Text>
                            <Text style={[{ flex: 2, textAlign: "right" }, { opacity: 0.5 }]}>{convertCardNo(card.cardNo)}</Text>
                        </View> : null
                    }
                    {
                        card?.expire? <View style={{ flexDirection: "row" }}>
                            <Text style={{ flex: 1 }}>Exp.Date</Text>
                            <Text>:</Text>
                            <Text style={[{ flex: 2, textAlign: "right" }, { opacity: 0.5 }]}>{card.expire}</Text>
                        </View> : null
                    }
                </View>
            </View>
            
            <TouchableOpacity activeOpacity={0.8} onPress={onChangePress}>
                <Text style={[{ color: AppStyle.color.red, fontSize: 13 }]}>Change</Text>
            </TouchableOpacity>
        </View>
        
    </View> 
}