import React from 'react';
import { View, ImageBackground, Animated, SafeAreaView, StatusBar } from 'react-native';
import { images } from '../../assets/images';
//style
import { AppStyle } from '../../assets/style';
import { Style } from '../../assets/style/login';
import Logo from '../Elements/Logo';
export default ({ footer = () => { }, children = null, containerStyle = {} }) => {
    const formAnimated = React.useRef(new Animated.Value(0)).current;
    const FormAnimateHandle = () => {
        Animated.timing(
            formAnimated,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }
    React.useEffect(() => {
        FormAnimateHandle();
    }, []);

    return <ImageBackground style={{ flex: 1 }} source={images.background} >
        <StatusBar
            backgroundColor={'rgba(0,0,0,0)'}
            translucent={true}
            barStyle={'dark-content'} />
        <View style={[AppStyle.style.container, Style.backgroundColor, containerStyle]}>
            <SafeAreaView style={{ flex: 1 }}>
                <Logo />
                <View style={{marginBottom: 15}} />
                <Animated.View style={[Style.form, { opacity: formAnimated }]}>
                    {
                        children
                    }
                </Animated.View>
                {
                    footer ? footer() : <></>
                }
            </SafeAreaView>
        </View>
    </ImageBackground>
}