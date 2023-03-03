import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens';
import { ContinueEducationScreen } from '../screens';
import { LocalRestaurantScreen } from '../screens';
import { SettingScreen } from '../screens';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tab.Navigator>
			<Tab.Screen name="Crm Tool" component={HomeScreen} options={{ tabBarIcon: () => <Icon name="home" size={30} color="blue" /> }} />
			<Tab.Screen name="Continue Education" component={ContinueEducationScreen} options={{ tabBarIcon: () => <Icon name="book" size={30} color="blue" /> }} />
			<Tab.Screen name="Local Restaurants" component={LocalRestaurantScreen} options={{ tabBarIcon: () => <Icon name="delicious" size={30} color="blue" /> }} />
			<Tab.Screen name="Settings" component={SettingScreen}  options={{ tabBarIcon: () => <Icon name="gear" size={30} color="blue" /> }} />
    </Tab.Navigator>
  );
};
