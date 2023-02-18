import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Style } from "./Style/checkbox";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default({color, containerStyle, onPress = () => {}, size, visible}) => {
    const [check, setCheck] = React.useState(visible? visible : check);
    React.useEffect(() => {
        setCheck(visible);
    }, [visible]);
    return <View style={[Style.container, containerStyle]}>
        <View style={[Style.checkboxContainer, Style.shadowContainer, {width: size? size : 25, height: size? size : 25, backgroundColor: color}]}>
            <TouchableOpacity style={{width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}} onPress={() => {
                setCheck(!check);
                onPress();
            }}>
                {
                    check? <MaterialCommunityIcons name='check-bold' size={25} color={'white'} /> : null
                }
            </TouchableOpacity>
        </View>
    </View>
}