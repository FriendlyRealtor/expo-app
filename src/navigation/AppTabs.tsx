import * as Location from 'expo-location';

import {
  ClientScreen,
  ContactScreen,
  EventOrganizerScreen,
  AIScreen,
  FacebookScreen,
  HomeScreen,
  SettingScreen,
  EventScreen,
  PaymentScreen,
} from '../screens';
import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Colors } from '../config';
import { Icon, Modal, View, Text } from 'native-base';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfessionalEntitlement } from '../types';
import { usePermissions } from '../hooks';
import QRCode from 'react-native-qrcode-svg';
import Bugsnag from '@bugsnag/expo';

const Tab = createBottomTabNavigator();

export const AppTabs = (props) => {
  //const { locationStatus } = usePermissions(props.route.params.currentUser);
  const [activeSub, setActiveSub] = useState(false);
  const [location, setLocation] = useState(null);
  /* useEffect(() => {
    if (
      props.route.params.user.customerInfo &&
      props.route.params.user.customerInfo.activeSubscriptions &&
      props.route.params.user.customerInfo.activeSubscriptions.length > 0
    ) {
      setActiveSub(true);
    }
  }, [props.route.params.user.customerInfo]);*/

  useEffect(() => {
    const getLocation = async () => {
      const res = await Location.getCurrentPositionAsync({});
      setLocation(res.coords);
    };

    getLocation();
  }, []);

  const isProfessional = useMemo(() => {
    return props.route?.params?.currentUser.customerInfo.entitlements.active[
      ProfessionalEntitlement
    ];
  }, [props?.route?.params?.currentUser]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="Discover Events"
        component={EventScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="map-search" size="2xl" color={Colors.color2} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Chat');
              }}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="inbox"
                size="2xl"
                style={{ marginRight: 16 }}
                color={Colors.color2}
              />
            </TouchableOpacity>
          ),
        })}
        initialParams={{
          isProfessional: isProfessional,
        }}
      />
      <Tab.Screen
        name="Event Organizer"
        component={EventOrganizerScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Create',
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="handshake" size="2xl" color={Colors.color2} />
          ),
        }}
        initialParams={{
          isProfessional: isProfessional,
        }}
      />
      <Tab.Screen
        name="AI Social Tool"
        component={FacebookScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'AI Social',
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="smart-card" size="2xl" color={Colors.color2} />
          ),
        }}
        initialParams={{
          isProfessional: isProfessional,
        }}
      />
      <Tab.Screen
        name="Payment Method"
        component={PaymentScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Subscription',
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="credit-card" size="2xl" color={Colors.color2} />
          ),
        }}
        initialParams={{
          isProfessional: isProfessional,
        }}
      />
      {/*<Tab.Screen
        name="AI Realtor Assistant"
        options={{
          headerShown: false,
          tabBarLabel: 'AI Realtor',
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="account" size="2xl" color={Colors.color2} />
          ),
        }}
      >
        {({ navigation }) => <AIScreen navigation={navigation} />}
      </Tab.Screen>*/}
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Image
              source={
                props.route?.params?.user
                  ? { uri: props.route?.params?.user?.photo }
                  : require('../../assets/icon.png')
              }
              style={{
                width: 25,
                height: 25,
                borderRadius: 25 / 2,
                borderColor: 'lightgray',
                borderWidth: 2,
                overflow: 'hidden',
              }}
            />
          ),
        }}
      />
      {/*<Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarIcon: () => <Icon name="plus-circle" size={30} color="black" />,
        }}
      />*/}
      {/*<Tab.Screen
        name="Learning"
        component={ContinueEducationScreen}
        options={{
          tabBarIcon: () => <Icon name="book" size={30} color="#02FDAA" />,
        }}
      />*/}
    </Tab.Navigator>
  );
};
