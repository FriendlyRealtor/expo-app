import React from 'react';
import { Text} from 'react-native';
import { Button } from 'react-native-paper';
import { Style } from './Style/button';
export default({label, labelStyle, containerStyle, onPress=()=>{}, style}) => {
    return <Button labelStyle={[{fontWeight: 'normal', fontSize: 16, letterSpacing: 0.1}, labelStyle]} compact={false} uppercase={false} onPress={onPress} contentStyle={[Style.container, containerStyle]} style={[{ borderRadius: 30}, style]} mode="contained" >
        <Text>{label != undefined? label : ''}</Text>
    </Button>
}