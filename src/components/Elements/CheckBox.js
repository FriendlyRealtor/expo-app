import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Style } from "./Style/checkbox";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default({label, labelStyle, containerStyle, onPress = () => {}, onChangeState = (state) => {}, size, visible}) => {
    const [check, setCheck] = React.useState(visible? visible : check);
    React.useEffect(()=>{
        onChangeState(check == undefined? false : check);
    },[check])
    React.useEffect(() => {
        setCheck(visible);
    }, [visible]);
    return <View style={[Style.container, containerStyle]}>
        <View style={[Style.checkboxContainer, {width: size? size : 25, height: size? size : 25, backgroundColor: check? "black" : "white"}]}>
            <TouchableOpacity onPress={() => {
                setCheck(!check);
                onPress(check);
            }}>
                <MaterialCommunityIcons name='check-bold' size={20} color={'white'} />
            </TouchableOpacity>
        </View>
        <Text style={[Style.label, labelStyle]}>
            {
                label
            }
        </Text>
    </View>
}