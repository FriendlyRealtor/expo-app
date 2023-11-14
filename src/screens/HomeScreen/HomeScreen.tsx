import { Button, Container, Divider, Text, View } from 'native-base';
import { Formik, useFormik } from 'formik';
import { GooglePlacesAutocomplete, PlaceDetails } from 'expo-google-places-autocomplete';
import React, { useCallback, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { locationValidationSchema, numberWithCommas } from '../../utils';

import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import { ErrorMessage } from '../../components';
import { HomeScreenStyles } from './HomeScreenStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import _ from 'lodash';
import axios from 'axios';
import { db, Colors } from '../../config';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import uuid from 'react-native-uuid';

export const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  const styles = HomeScreenStyles;

  const [errorState, setErrorState] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userAuth = getAuth();
  const [crmEstimate, setCrmEstimate] = useState(null);
  const { handleChange, values, setValues, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      location: '',
    },
    onSubmit: () => {
      getCrmValuation();
    },
  });

  const { location } = values;

  useEffect(() => {
    resetForm({
      values: {
        location: '',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const getCrmValuation = useCallback(
    () => {
      const regex = /[,#-\/\s\!\@\$.....]/gi; // regex to test if valid street address

      if (regex.test(location)) {
        setIsLoading(true);
        axios({
          method: 'get',
          url: `${Constants.manifest?.extra?.serverUrl}/crm?location=${location}`,
        })
          .then(async (response) => {
            if (response.data) {
              const { value } = response.data;
              setCrmEstimate(value);

              if (value) {
                const { uid } = userAuth.currentUser;
                const docRef = await doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                  const data = docSnap.data();
                  let cmaEvaluations = [];
                  if (data.cmaEvaluations && _.size(data.cmaEvaluations) > 0) {
                    const concatEvalutions = data.cmaEvaluations.concat({
                      location: location,
                      price: value.price,
                      priceRangeLow: value.priceRangeLow,
                      priceRangeHigh: value.priceRangeHigh,
                    });

                    cmaEvaluations = _.uniqBy(concatEvalutions, 'location');
                  } else {
                    cmaEvaluations.push({
                      location: location,
                      price: value.price,
                      priceRangeLow: value.priceRangeLow,
                      priceRangeHigh: value.priceRangeHigh,
                    });
                  }

                  if (docRef) {
                    await updateDoc(docRef, { cmaEvaluations: cmaEvaluations });
                    setErrorState('');
                  }
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!');
                }
              }
            }
          })
          .catch((error) => {
            setErrorState(error.message);
            Bugsnag.notify(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setErrorState('Invalid Street Address, Please Try Again.');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location, Constants.manifest?.extra?.serverUrl],
  );

  const onPlaceSelected = React.useCallback((place: PlaceDetails) => {
    setValues({ location: place.formattedAddress?.replace(/,/g, '') });
  }, []);

  return (
    <View style={styles.layout} backgroundColor={Colors.white}>
      <StatusBar style="auto" />
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Formik validationSchema={locationValidationSchema}>
          <View style={styles.card}>
            <View style={styles.crmHeader}>
              <Text fontSize="2xl" color="black">
                Get CRM Valuation on the go!
              </Text>
              <Text style={styles.search}>Search for property by address.</Text>
            </View>
            <View style={styles.textArea}>
              <Text color="black">
                A Comparative Market Analysis (CMA) is a crucial tool for real estate agents to
                accurately price and sell properties. The importance of a good CMA cannot be
                overstated, as it allows agents to provide their clients with a comprehensive
                understanding of the local real estate market and make informed decisions about
                buying or selling a property.
              </Text>
              <GooglePlacesAutocomplete
                apiKey={Constants.manifest?.extra?.googleApiKey}
                requestConfig={{ countries: ['US'] }}
                onPlaceSelected={onPlaceSelected}
              />
              {errorState !== '' ? <ErrorMessage error={errorState} visible={true} /> : null}
            </View>
            <View style={styles.footerContainer}>
              <Button
                style={styles.button}
                onPress={handleSubmit}
                isLoading={isLoading}
                spinnerPlacement="end"
                isLoadingText="Submitting"
              >
                <Text style={styles.buttonText}>Get Valuation</Text>
              </Button>
              <Text style={styles.hintText}>
                Valuation is calculated by default 10 properties in the area.
              </Text>
            </View>
            {crmEstimate ? (
              <View style={styles.layout}>
                <Text style={styles.estimatedValue}>{`Estimated CMA value $${numberWithCommas(
                  crmEstimate.price,
                )}`}</Text>
                <Divider />
                <Text style={styles.estimatedValue}>{`CMA Price Low $${numberWithCommas(
                  crmEstimate.priceRangeLow,
                )}`}</Text>
                <Divider />
                <Text style={styles.estimatedValue}>{`CMA Price High $${numberWithCommas(
                  crmEstimate.priceRangeHigh,
                )}`}</Text>
              </View>
            ) : null}

            {crmEstimate && crmEstimate.listings && _.size(crmEstimate.listings) && (
              <View style={styles.layoutCrm}>
                <Text style={styles.comparables}>10 Comparables</Text>
                {crmEstimate.listings.map((listing, idx) => {
                  const key = uuid.v4();
                  return (
                    <View key={key}>
                      <Text style={styles.formattedValue}>
                        {`${idx + 1}.) ${listing.formattedAddress}`}
                      </Text>
                      <Divider />
                      <View style={styles.estimateContainer}>
                        <Text style={styles.estimatedValue}>{`Price $${numberWithCommas(
                          listing.price,
                        )}`}</Text>
                        <View style={styles.iconFlex}>
                          <Icon style={styles.icon} name="bed" size={24} />
                          <Text>{listing.bedrooms}</Text>
                        </View>
                        <View style={styles.iconFlex}>
                          <Icon style={styles.icon} name="bath" size={24} />
                          <Text>{listing.bathrooms}</Text>
                        </View>
                      </View>
                      <Divider />
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};
