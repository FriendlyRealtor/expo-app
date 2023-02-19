import * as React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {default as CartMoney} from '../../components/Elements/CartMoney';
import {default as RadioCard} from '../../components/Elements/RadioCard';
import {default as Button} from '../../components/Elements/Button';
import {default as Card} from './component/CardView';
import {default as Layout} from '../../components/Layout/Home';
import {AppStyle} from '../../assets/style';
import {Style} from '../../assets/style/cart';
import {RouteName} from '../../helper/RouteName';
import {SafeAreaView} from 'react-native-safe-area-context';
//data test
import {data} from '../../datatest/payment';
import {data as address} from '../../datatest/address';
export default ({navigation, route}) => {
  const [card, setCard] = React.useState(data[0]);
  const [method, setMethod] = React.useState(1);
  const [delivery, setDelivery] = React.useState(address[0]);
  const [moneyTotal, setMoneyTotal] = React.useState(192.5);
  const [shippingFee, setShippingFee] = React.useState(10);
  const [estimatingTax, setEstimatingTax] = React.useState(9.8);
  const [discount, setDiscount] = React.useState(0);
  const submit = () => {
    /**
            Call api payment
         */
    let response = {
      status: true,
      orderNumber: 'GJ9876TT543AG',
      orderDate: '19 Jun 2021',
      delivery: {
        name: 'Jame T.Lehman',
        address: '2087 Spring Haven Trail Newark, New Jersey 0710',
        phone: '(+1) 973-757-0935',
        email: 'jame@kanshop.com',
      },
    };
    /*
            response is variable of result when after call api
            response.status is true => Success
            response.status is false => Fail
        */
    if (response.status) {
      navigation.replace(RouteName.CheckoutAlter, {response: response});
    } else navigation.navigate(RouteName.CheckoutAlter, {response: response});
  };

  const CardView = () => {
    return (
      <Card
        onChangePress={() => navigation.navigate(RouteName.Card)}
        card={card}
      />
    );
  };
  return (
    <Layout>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View
          style={[
            AppStyle.style.groupContainer,
            AppStyle.style.paddingLarge,
            AppStyle.style.marginBottomLarge,
            {borderRadius: 0},
          ]}
        >
          <CartMoney
            moneyTotal={moneyTotal}
            shippingFee={shippingFee}
            estimatingTax={estimatingTax}
            discount={discount}
          />
        </View>
        <View
          style={[
            AppStyle.style.groupContainer,
            AppStyle.style.paddingLarge,
            AppStyle.style.marginHorizontalLarge,
            AppStyle.style.marginBottomLarge,
          ]}
        >
          <View
            style={{flexDirection: 'row', ...AppStyle.style.marginBottomLarge}}
          >
            <Text style={[AppStyle.style.p, {fontWeight: 'normal', flex: 1}]}>
              DELIVERY ADDRESS
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate(RouteName.DeliveryAddress)}
            >
              <Text style={[Style.colorChange, {fontSize: 13}]}>Change</Text>
            </TouchableOpacity>
          </View>
          {delivery ? (
            <View style={{width: '70%'}}>
              <Text style={{...AppStyle.style.marginBottom, color: 'black'}}>
                {delivery.name}
              </Text>
              <Text
                style={{
                  ...AppStyle.style.marginBottom,
                  color: 'black',
                  opacity: 0.5,
                }}
              >
                {delivery.address}
              </Text>
              <Text
                style={{
                  ...AppStyle.style.marginBottom,
                  color: 'black',
                  opacity: 0.5,
                }}
              >
                {delivery.phone}
              </Text>
            </View>
          ) : (
            <View>
              <Text style={[{color: AppStyle.color.red}, AppStyle.style.p]}>
                Do you need a delivery address?
              </Text>
            </View>
          )}
        </View>
        <View
          style={[
            AppStyle.style.groupContainer,
            AppStyle.style.marginHorizontalLarge,
            AppStyle.style.nonePadding,
          ]}
        >
          <Text
            style={[
              AppStyle.style.p,
              {fontWeight: 'normal'},
              AppStyle.style.paddingHorizontalLarge,
              AppStyle.style.paddingTopLarge,
            ]}
          >
            PAYMENT METHODS
          </Text>
          <RadioCard
            visible={method == 1}
            onChange={status => {
              setMethod(status ? 1 : 0);
            }}
            title={'Debit Card'}
            containerStyle={{
              borderBottomWidth: 2,
              borderBottomColor: '#F9F9F9',
            }}
            footer={method == 1 ? () => CardView() : null}
          />
          <RadioCard
            visible={method == 2}
            onChange={status => {
              setMethod(status ? 2 : 0);
            }}
            title={'Credit Card'}
            containerStyle={{
              borderBottomWidth: 2,
              borderBottomColor: '#F9F9F9',
            }}
            footer={method == 2 ? () => CardView() : null}
          />
          <RadioCard
            visible={method == 3}
            onChange={status => {
              setMethod(status ? 3 : 0);
            }}
            title={'Net Banking'}
            containerStyle={{
              borderBottomWidth: 2,
              borderBottomColor: '#F9F9F9',
            }}
            footer={method == 3 ? () => CardView() : null}
          />
          <RadioCard
            visible={method == 4}
            onChange={status => {
              setMethod(status ? 4 : 0);
            }}
            title={'Cash'}
            containerStyle={{
              borderBottomWidth: 2,
              borderBottomColor: '#F9F9F9',
            }}
            footer={method == 4 ? () => CardView() : null}
          />
          <RadioCard
            visible={method == 5}
            onChange={status => {
              setMethod(status ? 5 : 0);
            }}
            title={'UPI'}
            footer={method == 5 ? () => CardView() : null}
          />
        </View>

        <View
          style={[
            AppStyle.style.paddingHorizontalLarge,
            AppStyle.style.marginVerticalLarge,
          ]}
        >
          <Button label={'Proceed to Pay'} onPress={submit} />
        </View>
      </ScrollView>
    </Layout>
  );
};
