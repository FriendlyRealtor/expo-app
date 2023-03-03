import React, {useCallback, useState} from 'react';
import {
  View,
	Text,
} from 'react-native';
import { TextInput, FormErrorMessage } from '../components'
import { Card, Button } from 'react-native-paper';
import axios from 'axios';
import { numberWithCommas } from '../utils';
import { Formik, useFormik } from 'formik';
import { locationValidationSchema } from '../utils';

export const HomeScreen = () => {
  const [crmEstimate, setCrmEstimate] = useState(0);
  const { errors, setFieldValue, touched, values, handleBlur } = useFormik({
		initialValues: {
			location: ''
		}
	});
	const { location } = values

  const getCrmValuation = useCallback(() => {
    axios({
      method: 'get',
      url: `http://localhost:5001/crm?location=${location}`,
    })
      .then(response => {
        if (response.data) {
          const { value } = response.data;
          setCrmEstimate(value);
        }
      })
      .catch(error => {
        console.log('receiving', error);
      });
  }, [location]);

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
			<Card type="elevation" elevation={3}>
				<Card.Title title="Get CRM Valuation on the go!" subtitle="Search for property by address." />
				<Formik initialValues={{ location: '' }} validationSchema={locationValidationSchema}>
					<View>
						<Card.Content>
							<TextInput
								name="location"
								value={location}
								type="text"
								autoFocus={true}
								onChangeText={(value) => setFieldValue('location', value)}
								onBlur={handleBlur('location')}
								placeholder="Enter address you are interested in"
							/>
							<FormErrorMessage error={errors.location} visible={touched.location} />
							<Text
								style={{
									textAlign: 'left',
									fontSize: '24px',
									fontWeight: 'bold',
								}}
							>{`Cost of address $${numberWithCommas(crmEstimate)}`}</Text>
						</Card.Content>
						<Card.Actions>
							<Button type='outlined' compact buttonColor='#039be5' textColor="black" onPress={getCrmValuation}>
								Get valuation
							</Button>
						</Card.Actions>
					</View>
				</Formik>
			</Card>
    </View>
  );
};
