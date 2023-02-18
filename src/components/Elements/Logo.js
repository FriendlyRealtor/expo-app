import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { AppStyle } from '../../assets/style';
export default() => {
    const theme = useTheme();
    return  <View style={[AppStyle.style.contentMiddle]}>
        <View style={{ alignItems: 'center' }}>
            <Text style={[AppStyle.style.h1, { color: theme.colors.logoColor }]}>Stylorium</Text>
            <Text style={[AppStyle.style.h5, { color: theme.colors.logoColor }]}>Online Shopping App</Text>
        </View>
    </View>
}