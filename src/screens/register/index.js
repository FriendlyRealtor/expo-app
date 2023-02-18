import React from 'react';
import { View, Text, FlatList, Dimensions, Pressable } from 'react-native';
import { default as FormAcount } from '../../components/Form/FormRegisterAccount';
import { default as FormProfile } from '../../components/Form/FormRegisterProfile';
import { default as FormOTP } from '../../components/Form/FormOTP';
import { default as Button } from '../../components/Elements/Button';
import { default as Layout } from '../../components/Layout/Auth';
import { Style } from '../../assets/style/login';
import { AppStyle } from '../../assets/style';
import { useTheme } from 'react-native-paper';
const width = Dimensions.get('window').width;
const Form = [
    'import login info',
    'import your info',
    'import otp'
]
export default ({ navigation, route }) => {
    const [countStep, setCountStep] = React.useState(0);
    const flatListRef = React.useRef(null);
    const theme = useTheme();
    const moveToQues = (index) => {
        flatListRef.current.scrollToOffset({ offset: index * width });
    }

    React.useEffect(() => {
        moveToQues(countStep);
    }, [countStep]);

    const submit = async () => {
        switch (countStep) {
            case 0: {
                setCountStep(1);
                return;
            }
            case 1: {
                setCountStep(2);
                return;
            }
            default: {
                navigation.goBack();
                return;
            }
        }
    }

    const renderItem = ({ item, index }) => {
        if (index == 0) return <FormAcount />;
        if (index == 1) return <FormProfile />;
        if (index == 2) return <FormOTP />;
    }

    const footer = () => <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[AppStyle.style.p, Style.color]}>Already have an Account? </Text>
        <Pressable onPress={() => navigation.goBack()}>
            <Text style={[AppStyle.style.p, { color: theme.colors.primary }]} >LOGIN</Text>
        </Pressable>
    </View>

    return <Layout footer={footer} containerStyle={{paddingHorizontal: 0}}>
        <View style={{flex: 1}}>
            <FlatList
                ref={ref => flatListRef.current = ref}
                data={Form}
                keyExtractor={(item, index) => item}
                renderItem={renderItem}
                initialNumToRender={3}
                scrollEnabled={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        <View style={[{ width: "100%" }, AppStyle.style.paddingHorizontalLarge]}>
            <View style={{ flexDirection: 'row', marginBottom: width * 0.02 }}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                    <View style={[Style.note, { backgroundColor: countStep >= 0 ? theme.colors.primary : 'rgba(0,0,0,0)' }]}>

                    </View>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 4 }}>
                    <View style={[Style.note, { backgroundColor: countStep >= 1 ? theme.colors.primary : 'rgba(0,0,0,0)' }]}>

                    </View>
                </View>
                <View style={{ flex: 1, paddingLeft: 8 }}>
                    <View style={[Style.note, { backgroundColor: countStep >= 2 ? theme.colors.primary : 'rgba(0,0,0,0)' }]}>

                    </View>
                </View>
            </View>
            <Button
                label={countStep < Form.length - 1 ? 'Next' : 'Submit'}
                containerStyle={{ width: '100%' }}
                onPress={submit}
                style={{marginBottom: 15}}
            />
        </View>
    </Layout>
}