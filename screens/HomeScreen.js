import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {TextInput, FormErrorMessage} from '../components';
import axios from 'axios';
import {numberWithCommas} from '../utils';
import {Formik, useFormik} from 'formik';
import {locationValidationSchema} from '../utils';
import {Layout, Text, Divider} from '@ui-kitten/components';
import {Button} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../config';
import Constants from 'expo-constants';
import _ from 'lodash';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';

export const HomeScreen = () => {
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      flex: 1,
      margin: 2,
    },
    footerContainer: {
      flexDirection: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#02FDAA',
      borderColor: '#02FDAA',
    },
    buttonText: {
      fontSize: 20,
      color: Colors.white,
      fontWeight: '700',
    },
    layout: {
      paddingHorizontal: 16,
      paddingVertical: 32,
      borderRadius: 12,
    },
    icon: {
      width: 20,
      height: 20,
    },
    divider: {
      backgroundColor: 'background-basic-color-3',
      marginVertical: 12,
    },
  });

  const [errorState, setErrorState] = useState('');

  const getCrmValuation = useCallback(
    location => {
      const regex = /[,#-\/\s\!\@\$.....]/gi; // regex to test if valid street address

      if (regex.test(location)) {
        axios({
          method: 'get',
          url: `${Constants.manifest.extra.serverUrl}/crm?location=${location}`,
        })
          .then(response => {
            if (response.data) {
              const {value} = response.data;
              setCrmEstimate(value);
            }
          })
          .catch(error => {
            setErrorState(error.message);
          });
      } else {
        setErrorState('Invalid Street Address, Please Try Again.');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location, Constants.manifest.extra.serverUrl],
  );

  const [crmEstimate, setCrmEstimate] = useState(0);
  const {handleChange, values, handleBlur, handleSubmit, resetForm} = useFormik(
    {
      initialValues: {
        location: '',
      },
      onSubmit: values => {
        getCrmValuation(values.location);
      },
    },
  );

  useEffect(() => {
    resetForm({
      values: {
        location: '',
      },
    });
  }, [isFocused]);

  const {location} = values;

  return (
    <Layout style={{flex: 1}}>
      <KeyboardAwareScrollView style={{paddingHorizontal: 16}}>
        <Formik
          initialValues={{location: ''}}
          validationSchema={locationValidationSchema}
        >
          <View style={styles.card}>
            <View style={{marginTop: 16}}>
              <Text category="h6">Get CRM Valuation on the go!</Text>
              <Text category="s1" status="info" style={{color: '#02FDAA'}}>
                Search for property by address.
              </Text>
            </View>
            <View style={{marginVertical: 15}}>
              <Text>
                A Comparative Market Analysis (CMA) is a crucial tool for real
                estate agents to accurately price and sell properties. The
                importance of a good CMA cannot be overstated, as it allows
                agents to provide their clients with a comprehensive
                understanding of the local real estate market and make informed
                decisions about buying or selling a property
              </Text>
              <TextInput
                name="location"
                value={values.location}
                autoCapitalize="none"
                inputMode="search"
                type="text"
                onChangeText={handleChange('location')}
                onBlur={handleBlur('location')}
                textContentType="addressCityAndState"
                placeholder="Enter address you are interested in"
              />
              {errorState !== '' ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
            </View>
            <View style={styles.footerContainer}>
              <Divider />
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Get Valuation</Text>
              </Button>
              <Text style={{margin: 2}} appearance="hint">
                Valuation is calculated by default 10 properties in the area.
              </Text>
            </View>
            <Layout level="4" style={styles.layout}>
              <Text
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  padding: 8,
                }}
                category="h6"
              >{`Estimated CMA value $${numberWithCommas(
                crmEstimate.price,
              )}`}</Text>
              <Divider style={styles.divider} />
              <Text
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  padding: 8,
                }}
                category="h6"
              >{`CMA Price Low $${numberWithCommas(
                crmEstimate.priceRangeLow,
              )}`}</Text>
              <Divider style={styles.divider} />
              <Text
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  padding: 8,
                }}
                category="h6"
              >{`CMA Price High $${numberWithCommas(
                crmEstimate.priceRangeHigh,
              )}`}</Text>
            </Layout>

            {crmEstimate &&
            crmEstimate.listings &&
            _.size(crmEstimate.listings) ? (
              <Layout level="4" style={{...styles.layout, marginTop: 20}}>
                <Text style={{textAlign: 'center'}} category="h6">
                  10 Comparables
                </Text>
                {crmEstimate.listings.map((listing, idx) => {
                  const key = uuid.v4();
                  return (
                    <View key={key}>
                      <Text
                        style={{
                          textAlign: 'left',
                          fontWeight: 'bold',
                          paddingHorizontal: 8,
                        }}
                        category="h6"
                      >
                        {`${idx + 1}.) ${listing.formattedAddress}`}
                      </Text>
                      <Divider style={styles.divider} />
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            paddingHorizontal: 8,
                          }}
                          appearance="hint"
                          status="info"
                          category="h6"
                        >{`Price $${numberWithCommas(listing.price)}`}</Text>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Icon style={{marginRight: 8}} name="bed" size={24} />
                          <Text status="info" appearance="hint">
                            {listing.bedrooms}
                          </Text>
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Icon
                            style={{marginRight: 8}}
                            name="bath"
                            size={24}
                          />
                          <Text status="info" appearance="hint">
                            {listing.bathrooms}
                          </Text>
                        </View>
                      </View>
                      <Divider style={styles.divider} />
                    </View>
                  );
                })}
              </Layout>
            ) : null}
          </View>
        </Formik>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
