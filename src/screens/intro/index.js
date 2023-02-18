import * as React from 'react';
import { View, ImageBackground, Animated, StatusBar } from 'react-native';
import { images } from '../../assets/images';
import { RouteName } from '../../helper/RouteName';
import { AppStyle } from '../../assets/style';
import { Style } from '../../assets/style/intro';
export default ({ navigation, route }) => {
    const titleAnimated = React.useRef(new Animated.Value(0)).current;
    const desc1Animated = React.useRef(new Animated.Value(0)).current;
    const handle = () => {
        setTimeout(() => {
            navigation.replace(RouteName.Login);
            Animated.timing(desc1Animated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }, 1500);
    }
    const handleAnimation = () => {
        Animated.sequence([
            Animated.timing(
                titleAnimated,
                {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 1000,
                }
            ),
            Animated.timing(
                desc1Animated,
                {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500
                }
            )
        ]).start(handle);
    }
    React.useEffect(() => {
        handleAnimation();
    }, []);
    const StyleDesc1Animation = {
        opacity: desc1Animated,
        transform: [
            {
                translateY: titleAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                })
            }
        ]
    }
    const StyleTitleAnimation = {
        opacity: titleAnimated,
        transform: [
            {
                translateY: titleAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                })
            }
        ]
    }
    return <ImageBackground style={{ flex: 1 }} source={images.background}>
        <StatusBar
            backgroundColor={'rgba(0,0,0,0)'}
            translucent={true}
            barStyle={'dark-content'} />
        <View style={[AppStyle.style.container, Style.backgroundColor, Style.container]}>

            <Animated.View style={[{ alignItems: 'center' }, StyleTitleAnimation]}>
                <Animated.Text style={[AppStyle.style.h1, Style.color,]}>Stylorium</Animated.Text>
                <Animated.Text style={[AppStyle.style.h5, Style.color]}>Online Shopping App</Animated.Text>
            </Animated.View>
            <Animated.Text style={[AppStyle.style.p, StyleDesc1Animation, { paddingHorizontal: 5, marginVertical: 8, borderRadius: 3, color: 'white'}]}>The only creative subscription you need</Animated.Text>
        </View>
    </ImageBackground>
}