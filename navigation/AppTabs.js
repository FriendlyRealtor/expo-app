import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../screens';
import { ContinueEducationScreen } from '../screens';
import { LocalRestaurantScreen } from '../screens';
import { SettingScreen } from '../screens';

const Tab = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Continue Education" component={ContinueEducationScreen} />
			<Tab.Screen name="Local Restaurants" component={LocalRestaurantScreen} />
			<Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};
