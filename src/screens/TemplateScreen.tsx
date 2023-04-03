import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Button } from '../components';
import { getAuth } from 'firebase/auth';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
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
  const onlineSource = { uri: '../marketingTemplates/template_1.pdf', cache: true };

  console.log(onlineSource);
  const userAuth = getAuth();

  const [monthlyOffer, setMonthlyOffer] = useState<PurchasesOffering>(null);
  const [annualOffer, setAnnualOffer] = useState<PurchasesOffering>(null);
  const [templateOffer, setTemplateOffer] = useState<PurchasesOffering>(null);
  const [pdfSource, setPdfSource] = useState(onlineSource);
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
      Purchases.configure({ apiKey: Constants.manifest.extra.purchaseApiKey, appUserID: uid });
    }
  }, [userAuth.currentUser]);

  return (
    <Layout style={{ flex: 1 }}>
      <Text>Going to be image</Text>
      {templateOffer && templateOffer.product.priceString && (
        <Text>{templateOffer.product.priceString}</Text>
      )}
      <Button onPress={() => setPdfSource(onlineSource)}>
        <Text>Show Online PDF</Text>
      </Button>
      <Button
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          marginTop: 50,
          borderRadius: 8,
          backgroundColor: 'orange',
          borderColor: '#02FDAA',
        }}
        onPress={handleInAppPurchase}
      >
        <Text>Purchase Marketing Template</Text>
      </Button>
      <ScrollView>
        <SafeAreaView>
          {remotePDF && _.size(remotePDF)
            ? remotePDF.map((pdf) => (
                <Pdf
                  trustAllCerts={false}
                  ref={pdfRef}
                  source={{ uri: pdf, cache: true }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.log(error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    padding: 16,
                    height: 500,
                  }}
                />
              ))
            : null}
        </SafeAreaView>
      </ScrollView>
      <StatusBar style="auto" />
    </Layout>
  );
};
