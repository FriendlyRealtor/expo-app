import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {icons} from '../../assets/icons';
import {AppStyle} from '../../assets/style';
const Style = StyleSheet.create({
  container: {
    ...AppStyle.style.marginHorizontalLarge,
  },
  button: {
    borderRadius: 5,
    backgroundColor: AppStyle.color.white,
    shadowColor: AppStyle.color.gray,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.1,
    elevation: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ({
  title = '',
  items = [],
  createdMode = 0,
  onItemPress = item => {},
  containerStyle,
  footer = () => <></>,
}) => {
  const [selected, setSelected] = React.useState(createdMode);
  const [choose, setChoose] = React.useState(-1);
  const toValue = items.length * 50;
  const dropwdownHandle = useSharedValue(createdMode == 0 ? 0 : toValue);
  const onPressLabel = () => {
    dropwdownHandle.value = withTiming(selected == 0 ? toValue : 0, {
      duration: 300,
    });
    setSelected(selected == 0 ? 1 : 0);
  };
  const dropdownStyle = useAnimatedStyle(() => {
    'worklet';
    return {maxHeight: dropwdownHandle.value};
  });
  return (
    <View style={[Style.container, containerStyle]}>
      <TouchableOpacity
        onPress={onPressLabel}
        activeOpacity={0.8}
        style={[
          AppStyle.style.paddingVerticalLarge,
          AppStyle.style.paddingHorizontal,
          Style.button,
        ]}
      >
        <Text style={[{flex: 1}, AppStyle.style.h5]}>{title}</Text>
        <Image
          source={icons.selector}
          style={{width: 15, height: 19, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
      <Animated.View style={[{width: '100%'}, dropdownStyle]}>
        {items.map((item, index) => {
          return (
            <View
              key={`${title}-${item.title}`}
              style={[AppStyle.style.marginTop]}
            >
              <TouchableOpacity
                onPress={() => {
                  onItemPress(item);
                  setChoose(index);
                }}
              >
                <Text
                  style={[
                    {
                      color:
                        choose == index
                          ? AppStyle.color.black
                          : AppStyle.color.gray,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </Animated.View>
      {footer ? footer() : null}
    </View>
  );
};
