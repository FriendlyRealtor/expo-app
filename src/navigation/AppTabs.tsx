import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ClientScreen,
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

  const [activeSub, setActiveSub] = useState(false);

  useEffect(() => {
    if (
      props.user.customerInfo &&
      props.user.customerInfo.activeSubscriptions &&
      props.user.customerInfo.activeSubscriptions.length > 0
    ) {
      setActiveSub(true);
    }
  }, [props.user.customerInfo]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CMA Tool"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Icon name="home" size={30} color="#02FDAA" />,
        }}
      />
      {activeSub && (
        <Tab.Screen
          name="Deals"
          component={ClientScreen}
          options={{
            tabBarIcon: () => <Icon name="user" size={30} color="#02FDAA" />,
          }}
        />
      )}
      <Tab.Screen
        name="Templates"
        component={TemplateScreen}
        options={{
          tabBarIcon: () => <Icon name="newspaper-o" size={30} color="#02FDAA" />,
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
