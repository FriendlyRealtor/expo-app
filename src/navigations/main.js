import * as React from 'react';
import {Image} from 'react-native';
import {RouteName} from '../helper/RouteName';
import {icons} from '../assets/icons/index';
import {AppStyle} from '../assets/style';
//import screen
import {default as HomeScreen} from '../screens/home';
import {default as Profile} from '../screens/profile';
import {default as WishList} from '../screens/wishList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'react-native-paper';
const Tab = createBottomTabNavigator();
function MyTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={RouteName.Home}
      tabBarOptions={{
        style: AppStyle.style.bottomTab,
        tabStyle: AppStyle.style.tabBar,
        activeTintColor: '#682C0E',
        showLabel: false,
      }}
    >
      <Tab.Screen
        name={RouteName.Profile}
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused}) => {
            if (focused)
              return (
                <Image
                  source={icons.profileChoose}
                  style={AppStyle.style.tabBarIcons}
                />
              );
            return (
              <Image
                source={icons.profile}
                style={AppStyle.style.tabBarIcons}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteName.Home}
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => {
            if (focused)
              return (
                <Image
                  source={icons.homeChoose}
                  style={AppStyle.style.tabBarIcons}
                />
              );
            return (
              <Image source={icons.home} style={AppStyle.style.tabBarIcons} />
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteName.WishList}
        component={WishList}
        options={{
          title: 'Wishlist',
          tabBarIcon: ({focused}) => {
            if (focused)
              return (
                <Image
                  source={icons.heartChoose}
                  style={AppStyle.style.tabBarIcons}
                />
              );
            return (
              <Image source={icons.heart} style={AppStyle.style.tabBarIcons} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
