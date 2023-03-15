import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, FormErrorMessage} from '../components';
import axios from 'axios';
import {numberWithCommas} from '../utils';
import {Formik, useFormik} from 'formik';
import {locationValidationSchema} from '../utils';
import {Layout, Text, Button, Card, Divider} from '@ui-kitten/components';

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
    footerControl: {
      marginHorizontal: 2,
      backgroundColor: '#02FDAA',
      borderColor: '#02FDAA',
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

  const [crmEstimate, setCrmEstimate] = useState(0);
  const {errors, setFieldValue, touched, values, handleBlur} = useFormik({
    initialValues: {
      location: '',
    },
  });
  const {location} = values;

  const getCrmValuation = useCallback(() => {
    axios({
      method: 'get',
      url: `http://localhost:5001/crm?location=${location}`,
    })
      .then(response => {
        if (response.data) {
          const {value} = response.data;
          setCrmEstimate(value);
        }
      })
      .catch(error => {
        console.log('receiving', error);
      });
  }, [location]);

  const Header = props => (
    <View {...props}>
      <Text category="h6">Get CRM Valuation on the go!</Text>
      <Text category="s1" status="info" style={{color: '#02FDAA'}}>
        Search for property by address.
      </Text>
    </View>
  );

  const Footer = props => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Divider />
      <Button
        style={styles.footerControl}
        onPress={props.getCrmValuation}
        size="small"
      >
        Get Valuation
      </Button>
      <Text style={{margin: 2}} appearance="hint">
        Valuation is calculated by default 10 properties in the area.
      </Text>
    </View>
  );

  return (
    <Layout style={{flex: 1, marginTop: 50}}>
      <Formik
        initialValues={{location: ''}}
        validationSchema={locationValidationSchema}
      >
        <Card
          style={styles.card}
          header={Header}
          footer={<Footer getCrmValuation={getCrmValuation} />}
        >
          <Text>
            A Comparative Market Analysis (CMA) is a crucial tool for real
            estate agents to accurately price and sell properties. The
            importance of a good CMA cannot be overstated, as it allows agents
            to provide their clients with a comprehensive understanding of the
            local real estate market and make informed decisions about buying or
            selling a property
          </Text>
          <TextInput
            name="location"
            value={location}
            type="text"
            autoFocus={true}
            onChangeText={value => setFieldValue('location', value)}
            onBlur={handleBlur('location')}
            placeholder="Enter address you are interested in"
          />
          <FormErrorMessage
            error={errors.location}
            visible={touched.location}
          />
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
        </Card>
      </Formik>
    </Layout>
  );
};
