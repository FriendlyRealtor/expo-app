import * as React from 'react';
import { View, TouchableOpacity, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { default as Search } from '../../components/Elements/Search';
import { default as Layout } from '../../components/Layout/Home';
import { default as Discount } from './component/Discount';
import { default as Trends } from './component/Trends';
import { RouteName } from '../../helper/RouteName';
import { icons } from '../../assets/icons';
//style
import { AppStyle } from '../../assets/style';
//data test
import { data as profile } from '../../datatest/profile';
import { data as discounts } from '../../datatest/categoryDiscout';
import { data as trends } from '../../datatest/listProduct';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('window').width;
export default () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const headerTitle = React.useCallback(() => {
        return <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: AppStyle.color.backgroundColor }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", paddingHorizontal: width * 0.05, paddingBottom: width * 0.03, alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={[AppStyle.style.p, { fontWeight: 'normal' }]}>{profile.name}</Text>
                        <Text style={[{ fontSize: 13, color: theme.colors.placeholder }]}>Get Popular fashion from Home</Text>
                    </View>
                    <IconButton onPress={() => navigation.navigate(RouteName.Cart)} icon={"cart"} size={16} />
                    <IconButton onPress={() => navigation.navigate(RouteName.Notification)} icon={"bell"} size={16} />
                </View>
            </SafeAreaView>
        </View>
    }, [profile]);
    return <Layout
        header={headerTitle}
    >
        <ScrollView showsVerticalScrollIndicator={false} >
            <Search topicPress={(title) => navigation.navigate(RouteName.FashionMenu, { title: title })} />
            <Discount data={discounts} />
            <View style={[AppStyle.style.paddingHorizontalLarge, {marginBottom: 100}]}>
                <Trends data={trends} />
            </View>
        </ScrollView>
    </Layout>
}