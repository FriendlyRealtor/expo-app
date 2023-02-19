import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppStyle} from '../../assets/style';
import {Style} from './Style/radioCard';
const width = Dimensions.get('window').width;
export default ({
  title,
  subTitles = [],
  containerStyle,
  titleStyle,
  visible = false,
  onChange = () => {},
  child = () => <View></View>,
  footer = () => <></>,
  onLongPress = () => {},
  hiddenRadio = false,
  disable = false,
}) => {
  const [status, setStatus] = React.useState(visible);
  const radioHandle = useSharedValue(1);

  const radioStyle = useAnimatedStyle(() => {
    'worklet';
    return {transform: [{scale: radioHandle.value}]};
  });

  React.useEffect(() => {
    radioHandle.value = withTiming(hiddenRadio ? 0 : 1, {duration: 300});
  }, [hiddenRadio]);

  React.useEffect(() => {
    setStatus(visible);
  }, [visible]);
  const handle = () => {
    if (!disable) {
      onChange(!status);
      setStatus(!status);
    }
  };
  return (
    <View
      style={[Style.containerStyle, {padding: width * 0.05}, containerStyle]}
    >
      <TouchableOpacity
        onPress={handle}
        activeOpacity={0.8}
        onLongPress={onLongPress}
      >
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text
              style={[
                AppStyle.style.p,
                {fontWeight: 'normal', flex: 1},
                titleStyle,
              ]}
            >
              {title}
            </Text>
            {subTitles
              ? subTitles.map((value, index) => (
                  <View
                    key={`subTitle-${value}-${index}`}
                    style={{width: '70%'}}
                  >
                    <Text
                      style={[
                        {
                          fontSize: 14,
                          color: 'gray',
                          marginBottom: width * 0.015,
                        },
                      ]}
                    >
                      {value}
                    </Text>
                  </View>
                ))
              : null}
            {child ? child() : null}
          </View>
          <Animated.View style={[Style.containerRadio, radioStyle]}>
            <View
              style={[Style.backgroundRadio, {opacity: status ? 1 : 0}]}
            ></View>
          </Animated.View>
        </View>
        {footer ? footer() : null}
      </TouchableOpacity>
    </View>
  );
};
