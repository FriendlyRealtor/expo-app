import React from 'react';
import { View, TouchableOpacity, BackHandler, StyleSheet, Modal } from 'react-native';
import Animated, { interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
export default ({ children = () => <View></View>, visible = false, onClose = () => { } }) => {
    const containerHandle = useSharedValue(0);
    const containerChildHandle = useSharedValue(0);
    const containerStyle = useAnimatedStyle(() => {
        'worklet';
        const backgroundColor = interpolateColor(containerHandle.value, [0, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0.0)"])
        return {transform: [{scale: containerHandle.value}], opacity: containerHandle.value, backgroundColor: backgroundColor}
    }, []);

    const childAnimation = (value) => {
        containerChildHandle.value = withTiming(value, {duration: 400});
    }

    const containerAnimation = (value) => {
        containerHandle.value = withTiming(value, {duration: 0});
    }

    const containerChildStyle = useAnimatedStyle(() => {
        'worklet';
        const transformY = interpolate(containerChildHandle.value, [0, 1], [1500, 0]);
        return {transform: [{translateY: transformY}]}
    });

    React.useEffect(() => {
        if(visible)
        {
            containerHandle.value = withTiming(1, {duration: 0}, (finished) => {
                if(finished)
                    runOnJS(childAnimation)(1);
            });
        }
        else {
            containerChildHandle.value = withTiming(0, {duration: 400}, (finished) => {
                if(finished)
                    runOnJS(containerAnimation)(0);
            });
        }
    }, [visible]);

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            onClose();
        });
    }, []);
   
    return <Animated.View style={[{flex: 1, position: "absolute", top: 0, bottom: 0, right: 0, left: 0, zIndex: 9999}, containerStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>

        </TouchableOpacity>

        <Animated.View style={[{ width: "100%", position: "absolute", bottom: 0 }, containerChildStyle]}>
            {
                children? children : null
            }
        </Animated.View>
    </Animated.View>
}