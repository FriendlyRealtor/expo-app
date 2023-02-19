import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {default as Button} from '../../components/Elements/Button';
import {default as Layout} from '../../components/Layout/Home';
import {AppStyle} from '../../assets/style';
import {Style} from '../../assets/style/checkout';
import {images} from '../../assets/images/checkout';
import {RouteName} from '../../helper/RouteName';
export default ({navigation, route}) => {
  const {response} = route.params;
  React.useEffect(() => {
    navigation.setOptions({
      title: response?.status ? 'Successfully' : 'Payment Failed',
    });
  }, []);

  return (
    <Layout
      containerStyle={[
        AppStyle.style.marginHorizontalLarge,
        AppStyle.style.marginTopLarge,
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[AppStyle.style.contentMiddle, AppStyle.style.paddingTopLarge]}
        >
          <Image
            source={response?.status ? images.imageSuccess : images.imageFail}
            style={[Style.image, AppStyle.style.marginBottomLarge]}
          />
          <Text
            style={[
              Style.title,
              AppStyle.style.marginBottomLarge,
              AppStyle.style.p,
            ]}
          >
            {response.status
              ? 'Your Order is Confirmed.!'
              : 'Your Payment is Failed.'}
          </Text>
          <Text
            style={[
              Style.subTitle,
              AppStyle.style.marginBottomLarge,
              {fontSize: 13},
            ]}
          >
            {response.status
              ? 'We’re Happy to Let you know that your Order has been Shipped.! You can follow the status of your shipment by Clicking the Button Below.'
              : 'We can’t Process your Payment, Check your Interest Connection and Try Again.'}
          </Text>
          {response.status ? (
            <>
              <View
                style={[
                  {flexDirection: 'row'},
                  AppStyle.style.marginBottomLarge,
                ]}
              >
                <Text style={[{flex: 1}, AppStyle.style.p]}>
                  Order Number:{' '}
                </Text>
                <Text style={[{flex: 1.2, color: 'gray'}, AppStyle.style.p]}>
                  #{response?.orderNumber}
                </Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row'},
                  AppStyle.style.marginBottomLarge,
                ]}
              >
                <Text style={[{flex: 1}, AppStyle.style.p]}>Order Date: </Text>
                <Text style={[{flex: 1.2, color: 'gray'}, AppStyle.style.p]}>
                  {response?.orderDate}
                </Text>
              </View>
              <View
                style={[
                  {flexDirection: 'row'},
                  AppStyle.style.marginBottomLarge,
                ]}
              >
                <Text style={[{flex: 1}, AppStyle.style.p]}>
                  Delivery Address:{' '}
                </Text>
                <View style={{flex: 1.2, color: 'gray'}}>
                  <Text style={[AppStyle.style.p, AppStyle.style.marginBottom]}>
                    {response?.delivery.name}
                  </Text>
                  <Text
                    style={[
                      AppStyle.style.p,
                      {color: 'gray'},
                      AppStyle.style.marginBottom,
                    ]}
                  >
                    {response?.delivery.email}
                  </Text>
                  <Text
                    style={[
                      AppStyle.style.p,
                      {color: 'gray'},
                      AppStyle.style.marginBottom,
                    ]}
                  >
                    {response?.delivery.phone}
                  </Text>
                  <Text style={[AppStyle.style.p, {color: 'gray'}]}>
                    {response?.delivery.address}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  {borderBottomColor: AppStyle.color.red, borderBottomWidth: 1},
                  AppStyle.style.marginBottom,
                ]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(RouteName.TrackOrder)}
              >
                <Text style={[{color: AppStyle.color.red, fontSize: 13}]}>
                  Tracking Order
                </Text>
              </TouchableOpacity>
              <View
                style={[{width: '100%'}, AppStyle.style.marginVerticalLarge]}
              >
                <Button
                  label={'Continue Shopping'}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
      {!response.status ? (
        <View
          style={[{width: '100%', marginBottom: Platform.OS == 'ios' ? 0 : 15}]}
        >
          <Button label={'Try Again'} onPress={() => navigation.goBack()} />
        </View>
      ) : null}
    </Layout>
  );
};
