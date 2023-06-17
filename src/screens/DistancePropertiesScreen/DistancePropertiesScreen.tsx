import React, { useEffect, useState } from 'react';
import { Container, Button, Input, ScrollView, View, Text, Icon } from 'native-base';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete, PlaceDetails } from 'expo-google-places-autocomplete';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as geolib from 'geolib';

export const DistancePropertiesScreen = () => {
	const [currentPos, setCurrentPos] = useState();
	const [distancePos, setDistancePos] = useState([]);

	const getGeocoding = async (address) => {
		try {
			const geocode = await Location.geocodeAsync(address);
			return geocode[0];
		} catch (error) {
			console.log('Geocoding error:', error);
			return null;
		}
	};

	useEffect(() => {
		const retrieveCurrentPosition = async () => {
			const res = await Location.getCurrentPositionAsync({});
			const currentPosition = {
				latitude: res.coords.latitude,
				longitude: res.coords.longitude,
			};
	
			setCurrentPos(currentPosition);
		}

		retrieveCurrentPosition();
	}, [])

	const handleDistanceCalculation = async (values) => {
		try {
			const geocodedAddresses = [];
			for (let i = 0; i < values.distances.length; i++) {
				const geocode = await getGeocoding(values.distances[i]);
				geocodedAddresses.push(geocode);
			}
	
			const redo = geocodedAddresses.map((address) => {
				return { latitude: address?.latitude, longitude: address?.longitude }
			})
			const distances = [];
			const test = geolib.orderByDistance(currentPos, redo);
			setDistancePos(test);
			/*geocodedAddresses.forEach((geocodedAddress) => {
				const { latitude, longitude } = geocodedAddress;
				const position = { latitude, longitude };
				const distance = geolib.getDistance(currentPosition, position);
				distances.push(distance);
			});*/	
		} catch (error) {
			console.log('Error during distance calculation:', error);
		}
	};	

  const initialValues = {
    distances: [''], // Initial value with one input field
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleDistanceCalculation,
  });

  const addField = () => {
    formik.setFieldValue('distances', [...formik.values.distances, '']);
  };

  const removeField = (index) => {
    const newDistances = [...formik.values.distances];
    newDistances.splice(index, 1);
    formik.setFieldValue('distances', newDistances);
  };

  return (
    <Container flex={1} width="full" maxWidth="100%" mt={8} ml={8}>
      <FormikProvider value={formik}>
        <ScrollView width="3/4">
          <Text>
            Enter the properties you will be showing and calculate the shortest distance to reach
            them.
          </Text>
					</FormikProvider>
          <View textAlign="right">
            <TouchableOpacity onPress={addField}>
              <Icon as={EvilIcons} name="plus" size="2xl" />
            </TouchableOpacity>
          </View>
          <FieldArray name="distances">
            {() => (
              <>
                {formik.values.distances.map((_, index) => (
                  <View key={index} my={4}>
                    {/*<GooglePlacesAutocomplete
										apiKey={Constants.manifest?.extra?.googleApiKey}
										requestConfig={{ countries: ['US'] }}
										onPlaceSelected={(place: PlaceDetails) => {
											const newDistances = [...formik.values.distances];
											newDistances[index] =  place.formattedAddress?.replace(/,/g, '');
											formik.setFieldValue('distances', newDistances);
										}}
									/>*/}
                    <Input
                      type="text"
                      onChangeText={(text) => {
                        const newDistances = [...formik.values.distances];
                        newDistances[index] = text;
                        formik.setFieldValue('distances', newDistances);
                      }}
                      value={formik.values.distances[index]}
                      mb={2}
                    />
                    <Button onPress={() => removeField(index)}>Remove</Button>
                  </View>
                ))}
              </>
            )}
          </FieldArray>
          <Button mt={8} onPress={formik.handleSubmit} color="primary.500">
            Submit
          </Button>
        </ScrollView>
      </FormikProvider>
    </Container>
  );
};
