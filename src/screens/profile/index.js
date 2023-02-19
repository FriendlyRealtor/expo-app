import * as React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import {default as CardView} from '../../components/Elements/Card';
import {default as Layout} from '../../components/Layout/Home';
import {RouteName} from '../../helper/RouteName';
import {icons} from '../../assets/icons';
//style
import {AppStyle} from '../../assets/style';
import {Style} from '../../assets/style/profile';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
//data test
import {data} from '../../datatest/profile';
import {Avatar, useTheme} from 'react-native-paper';
const width = Dimensions.get('window').width;
export default ({navigation, route}) => {
  const theme = useTheme();
  const [profile, setProfile] = React.useState(data);
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const animatedHeader = useAnimatedStyle(() => {
    'worklet';
    const scale = interpolate(
      translationY.value,
      [-width * 0.7, 0, width * 0.7],
      [2, 1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: translationY.value}, {scale: scale}],
    };
  });

  return (
    <Layout>
      <Animated.ScrollView
        onScroll={scrollHandler}
        style={[
          AppStyle.style.marginBottomLarge,
          AppStyle.style.paddingVerticalLarge,
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={15}
      >
        <View style={{flex: 1, paddingBottom: 100}}>
          <Animated.View style={[animatedHeader]}>
            <View style={Style.avatarContainer(theme)}>
              <Avatar.Image
                size={150}
                style={Style.avatar}
                source={profile.avatar}
              />
            </View>
            <Text
              style={[
                AppStyle.style.h5,
                AppStyle.style.marginBottomLarge,
                {alignSelf: 'center'},
              ]}
            >
              {profile.name}
            </Text>
            <Text
              style={[
                AppStyle.style.p,
                {alignSelf: 'center', color: AppStyle.color.gray},
              ]}
            >
              {profile.email}
            </Text>
            <Text
              style={[
                AppStyle.style.p,
                {alignSelf: 'center', color: AppStyle.color.gray},
                AppStyle.style.marginBottomLarge,
              ]}
            >
              {profile.phone}
            </Text>
          </Animated.View>
          <View style={[AppStyle.style.container, AppStyle.style.nonePadding]}>
            <CardView
              index={0}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.editProfile}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'Edit Profile'}
              titleStyle={[AppStyle.style.p]}
              onPress={() => navigation.navigate(RouteName.EditProfile)}
            />
            <CardView
              index={1}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.changePassword}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'Change Password'}
              titleStyle={[AppStyle.style.p]}
              onPress={() => navigation.navigate(RouteName.ChangePassword)}
            />
            <CardView
              index={2}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.myOrders}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'My Orders'}
              titleStyle={[AppStyle.style.p]}
              onPress={() => navigation.navigate(RouteName.Order)}
            />
            <CardView
              index={3}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.myAddress}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'My Address'}
              titleStyle={[AppStyle.style.p]}
              onPress={() => navigation.navigate(RouteName.DeliveryAddress)}
            />
            <CardView
              index={4}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.mySavedCard}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'My Saved Card'}
              titleStyle={[AppStyle.style.p]}
              onPress={() => navigation.navigate(RouteName.Card)}
            />
            <CardView
              index={5}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.language}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'Language'}
              titleStyle={[AppStyle.style.p]}
            />
            <CardView
              index={6}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.country}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'Country'}
              titleStyle={[AppStyle.style.p, {flex: 1}]}
              rightChild={() => (
                <Text style={{fontSize: 14, color: AppStyle.color.gray}}>
                  {profile.country}
                </Text>
              )}
            />
            <CardView
              index={7}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.edit}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'Notification'}
              titleStyle={[AppStyle.style.p]}
              onPress={() => navigation.navigate(RouteName.Notification)}
            />
            <CardView
              index={8}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.trackOrder}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'Track Order'}
              titleStyle={[AppStyle.style.p]}
            />
            <CardView
              index={9}
              containerStyle={[
                AppStyle.style.groupContainer,
                AppStyle.style.marginHorizontalLarge,
                AppStyle.style.marginBottom,
              ]}
              buttonContainer={[AppStyle.style.padding, {alignItem: 'center'}]}
              leftChild={() => (
                <Image
                  source={icons.logout}
                  style={[Style.icons, AppStyle.style.marginRightLarge]}
                />
              )}
              title={'Logout'}
              titleStyle={[AppStyle.style.p]}
              onPress={() => navigation.replace(RouteName.Login)}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </Layout>
  );
};
