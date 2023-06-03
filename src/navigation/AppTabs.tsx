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
import { Text } from '../components';
import { View, TouchableOpacity } from 'react-native';
import { Colors } from '../config';

const Tab = createBottomTabNavigator();

export const AppTabs = (props) => {
  const { locationStatus } = usePermissions(props.currentUser);

  const [activeSub, setActiveSub] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (
      props.user.customerInfo &&
      props.user.customerInfo.activeSubscriptions &&
      props.user.customerInfo.activeSubscriptions.length > 0
    ) {
      setActiveSub(true);
    }
  }, [props.user.customerInfo]);

  useEffect(() => {
    const getLocation = async () => {
      if (locationStatus !== 'granted') {
        setLoading(false);
        return;
      }

      const res = await Location.getCurrentPositionAsync({});
      setLocation(res.coords);
    };

    getLocation();
  }, [locationStatus]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="CMA Tool"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Icon name="home" size={30} color="#02FDAA" />,
          header: ({ navigation, route, options }) => {
            return (
              <View
                style={{
                  top: 60,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                  alignItems: 'center',
                  paddingBottom: 16,
                  width: '100%',
                  backgroundColor: Colors.primary,
                }}
              >
                <Text category="h2">Friendly Realtor</Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log('click');
                  }}
                >
                  <Icon name="comment" size={30} color={Colors.color2} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Deals"
        component={ClientScreen}
        options={{
          tabBarIcon: () => <Icon name="user" size={30} color={Colors.primary} />,
        }}
      />
      {/*<Tab.Screen
        name="Templates"
        component={TemplateScreen}
        options={{
          tabBarIcon: () => <Icon name="newspaper-o" size={30} color="#02FDAA" />,
        }}
      />*/}
      {/*<Tab.Screen
        name="Learning"
        component={ContinueEducationScreen}
        options={{
          tabBarIcon: () => <Icon name="book" size={30} color="#02FDAA" />,
        }}
      />*/}
      <Tab.Screen
        name="Restaurants"
        options={{
          tabBarIcon: () => <Icon name="delicious" size={30} color={Colors.primary} />,
        }}
      >
        {() => <LocalRestaurantScreen locationStatus={locationStatus} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: () => <Icon name="gear" size={30} color={Colors.primary} />,
        }}
      />
    </Tab.Navigator>
  );
};
