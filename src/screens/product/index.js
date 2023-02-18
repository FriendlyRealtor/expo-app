import * as React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { AppStyle } from '../../assets/style';
import { RouteName } from '../../helper/RouteName';
import { icons } from '../../assets/icons';
import { default as Product } from '../../components/Elements/Product';
import { default as Button } from '../../components/Elements/Button';
import { default as CheckBox } from '../../components/Elements/CheckBox';
import { default as CheckBoxColor } from '../../components/Elements/CheckBoxColor';
import { default as Slider } from '../../components/Elements/Slider';
import { default as MoreDetail } from './component/MoreDetail';
import { default as Layout } from '../../components/Layout/Home';
import { Style } from '../../assets/style/product_detail';
//
import { data as products } from '../../datatest/listProduct';
import { useTheme, Text, IconButton, Button as ButtonPaper } from 'react-native-paper';
const width = Dimensions.get('window').width;
export default ({ navigation, route }) => {
    const theme = useTheme();
    const { item } = route.params;
    const scrollRef = React.useRef();
    const [recommandProduct, setRecommandProduct] = React.useState([products[0], products[1], products[2]]);
    const [size, setSize] = React.useState("");
    const [color, setColor] = React.useState("");
    const [count, setCount] = React.useState(0);
    const [like, setLike] = React.useState("");
    const [stateSelecter, setStateSelecter] = React.useState(0);
    const handleAddToCart = () => {
        if (count > 0) {
            navigation.navigate(RouteName.Cart);
        }
    }

    const header = () => {
        return <View style={{width: '100%', position: 'absolute', zIndex: 9999}}>
            <SafeAreaView>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginLeft: 15}} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Image source={icons.back} style={{width: 24, height: 20, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
                    <TouchableOpacity style={{ marginRight: 15 }} activeOpacity={0.8} onPress={() => setLike(!like)}>
                        <Image source={icons.heart} style={{ width: 24, height: 20, resizeMode: 'contain', opacity: like == 0 ? 0.5 : 1 }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    }

    return <Layout hiddenAreaView={true}>
        <ScrollView ref={ref => scrollRef.current = ref} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {
                header()
            }
            <>
                {
                    item.images.length >= 1 ?
                        <Slider images={item.images} /> : null
                }
            </>
            <View style={[AppStyle.style.paddingHorizontalLarge, AppStyle.style.paddingVertical]}>
                <Text style={[AppStyle.style.h4, Style.name]}>{item.name}</Text>
                <View style={[{ flexDirection: 'row', width: '100%' }, AppStyle.style.marginBottom]}>
                    <View style={Style.starContainer}>
                        <Image source={icons.starYellow} style={Style.iconStar} />
                        <Text style={{ lineHeight: 24 }}>{item.star}</Text>
                    </View>
                    <Text style={[AppStyle.style.h3, { color: theme.colors.active, fontWeight: 'bold' }]}>${item.price}</Text>
                </View>
                <Text style={{ fontSize: 13, marginBottom: width * 0.03, color: "gray" }}>{item.description}</Text>
                <>
                    <View style={{ flexDirection: "row", flex: 1, marginBottom: width * 0.03 }}>
                        <View style={{ width: "50%", padding: 5 }}>
                            <TouchableOpacity style={[AppStyle.style.container, Style.selectWidgetContainer]} onPress={() => setStateSelecter(0)}>
                                <Text style={[AppStyle.style.h5, { fontWeight: "normal", color: stateSelecter == 0 ? "black" : "gray" }]}>SIZE</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "50%", padding: 5 }}>
                            <TouchableOpacity style={[AppStyle.style.container, Style.selectWidgetContainer]} onPress={() => setStateSelecter(1)}>
                                <Text style={[AppStyle.style.h5, { fontWeight: "normal", color: stateSelecter == 1 ? "black" : "gray" }]}>COLOR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={AppStyle.style.contentMiddle}>
                        {
                            stateSelecter ?
                                <FlatList
                                    data={item.color}
                                    horizontal
                                    extraData={color}
                                    keyExtractor={(item, index) => `size-${index}-${item}`}
                                    renderItem={({ item, index }) => <CheckBoxColor
                                        color={item} visible={color == item}
                                        onPress={() => setColor(item)}
                                        size={30}
                                        containerStyle={{ marginHorizontal: width * 0.03 }}
                                    />}
                                /> :
                                <FlatList
                                    data={item.size}
                                    horizontal
                                    keyExtractor={(item, index) => `color-${index}-${item}`}
                                    extraData={size}
                                    renderItem={({ item, index }) => {
                                        return <CheckBox
                                            label={item}
                                            visible={size == item}
                                            onPress={() => {
                                                setSize(item)
                                            }}
                                            containerStyle={{ marginHorizontal: width * 0.03 }} />
                                    }}
                                />
                        }
                    </View>
                </>
                <MoreDetail item={item} />
                <Text style={[AppStyle.style.h5, { fontWeight: 'normal' }]}>
                    Related products*
                </Text>
                <FlatList
                    data={recommandProduct}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `recommand-product-${index}`}
                    renderItem={({ item, index }) => <Product onAfterPress={() => {
                        scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true })
                    }} item={item} containerStyle={{ width: width * 0.45 }} />}
                    horizontal={true}
                />
            </View>
        </ScrollView>
        <View style={[AppStyle.style.groupContainer, AppStyle.style.paddingLarge]}>
            <View style={{ flexDirection: 'row' }}>
                <View style={[Style.groupCountContainer, { marginRight: 15 }]}>
                    <IconButton style={Style.buttonCountContainer} icon={"minus"} onPress={() => {
                        if (count >= 1)
                            setCount(count - 1);
                    }} color={"black"} />
                    <Text style={[{ fontWeight: 'normal', width: 50, textAlign: "center", fontSize: 18 }]}>{count}</Text>
                    <IconButton style={Style.buttonCountContainer} icon={"plus"} onPress={() => {
                        setCount(count + 1);
                    }} color={"black"} />
                </View>
                <View style={{ opacity: count > 0 ? 1 : 0.3, flex: 1, justifyContent: 'center', alignItems: "flex-end" }}>
                    <Button onPress={handleAddToCart} label={'Add to cart'} containerStyle={{width: '100%'}}/>
                </View>

            </View>
        </View>
    </Layout>
}