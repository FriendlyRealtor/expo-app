import * as React from 'react';
import { View, Text, FlatList, ImageBackground, Dimensions } from 'react-native';
import { default as Search } from '../../components/Elements/Search';
import { default as Product } from '../../components/Elements/Product';
import { default as Layout } from '../../components/Layout/Home';
import { default as FloatButton } from '../../components/Elements/FloatButton';
import { icons } from '../../assets/icons';
import { AppStyle } from '../../assets/style';
import { RouteName } from '../../helper/RouteName';
//datat test
import { images } from '../../assets/images/home';
import { data as product } from '../../datatest/listProduct';

const width = Dimensions.get("window").width;
export default ({ navigation, route }) => {
    const [imageBanner, setImageBanner] = React.useState(images.backgroundWomenCollection)
    const [products, setProducts] = React.useState(product);
    const header = React.useCallback(() => <View style={{marginHorizontal: -width*0.05}}>
    <Search chooseTopic={route.params.title} topicPress={(title) => navigation.navigate(RouteName.FashionMenu, { title: title })} />
    <View style={AppStyle.style.marginHorizontalLarge}>
        <ImageBackground source={imageBanner} style={[AppStyle.style.imageContainer]} imageStyle={{ opacity: 0.5 }}>
            <View style={AppStyle.style.imageContentContainer}>
                <Text style={[AppStyle.style.h5, {alignSelf: "center", color: AppStyle.color.white}]}>Things I Love About Winter</Text>
                <View style={[{width: width * 0.15, height: 2, backgroundColor: AppStyle.color.backgroundColor, alignSelf: "center"}, AppStyle.style.marginTop, AppStyle.style.marginBottomLarge]} />
                <Text style={[AppStyle.style.h4, {
                    color: AppStyle.color.white,
                    alignSelf: "center",
                    fontWeight: "normal"
                }]}>{route.params.title}</Text>
            </View>
        </ImageBackground>
    </View></View>)
    const renderItem = React.useCallback(({ item, index }) => {
        return <Product item={item} index={index} />
    }, [products]);
    return <Layout >
        <FlatList
            data={products}
            keyExtractor={(item, index) => `fashion-menu-products-${index}`}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={header}
            contentContainerStyle={AppStyle.style.paddingHorizontalLarge}
        />
        <FloatButton backgroundColor={AppStyle.color.orange} icon={icons.filter} onPress={() => navigation.navigate(RouteName.Filter)} />
    </Layout>
}