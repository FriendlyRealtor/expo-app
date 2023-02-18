import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteName } from '../helper/RouteName';
//import screen
import { default as IntroScreen } from '../screens/intro';
import { default as LoginScreen } from '../screens/login';
import { default as ForgotPassword } from '../screens/forgotPassword';
import { default as RegisterScreen } from '../screens/register';
import { default as FashionMenuScreen } from '../screens/fashion/index.js';
import { default as FilterScreen } from '../screens/fashion/filter';
import { default as ProductDetailScreen } from '../screens/product';
import { default as CartScreen } from '../screens/cart';
import { default as CheckoutScreen } from '../screens/checkout';
import { default as CheckoutAlterScreen } from '../screens/checkout/submitAlter';
import { default as DeliveryAddressScreen } from '../screens/delivery';
import { default as CardScreen } from '../screens/card';
import { default as TrackOrderScreen } from '../screens/tracking'
import { default as EditProfileScreen } from '../screens/profile/editProfile';
import { default as ChangePasswordScreen } from '../screens/profile/changePassword';
import { default as OrderScreen } from '../screens/order';
import { default as WriteReviewScreen } from '../screens/writeReview';
import { default as NotificationScreen } from '../screens/notifications';
import { default as Search } from '../screens/search';
import MyTabs from './main';
//
import { forFadeOpacityZero, options } from '../helper/configNavigation';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteName.Intro}>
        <Stack.Screen name={RouteName.Intro} component={IntroScreen} 
          options={{ headerShown: false, cardStyleInterpolator: forFadeOpacityZero, gestureEnabled: true, animationEnabled: false , cardOverlayEnabled: true, cardStyle: {backgroundColor: 'transparent'}}}
          detachInactiveScreens
          />
        <Stack.Screen
          name={RouteName.Login}
          component={LoginScreen}
          options={{ headerShown: false, cardStyleInterpolator: forFadeOpacityZero, gestureEnabled: true, cardOverlayEnabled: true, cardStyle: {backgroundColor: 'transparent'} }}
          
        />
        <Stack.Screen
          name={RouteName.ForgotPassword}
          component={ForgotPassword}
          options={{ headerShown: false, cardStyleInterpolator: forFadeOpacityZero, gestureEnabled: true, cardOverlayEnabled: true, cardStyle: {backgroundColor: 'transparent' } }}
        />
        <Stack.Screen
          name={RouteName.Register}
          component={RegisterScreen}
          options={{ headerShown: false, cardStyleInterpolator: forFadeOpacityZero, gestureEnabled: true, cardOverlayEnabled: true, cardStyle: {backgroundColor: 'transparent'} }}
        />
        <Stack.Screen
          name={RouteName.Main}
          component={MyTabs}
          options={options("", false)}
        />
        <Stack.Screen
          name={RouteName.FashionMenu}
          component={FashionMenuScreen}  
          options={options("Fashion’s Menu", true)}
        />
        <Stack.Screen
          name={RouteName.Filter}
          component={FilterScreen}  
          options={options("Filter", true)}
        />
        <Stack.Screen
          name={RouteName.ProductDetail}
          component={ProductDetailScreen}  
          options={options("", false)}
        />
        <Stack.Screen
          name={RouteName.Cart}
          component={CartScreen}  
          options={options("Cart", true)}
        />
        <Stack.Screen
          name={RouteName.Checkout}
          component={CheckoutScreen}  
          options={options("Checkout", true)}
        />
        <Stack.Screen
          name={RouteName.CheckoutAlter}
          component={CheckoutAlterScreen}  
          options={options("", true)}
        />
        <Stack.Screen 
          name={RouteName.DeliveryAddress}
          component={DeliveryAddressScreen}
          options={options("Delivery Address", true)}
        />
        <Stack.Screen 
          name={RouteName.Card}
          component={CardScreen}
          options={options("Cards", true)}
        />
        <Stack.Screen 
          name={RouteName.TrackOrder}
          component={TrackOrderScreen}
          options={options("Track Order", true)}
        />
        <Stack.Screen 
          name={RouteName.EditProfile}
          component={EditProfileScreen}
          options={options("Edit Profiles", true)}
        />
        <Stack.Screen 
          name={RouteName.ChangePassword}
          component={ChangePasswordScreen}
          options={options("Change Password", true)}
        />
        <Stack.Screen 
          name={RouteName.Order}
          component={OrderScreen}
          options={options("My Order", true)}
        />
        <Stack.Screen 
          name={RouteName.WriteReview}
          component={WriteReviewScreen}
          options={options("Write a Review", true)}
        />
        <Stack.Screen 
          name={RouteName.Notification}
          component={NotificationScreen}
          options={options("Notification", true)}
        />
        {/*<Stack.Screen 
          name={RouteName.Search}
          component={Search}
          options={options("Search", true)}
	/>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;