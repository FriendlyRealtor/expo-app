import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { default as Input } from '../Elements/Input';
import { Style } from '../../assets/style/login';
import {icons} from '../../assets/icons/index';
import { AppStyle } from '../../assets/style';
const width = Dimensions.get('window').width;
export default ({isSubmit}) =>{
    const [error, setError] = React.useState(null);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    return <View style={[{ width: width}, AppStyle.style.paddingHorizontalLarge]}>
            <View style={[Style.note, Style.containerCamera]}>
                <Image source={icons.camera} style={{width: width * 0.1, height: width * 0.1, resizeMode: 'contain'}} />
            </View>
            <View style={{flexDirection: 'row', width: '100%'}}>
                <Input
                    label="First Name*"
                    value={firstName}
                    changeValue={(text) => setFirstName(text)}
                    containerStyle={{flex: 1, marginRight: width * 0.01}}
                    inputContainerStyle={Style.inputContainer}
                    labelStyle={{ color: 'white' }}
                    inputStyle={{ color: 'white' }}
                />
                <Input
                    label="Last Name*"
                    value={lastName}
                    changeValue={(text) => setLastName(text)}
                    containerStyle={{flex: 1, marginLeft: width * 0.01}}
                    inputContainerStyle={[Style.inputContainer]}
                    labelStyle={{ color: 'white' }}
                    inputStyle={{ color: 'white' }}
                />
            </View>
            <Input
                label="Mobile Number*"
                value={phone}
                changeValue={(text) => setPhone(text)}
                inputContainerStyle={Style.inputContainer}
                labelStyle={{ color: 'white' }}
                inputStyle={{ color: 'white' }}
                keyboardType={'numeric'}
            />

        </View>
}