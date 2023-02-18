import * as React from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import { default as Empty } from './component/CartEmpty';
import { default as CartItem } from './component/CartItem';
import { default as InputVoucher } from './component/InputVoucher';
import { default as Button } from '../../components/Elements/Button';
import { default as CartMoney } from '../../components/Elements/CartMoney';
import { default as ModalBottomViewer } from '../../components/Elements/ModalBottomView';
import { default as Layout } from '../../components/Layout/Home';
import { AppStyle } from '../../assets/style';
import { Style } from '../../assets/style/cart';
import { RouteName } from '../../helper/RouteName';
//data test
import { data } from '../../datatest/cart';
const width = Dimensions.get('window').width;
export default ({ navigation }) => {
    const [carts, setCarts] = React.useState(data);
    const [voucher, setVoucher] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [moneyTotal, setMoneyTotal] = React.useState(0);
    const [shippingFee, setShippingFee] = React.useState(10);
    const [estimatingTax, setEstimatingTax] = React.useState(9.8);
    const [discount, setDiscount] = React.useState(0);

    const minusOrder = (index) => setCarts(carts => {
        var cart = [...carts];
        cart[index].count = cart[index].count >= 1 ? cart[index].count - 1 : cart[index].count;
        return cart;
    });

    const plusOrder = (index) => setCarts(carts => {
        var cart = [...carts];
        cart[index].count++;
        return cart;
    });

    const deleteOrder = (index) => setCarts(carts => {
        var cart = [...carts];
        cart.splice(index, 1);
        return cart;
    });

    const totalCart = () => setMoneyTotal(moneyTotal => {
        let total = 0;
        carts.forEach(element => {
            total += eval(`${element.count}*${element.price}`);
        });
        return total
    });

    React.useEffect(() => {
        totalCart();
    }, [carts]);

    const footerComponent = () => <View style={[Style.containerCheckout]}>
        <InputVoucher
            value={voucher}
            onChangeVoucher={(text) => {
                setVoucher(text);
            }}
            onApplyVoucher={() => setDiscount(5)}
        />
        <View style={[{ backgroundColor: "white" }, AppStyle.style.paddingLarge, AppStyle.style.marginTopLarge]}>
            <CartMoney moneyTotal={moneyTotal} shippingFee={shippingFee} estimatingTax={estimatingTax} discount={discount} />
            <Button label={"Checkout"} onPress={() => {
                navigation.navigate(RouteName.Checkout);
                setModalVisible(false);
            }} />
        </View>
    </View>;

    const renderItem = ({ item, index }) => {
        return <CartItem
            item={item}
            index={index}
            onDeleteCart={() => deleteOrder(index)}
            onMinusCart={() => minusOrder(index)}
            onPlusCart={() => plusOrder(index)}
        />
    }

    return <Layout
        footer={() => <ModalBottomViewer
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
        >
            {footerComponent()}
        </ModalBottomViewer>}
    >
        <View style={[{flex: 1}, AppStyle.style.paddingHorizontalLarge, AppStyle.style.smallPaddingTop]}>
            {
                !carts || carts.length == 0 ? <Empty onBackPress={() => navigation.goBack()} /> :
                    <>
                        <FlatList
                            data={carts}
                            keyExtractor={(item, index) => `cart-${item.id}`}
                            renderItem={renderItem}
                            extraData={carts}
                        />
                        <Button label={"Confirm"} onPress={() => setModalVisible(true)}/>
                    </>
            }
        </View>
    </Layout>;
}