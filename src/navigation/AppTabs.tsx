import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ContinueEducationScreen,
  HomeScreen,
  SettingScreen,
  LocalRestaurantScreen,
  TemplateScreen,
} from '../screens';
import Icon from 'react-native-vector-icons/FontAwesome';
import { usePermissions } from '../hooks';

const Tab = createBottomTabNavigator();

export const AppTabs = (props) => {
  const { locationStatus } = usePermissions(props.currentUser);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CMA Tool"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Icon name="home" size={30} color="#02FDAA" />,
        }}
      />
      <Tab.Screen
        name="Templates"
        component={TemplateScreen}
        options={{
          tabBarIcon: () => <Icon name="envelopes-bulk" size={30} color="#02FDAA" />,
        }}
      />
      <Tab.Screen
        name="Learning"
        component={ContinueEducationScreen}
        options={{
          tabBarIcon: () => <Icon name="book" size={30} color="#02FDAA" />,
        }}
      />
      <Tab.Screen
        name="Restaurants"
        options={{
          tabBarIcon: () => <Icon name="delicious" size={30} color="#02FDAA" />,
        }}
      >
        {() => <LocalRestaurantScreen locationStatus={locationStatus} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: () => <Icon name="gear" size={30} color="#02FDAA" />,
        }}
      />
    </Tab.Navigator>
  );
};
