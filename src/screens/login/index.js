import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { default as Input } from '../../components/Elements/Input';
import { default as Button } from '../../components/Elements/Button';
import { default as Layout } from '../../components/Layout/Auth';
import { RouteName } from '../../helper/RouteName';
//shared element
//style
import { AppStyle } from '../../assets/style';
import { Style } from '../../assets/style/login';
const width = Dimensions.get('window').width;
export default ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const submit = () => {
        navigation.replace(RouteName.Main);
    }
    const footer = () => <View style={{alignItems: 'center'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Text style={[AppStyle.style.p, Style.color]}>Don't have an Account? </Text>
            <Pressable onPress={() => navigation.navigate(RouteName.Register)}>
                <Text style={[AppStyle.style.p, { color: '#F9E0AE' }]}>REGISTER NOW!</Text>
            </Pressable>
        </View>
    </View>
    return <Layout footer={footer}> 
        <Input
            label="User Name*"
            value={username}
            changeValue={(text) => setUsername(text)}
            inputContainerStyle={Style.inputContainer}
            containerStyle={[AppStyle.style.marginBottom]}
            labelStyle={{ color: 'white' }}
            inputStyle={{ color: 'white' }}
            error={error ? error.errorUser : undefined}
            errorStyle={{ color: AppStyle.color.white }}
        />
        <Input
            label="Password*"
            value={password}
            changeValue={(text) => setPassword(text)}
            inputContainerStyle={Style.inputContainer}
            containerStyle={[AppStyle.style.marginBottom]}
            labelStyle={{ color: 'white' }}
            inputStyle={{ color: 'white' }}
            secureTextEntry={true}
            error={error ? error.errorPassword : undefined}
            errorStyle={{ color: AppStyle.color.white }}
        />
        <TouchableOpacity style={{ marginVertical: width * 0.02 }} activeOpacity={0.8} onPress={() => navigation.navigate(RouteName.ForgotPassword)}>
            <Text style={[AppStyle.style.p, Style.color]}>FORGOT PASSWORD?</Text>
        </TouchableOpacity>
        <Button
            label="Login"
            style={{width: '100%'}}
            containerStyle={{ width: '100%' }}
            onPress={submit}
        />
    </Layout>
}