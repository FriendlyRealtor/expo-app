import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, FormErrorMessage} from '../components';
import axios from 'axios';
import {numberWithCommas} from '../utils';
import {Formik, useFormik} from 'formik';
import {locationValidationSchema} from '../utils';
import {Layout, Text, Button, Divider} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../config';

export const HomeScreen = () => {
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
      marginTop: 8,
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
      paddingVertical: 16,
      borderRadius: 12,
      marginHorizontal: 24,
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
          url: `${process.env.SERVER_URL}/crm?location=${location}`,
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
				setErrorState("Invalid Street Address, Please Try Again.")
			}
    },
    [location],
  );

  const [crmEstimate, setCrmEstimate] = useState(0);
  const {handleChange, values, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      location: '',
    },
    onSubmit: values => {
      getCrmValuation(values.location);
    },
  });
  const {location} = values;

  return (
    <Layout style={{flex: 1, marginTop: 50, paddingHorizontal: 16}}>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={{location: ''}}
          validationSchema={locationValidationSchema}>
          <View style={styles.card}>
            <View style={{marginTop: 16}}>
              <Text category="h6">Get CRM Valuation on the go!</Text>
              <Text category="s1" status="info" style={{color: '#02FDAA'}}>
                Search for property by address.
              </Text>
            </View>
            <View style={{marginVertical: 40}}>
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
              <Layout level="4" style={styles.layout}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    padding: 8,
                  }}
                  category="h6">{`Estimated CMA value $${numberWithCommas(
                  crmEstimate.price,
                )}`}</Text>
                <Divider style={styles.divider} />
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    padding: 8,
                  }}
                  category="h6">{`CMA Price Low $${numberWithCommas(
                  crmEstimate.priceRangeLow,
                )}`}</Text>
                <Divider style={styles.divider} />
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    padding: 8,
                  }}
                  category="h6">{`CMA Price High $${numberWithCommas(
                  crmEstimate.priceRangeHigh,
                )}`}</Text>
              </Layout>
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
          </View>
        </Formik>
      </KeyboardAwareScrollView>
    </Layout>
  );
};
