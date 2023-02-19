import React from 'react';
import {View, Image} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';
import {Style} from './Style/Slider';
export default React.forwardRef(({images, onChangePosition = x => {}}, ref) => {
  const scrollRef = React.useRef();
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
    runOnJS(onChangePosition)(event.contentOffset.x);
  });
  React.useEffect(() => {
    scrollRef?.current?.scrollTo({x: 0, y: 0, animated: false});
  }, [images]);

  return (
    <View style={Style.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {images.map((image, imageIndex) => {
          return (
            <Animated.View style={Style.imageContainer} key={imageIndex}>
              <Image source={image.image} style={Style.image} />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
});
