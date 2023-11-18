import * as Location from 'expo-location';

import {
  ClientScreen,
  ContactScreen,
  EventOrganizerScreen,
  AIScreen,
  FeedScreen,
  HomeScreen,
  SettingScreen,
  EventScreen,
} from '../screens';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Colors } from '../config';
import { Icon, Modal, View, Text } from 'native-base';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Discover Events"
        component={FeedScreen}
        options={({ navigation }) => ({
          headerShown: false,
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
      />
      <Tab.Screen
        name="AI Realtor Assistant"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="account" size="2xl" color={Colors.color2} />
          ),
        }}
      >
        {() => <AIScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Event Organizer"
        component={EventOrganizerScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="handshake" size="2xl" color={Colors.color2} />
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
    </Tab.Navigator>
  );
};
