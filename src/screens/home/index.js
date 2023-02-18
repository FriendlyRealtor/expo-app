import * as React from 'react';
import { View, TouchableOpacity, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { default as Button } from '../../components/Elements/Button';
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

    return (
			<Layout>
        {/*<ScrollView showsVerticalScrollIndicator={false} >
            <Search topicPress={(title) => navigation.navigate(RouteName.FashionMenu, { title: title })} />
            <Discount data={discounts} />
            <View style={[AppStyle.style.paddingHorizontalLarge, {marginBottom: 100}]}>
                <Trends data={trends} />
            </View>
		</ScrollView>*/}
			<Text>Get CRM Valuation on the go!</Text>
			<Search topicPress={(title) => console.log("search", title)} />
			<Button label={"Click Me"} onPress={() => console.log('click')} />
    	</Layout>
		)
}