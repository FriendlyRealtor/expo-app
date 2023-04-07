import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Button } from '../components';
import { getAuth } from 'firebase/auth';
// import Purchases, { PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import Constants from 'expo-constants';
import Pdf from 'react-native-pdf';
import { StatusBar } from 'expo-status-bar';
import { storage } from '../config';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { TemplateScreenStyles } from '../../styles';
import { SafeAreaView, ScrollView, View } from 'react-native';
import _ from 'lodash';

export const TemplateScreen = () => {
  const styles = TemplateScreenStyles;
  const userAuth = getAuth();

  const [monthlyPkg, setMonthlyPkg] = useState<PurchasesPackage>(null);
  const [annualPkg, setAnnualPkg] = useState<PurchasesPackage>(null);
  const [templatePkg, setTemplatePkg] = useState<PurchasesPackage>(null);
  const [remotePDF, setRemotePDF] = useState([]);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesRef = ref(storage, 'templates/');
        const listOfTemplates = await listAll(templatesRef);

        if (listOfTemplates && _.size(listOfTemplates)) {
          listOfTemplates.items.forEach((item) => {
            getDownloadURL(item).then(async (downloadURL) => {
              setRemotePDF((remotePDF) => [...remotePDF, downloadURL]);
            });
          });
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
      /* await Purchases.configure({ apiKey: Constants.manifest.extra.purchaseApiKey });
        const offerings = await Purchases.getOfferings();
        if (offerings) {
          if (offerings.all.default_offering) {
            if (offerings.all.default_offering.monthly) {
              setMonthlyPkg(offerings.all.default_offering.monthly);
            }
            if (offerings.all.default_offering.annual) {
              setAnnualPkg(offerings.all.default_offering.annual);
            }
          }
          if (offerings.all.marketing_offering) {
            if (offerings.all.marketing_offering.lifetime) {
              setTemplatePkg(offerings.all.marketing_offering.lifetime);
            }
          }
        }*/
      } catch (err) {
        console.log('error', err);
      }
    };

    fetchOfferings();
  }, []);

  const handleInAppPurchase = useCallback(async (pdf: any) => {
		/*try {
			if (templatePkg) {
				const {purchaserInfo, productIdentifier} = await Purchases.purchasePackage(templatePkg);
				console.log('here', purchaserInfo);
				marketing_entitlement
				if (purchaserInfo.entitlements.active.marketing_entitlement) {
					console.log('puchase successl', pdf);
				}
			}
		} catch (error) {
			if (!error.userCancelled) {
				console.log('cancel error', error);
			} else {
				console.log('error', error);
			}
		}*/
  }, [templatePkg]);

  return (
    <Layout style={{ flex: 1 }}>
      <Text category="h3" status="info">
        Editable Marketing Templates
      </Text>
      <ScrollView>
        <SafeAreaView>
          {remotePDF && _.size(remotePDF)
            ? remotePDF.map((pdf, index) => (
                <View key={index} style={{ padding: 16 }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {templatePkg && templatePkg.product.priceString && (
                      <Text category="h4">{templatePkg.product.priceString}</Text>
                    )}
                    <Button
                      style={{
                        width: 250,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 8,
                        backgroundColor: '#02FDAA',
                        borderColor: '#02FDAA',
                      }}
                      onPress={() => handleInAppPurchase(pdf)}
                    >
                      <Text>Purchase Marketing Template</Text>
                    </Button>
                  </View>

                  <Pdf
                    trustAllCerts={false}
                    ref={pdfRef}
                    source={{ uri: pdf, cache: true }}
                    onError={(error) => {
                      console.log(error);
                    }}
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      height: 500,
                      paddingTop: 8,
                    }}
                  />
                </View>
              ))
            : null}
        </SafeAreaView>
      </ScrollView>
      <StatusBar style="auto" />
    </Layout>
  );
};
