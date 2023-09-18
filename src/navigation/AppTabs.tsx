import * as Location from 'expo-location';

import { ClientScreen, ContactScreen, HomeScreen, SettingScreen } from '../screens';
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
											FN:${props.route.params.currentUser.name}
											EMAIL:${props.route.params.currentUser.emailAddress || props.route.params.user.email}
											TEL:${props.route.params.currentUser.phone || ''}
											TITLE:Real Estate Agent
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
                  color={Colors.blue}
                  borderWidth={1}
                  alignItems="center"
                />
              </TouchableOpacity>
              <Modal isOpen={openBusinessCard} onClose={() => setOpenBusinessCard(false)}>
                <Modal.Content style={styles.modalContent}>
                  <Modal.CloseButton />
                  <Modal.Header style={styles.modalHeader}>Business Card</Modal.Header>
                  <Modal.Body>
                    <View style={styles.cardContainer}>
                      {props.route.params.currentUser.photo && (
                        <Image
                          source={{ uri: props.route.params.currentUser.photo }}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 999,
                            borderColor: 'lightgray',
                            borderWidth: 2,
                            overflow: 'hidden',
                            marginBottom: 24,
                          }}
                        />
                      )}
                      <View>
                        {props.route.params.currentUser.name && (
                          <Text
                            style={styles.nameText}
                          >{`Name: ${props.route.params.currentUser.name}`}</Text>
                        )}
                        {(props.route.params.currentUser.emailAddress ||
                          props.route.params.user.email) && (
                          <Text style={styles.contactText}>{`Email: ${
                            props.route.params.currentUser.emailAddress ||
                            props.route.params.user.email
                          }`}</Text>
                        )}
                        {props.route.params.currentUser.phone && (
                          <Text
                            style={styles.contactText}
                          >{`Phone: ${props.route.params.currentUser.phone}`}</Text>
                        )}
                        <Text style={styles.contactText}>Title: Real Estate Agent</Text>
                      </View>
                      <View style={styles.qrCodeContainer}>
                        <QRCode
                          value={vCardData}
                          size={200}
                          onError={(error) => Bugsnag.notify(error)}
                        />
                      </View>
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
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: () => (
            <Icon as={MaterialCommunityIcons} name="cog" size="2xl" color={Colors.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  modalHeader: {
    color: 'white',
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12,
    color: 'white',
  },
  contactText: {
    fontSize: 18,
    marginBottom: 12,
    color: 'white',
  },
  qrCodeContainer: {
    padding: 12,
    marginTop: 96,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 8,
  },
});
