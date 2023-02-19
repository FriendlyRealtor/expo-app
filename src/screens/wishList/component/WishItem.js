import * as React from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {AppStyle} from '../../../assets/style';
import {Style} from '../../../assets/style/cart';
import {icons} from '../../../assets/icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import Button from '../../../components/Elements/Button';
import {IconButton, useTheme} from 'react-native-paper';
const width = Dimensions.get('window').width;
const HEIGHT_ITEM = width * 0.25 + 30;
export default ({item, onDeleteItem = () => {}, onAddToBag = () => {}}) => {
  const theme = useTheme();
  const containerHandle = useSharedValue(0);
  const heightContainerHandle = useSharedValue(HEIGHT_ITEM);
  const containerStyle = useAnimatedStyle(event => {
    'worklet';
    const translateX = interpolate(containerHandle.value, [0, 1], [0, -500]);
    return {
      transform: [{translateX: translateX}],
      height: heightContainerHandle.value,
    };
  });
  const rightButtonstyle = useAnimatedStyle(() => {
    'worklet';
    return {transform: [{scale: containerHandle.value ? 0 : 1}]};
  });

  const close = () => {
    containerHandle.value = withTiming(1, {duration: 300});
    heightContainerHandle.value = withTiming(0, {duration: 300}, finished => {
      if (finished) runOnJS(onDeleteItem)();
    });
  };
  const rightButton = (progress, dragX) => (
    <Animated.View
      style={[
        Style.cartItemImageContainer,
        Style.rightButton,
        rightButtonstyle,
      ]}
    >
      <IconButton
        onPress={close}
        icon="close-circle"
        size={60}
        color={theme.colors.active}
      />
    </Animated.View>
  );

  return (
    <Swipeable renderRightActions={rightButton}>
      <Animated.View style={[Style.cartItemContainer, containerStyle]}>
        <View style={Style.cartItemImageContainer}>
          <Image source={item.image} style={Style.cartItemImage} />
        </View>
        <View style={{flex: 1, paddingHorizontal: width * 0.03, marginTop: 15}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={[AppStyle.style.p, {flex: 1}]}>{item.name}</Text>
            {item.size ? (
              <Text style={{marginLeft: width * 0.03}}>{item.size}, </Text>
            ) : null}
            {item.color ? <Text>{item.color}</Text> : null}
          </View>
          <Button
            containerStyle={[{paddingVertical: 0}]}
            style={{
              alignSelf: 'flex-end',
              marginBottom: 15,
              borderRadius: 5,
              backgroundColor: 'black',
            }}
            label={'ADD TO BAG'}
            labelStyle={{color: 'white', fontSize: 13}}
            onPress={onAddToBag}
          />
        </View>
      </Animated.View>
    </Swipeable>
  );
};
