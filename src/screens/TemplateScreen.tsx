import React, { useCallback } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Button } from '../components';
import { getAuth } from 'firebase/auth';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import Constants from 'expo-constants';
import { TemplateScreenStyles } from '../../styles';

export const TemplateScreen = () => {
	const styles = TemplateScreenStyles;

  const userAuth = getAuth();

	const handleInAppPurchase = useCallback(() => {
		console.log('in app');
		const { uid } = userAuth.currentUser;

		if (uid) {
			// Purchases.configure({apiKey: '', appUserID: uid});
		}
	}, [userAuth.currentUser]);

	const handleSubscriptionPurchase = useCallback(() => {
		console.log('subscription purchase');
		const { uid } = userAuth.currentUser;

		if (uid) {
			// Purchases.configure({apiKey: '', appUserID: uid});
		}
	}, [userAuth.currentUser]);

  return (
    <Layout style={{ flex: 1 }}>
			<Text>HEllo</Text>
			<Button style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
			marginTop: 50,
      borderRadius: 8,
      backgroundColor: 'orange',
      borderColor: '#02FDAA',
    }} onPress={handleInAppPurchase}><Text>Pay In App</Text></Button>
			<Button style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
			marginTop: 50,
      borderRadius: 8,
      backgroundColor: 'red',
      borderColor: '#02FDAA',
    }} onPress={handleSubscriptionPurchase}><Text>Pay Subscription</Text></Button>
    </Layout>
  );
};
