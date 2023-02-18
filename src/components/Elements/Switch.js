import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated,{runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { AppStyle } from '../../assets/style';
const Style = StyleSheet.create({
  slide: {backgroundColor: AppStyle.color.backgroundColor, borderRadius: 8, shadowOpacity: 0.1, shadowColor: "#C4C4C4", shadowOffset: {width: 1, height: 1}, elevation: 3, height: 8}
});
export default ({width = 30, size = 18, value = false, onChangeValue = (state) => {}, dotStyle, slideStyle, containerStyle}) => {
    const x = useSharedValue(value? width - size : 0);
    const [state, setState] = React.useState(value);
    React.useEffect(() => {
      onChangeValue(state);
    }, [state]);
    const pressed = useSharedValue(false);
    const sendState = (bool) => {
        setState(bool);
    }
    const eventHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
          pressed.value = true;
          ctx.startX = x.value > (width - size)? (width - size) : x.value < 0? 0 : x.value;
        },
        onActive: (event, ctx) => {
          x.value = ctx.startX + event.translationX;
        },
        onEnd: (event, ctx) => {
          pressed.value = false;
          x.value = x.value > (width / 2) - (size / 2)? (width - size) : 0;
          runOnJS(sendState)(!x.value == 0);
        },
      });
    const uas = useAnimatedStyle(() => {
        return {
          backgroundColor: x.value==0 ? AppStyle.color.brown : AppStyle.color.red,
          transform: [{ translateX: x.value > (width - size)? (width - size) : x.value < 0? 0 : x.value }],
        };
      });
    return <View style={[containerStyle, {width: width, justifyContent: "center", alignSelf: "flex-start"}, Style.slide]}>
        <PanGestureHandler onGestureEvent={eventHandler}>
            <Animated.View style={[dotStyle, {width: size, height: size, borderRadius: size}, uas]} />
        </PanGestureHandler>
    </View>
}