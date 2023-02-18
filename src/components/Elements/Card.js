import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated,{ SlideInLeft } from 'react-native-reanimated';
const Style = StyleSheet.create({
    container: {marginHorizontal: -15, paddingHorizontal: 17}
})
export default({index = 0, containerStyle, buttonContainer, titleStyle, title="title", leftChild = () => <></>, rightChild = () => <></>, onPress = () => {} }) => {
    
    return <View style={Style.container}>
        <Animated.View  entering={SlideInLeft.duration(index * 300)} 
            style={[containerStyle]}
            >
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[{flexDirection: "row"}, buttonContainer]}>
                {
                    leftChild()
                }
                <Text style={[titleStyle]}>{title}</Text>
                {
                    rightChild()
                }
            </TouchableOpacity>
        </Animated.View>
    </View>
}