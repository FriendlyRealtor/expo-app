import * as Location from 'expo-location';

import { ClientScreen, ContactScreen, HomeScreen, SettingScreen } from '../screens';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Colors } from '../config';
import { Icon, Modal, View } from 'native-base';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { usePermissions } from '../hooks';
import QRCode from 'react-native-qrcode-svg';
import Bugsnag from '@bugsnag/expo';

const Tab = createBottomTabNavigator();

export const AppTabs = (props) => {
  const { locationStatus } = usePermissions(props.route.params.currentUser);

  const [openBusinessCard, setOpenBusinessCard] = useState<boolean>(false);
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
  }, [locationStatus]);

  const vCardData = `BEGIN:VCARD
	VERSION:3.0
	FN:Montrell Jubilee
	EMAIL:mjubil96@gmail.com
	TEL:240-906-4819
	END:VCARD`;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={({ navigation }) => ({
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="home" size="2xl" color={Colors.primary} />
          ),
          title: 'FriendlyRealtor',
          headerLeft: () => (
            <>
              <TouchableOpacity onPress={() => setOpenBusinessCard(true)}>
                <Icon
                  as={MaterialCommunityIcons}
                  name="qrcode"
                  size="2xl"
                  marginLeft="16px"
                  color={Colors.color2}
                />
              </TouchableOpacity>
              <Modal isOpen={openBusinessCard} onClose={() => setOpenBusinessCard(false)}>
                <Modal.Content>
                  <Modal.CloseButton />
                  <Modal.Header>Business Card</Modal.Header>
                  <Modal.Body>
                    <View margin={'auto'}>
                      <QRCode
                        value={vCardData}
                        size={100}
                        onError={(error) => Bugsnag.notify(error)}
                      />
                    </View>
                  </Modal.Body>
                </Modal.Content>
              </Modal>
            </>
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
        name="Deals"
        component={ClientScreen}
        options={{
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="handshake" size="2xl" color={Colors.primary} />
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
      <Tab.Screen
        name="Contacts"
        options={{
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="account" size="2xl" color={Colors.primary} />
          ),
        }}
      >
        {() => <ContactScreen />}
      </Tab.Screen>
      <Tab.Screen
        name="Menu"
        component={SettingScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={
                props.route.params.user.photo
                  ? { uri: props.route.params.user.photo }
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
    </Tab.Navigator>
  );
};
