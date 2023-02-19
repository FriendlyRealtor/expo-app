import * as React from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {default as Product} from '../../../components/Elements/Product';
import {AppStyle} from '../../../assets/style';
import {icons} from '../../../assets/icons';
import {RouteName} from '../../../helper/RouteName';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/core';
const width = Dimensions.get('window').width;
const style = StyleSheet.create({
  widgetContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: AppStyle.color.brown + '80',
    borderRadius: 10,
  },
  widgetIcon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
export default ({item, index}) => {
  const [showWidget, setShowWidget] = React.useState(false);
  const opacityWidgetAnimated = useSharedValue(0);
  const navigation = useNavigation();
  React.useEffect(() => {
    opacityWidgetAnimated.value = showWidget ? 1 : 0;
  }, [showWidget]);
  const styleWidget = useAnimatedStyle(() => {
    'worklet';
    return {opacity: withTiming(opacityWidgetAnimated.value, {duration: 300})};
  });
  const selectWidgetReOrder = () => {
    setShowWidget(false);
    navigation.navigate(RouteName.ProductDetail, {item: item});
  };
  const selectWidgetWriteReview = () => {
    setShowWidget(false);
    navigation.navigate(RouteName.WriteReview, {item: item});
  };
  return (
    <Product
      item={item}
      index={index}
      onPress={() => setShowWidget(!showWidget)}
      imageChild={() => (
        <Animated.View
          style={[
            styleWidget,
            style.widgetContainer,
            AppStyle.style.middle,
            {zIndex: showWidget ? 2 : -2},
          ]}
        >
          <TouchableOpacity
            onPress={selectWidgetReOrder}
            style={[AppStyle.style.marginBottomLarge]}
          >
            <Image source={icons.reOrder} style={style.widgetIcon} />
            <Text style={[AppStyle.style.p, {color: AppStyle.color.white}]}>
              Reorder
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={selectWidgetWriteReview}>
            <Image source={icons.writeReviewer} style={style.widgetIcon} />
            <Text style={[AppStyle.style.p, {color: AppStyle.color.white}]}>
              Write a Review
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    />
  );
};
