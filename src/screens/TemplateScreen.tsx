import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Button } from '../components';
import { getAuth } from 'firebase/auth';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import Constants from 'expo-constants';
import { TemplateScreenStyles } from '../../styles';

export const TemplateScreen = () => {
	const styles = TemplateScreenStyles;

  const userAuth = getAuth();

	const [monthlyOffer, setMonthlyOffer] = useState<PurchasesOffering>(null);
	const [annualOffer, setAnnualOffer] = useState<PurchasesOffering>(null);
	const [templateOffer, setTemplateOffer] = useState<PurchasesOffering>(null);

  useEffect(() => {
    const fetchOfferings = async () => {
			try {
				await Purchases.configure({ apiKey: Constants.manifest.extra.purchaseApiKey });
				const offerings = await Purchases.getOfferings();

				if (offerings) {
					if (offerings.all.default_offering) {
						if (offerings.all.default_offering.monthly) {
							setMonthlyOffer(offerings.all.default_offering.monthly);
						}
						if (offerings.all.default_offering.annual) {
							setAnnualOffer(offerings.all.default_offering.annual);
						}
					}
					if (offerings.all.marketing_offering) {
						if (offerings.all.marketing_offering.lifetime) {
							setTemplateOffer(offerings.all.marketing_offering.lifetime);
						}
					}
				}
			} catch (err) {
				console.log('error', err);
			}
    };

    fetchOfferings();
  }, []);

	const handleInAppPurchase = useCallback(() => {
		const { uid } = userAuth.currentUser;

		if (uid) {
			Purchases.configure({apiKey: Constants.manifest.extra.purchaseApiKey, appUserID: uid});
		}
	}, [userAuth.currentUser]);

	const handleSubscriptionPurchase = useCallback(() => {
		const { uid } = userAuth.currentUser;

		if (uid) {
			Purchases.configure({apiKey: Constants.manifest.extra.purchaseApiKey, appUserID: uid});
		}
	}, [userAuth.currentUser]);

  return (
    <Layout style={{ flex: 1 }}>
			<Text>Going to be image</Text>
			{templateOffer.product.priceString && <Text>{templateOffer.product.priceString}</Text>}
			<Button style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
			marginTop: 50,
      borderRadius: 8,
      backgroundColor: 'orange',
      borderColor: '#02FDAA',
    }} onPress={handleInAppPurchase}><Text>Purchase Marketing Template</Text></Button>
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
