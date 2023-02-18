import * as React from 'react';
import { View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { default as RadioCard } from './RadioCard';
import { default as CheckBox } from './CheckBox';
import { AppStyle } from '../../assets/style';
export default (props) => {
    const { subTitles = [], title, visible = false, onLongPress = () => { }, onChange=(state) => {}, mode=false, onChecked = (state) => {}, children, checkBoxVisible=false} = props;
    const animatedCheckbox = useSharedValue(0);
    const checkBoxStyle = useAnimatedStyle(() => {
        'worklet';
        const scale = interpolate(animatedCheckbox.value, [0, 45], [0, 1]);
        return {width: animatedCheckbox.value, opacity: scale, transform: [{scale: scale}]}
    });
    React.useEffect(() => {
        animatedCheckbox.value = withTiming(mode? 45 : 0, {duration: 300});
    }, [mode]);
    return <View style={{flexDirection: "row", margin: -15, padding: 17}}>
        <Animated.View style={[{alignItems: "flex-start", height: 55}, checkBoxStyle]}>
            <CheckBox visible={checkBoxVisible} onChangeState={onChecked} />
        </Animated.View>
        <View style={[AppStyle.style.groupContainer,AppStyle.style.marginBottomLarge, AppStyle.style.nonePadding, {flex: 1}]}>
            <RadioCard
                hiddenRadio={mode ? true : false}
                visible={visible}
                subTitles={subTitles}
                child={() => children? children : <></>}
                onChange={onChange}
                title={title}
                onLongPress={onLongPress}
                disable={mode? true : false}
            />
        </View>
    </View>
}