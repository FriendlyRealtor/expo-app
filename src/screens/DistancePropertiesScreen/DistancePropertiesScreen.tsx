import React, { useEffect, useState } from 'react';
import { Container, Button, Input, ScrollView, View, Text, Icon } from 'native-base';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete, PlaceDetails } from 'expo-google-places-autocomplete';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import * as Linking from 'expo-linking';
import { Address } from './DistancePropertiesScreenTypes';

export const DistancePropertiesScreen = () => {
  const [currentPosition, setCurrentPosition] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getGeocoding = async (address: string): Promise<Address | null> => {
    try {
      const geocodeResult = await Location.geocodeAsync(address);
      if (geocodeResult.length > 0) {
        const { latitude, longitude } = geocodeResult[0];
        const geocodedAddress: Address = {
          latitude,
          longitude,
          address,
        };
        return geocodedAddress;
      }
      return null;
    } catch (error) {
      console.log('Geocoding error:', error);
      return null;
    }
  };

  useEffect(() => {
    const retrieveCurrentPosition = async () => {
      const { coords } = await Location.getCurrentPositionAsync({});
      const currentPosition: Address = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: '',
      };

      setCurrentPosition(currentPosition);
    };

    retrieveCurrentPosition();
  }, []);

  const handleDistanceCalculation = async (values: { distances: string[] }) => {
    try {
      setIsLoading(true);
      const geocodedAddresses: Address[] = [];
      for (let i = 0; i < values.distances.length; i++) {
        const address = values.distances[i];
        const geocode = await getGeocoding(address);
        if (geocode) {
          geocode.address = address;
          geocodedAddresses.push(geocode);
        }
      }

      if (currentPosition) {
        const sortedAddresses = geolib.orderByDistance(currentPosition, geocodedAddresses);

        const formattedAddresses = sortedAddresses.map((address) =>
          encodeURIComponent(address.address),
        );

        const url = `http://maps.apple.com/?daddr=${formattedAddresses.join('+to:')}`;

        const isSupported = await Linking.canOpenURL(url);

        if (isSupported) {
          await Linking.openURL(url);
        }
      }
    } catch (error) {
      console.log('Error during distance calculation:', error);
    } finally {
      setIsLoading(false);
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
          <View textAlign="right">
            <TouchableOpacity onPress={addField}>
              <Icon as={EvilIcons} name="plus" size="2xl" color="primary.500" />
            </TouchableOpacity>
          </View>
          <FieldArray name="distances">
            {() => (
              <>
                {/*formik.values.distances.map((_, index) => (
                  <View key={index} my={4} display="flex" flexDirection="row" alignItems="center">
                    <View flex="1">
                      <GooglePlacesAutocomplete
                        apiKey={Constants.manifest?.extra?.googleApiKey}
                        requestConfig={{ countries: ['US'] }}
                        onPlaceSelected={(place: PlaceDetails) => {
                          const newDistances = [...formik.values.distances];
                          newDistances[index] = place.formattedAddress?.replace(/,/g, '');
                          formik.setFieldValue('distances', newDistances);
                        }}
                      />
                    </View>
                    <TouchableOpacity onPress={() => removeField(index)}>
                      <Icon as={EvilIcons} name="close" size="2xl" color="black" />
                    </TouchableOpacity>
                  </View>
											))*/}
              </>
            )}
          </FieldArray>
          <Button
            mt={8}
            onPress={formik.handleSubmit}
            color="primary.500"
            isLoading={isLoading}
            spinnerPlacement="end"
            isLoadingText="Submitting"
          >
            Submit
          </Button>
        </ScrollView>
      </FormikProvider>
    </Container>
  );
};
