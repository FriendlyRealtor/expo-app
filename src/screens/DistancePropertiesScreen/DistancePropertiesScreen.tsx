import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import * as geolib from 'geolib';

import { Alert } from 'react-native';
import { Button, Icon, Input, Heading, ScrollView, Text, View } from 'native-base';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { GooglePlacesAutocomplete, PlaceDetails } from 'expo-google-places-autocomplete';
import React, { useEffect, useState } from 'react';
import { Address } from './DistancePropertiesScreenTypes';
import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../config';
import { SafeAreaView } from 'react-native';

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
      Bugsnag.notify(error);
      return null;
    }
  };

  useEffect(() => {
    const retrieveCurrentPosition = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          throw new Error('Location permission not granted');
        }

        const { coords } = await Location.getCurrentPositionAsync({});

        const currentPosition = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          address: '',
        };

        setCurrentPosition(currentPosition);
      } catch (error) {
        Bugsnag.notify(error);
        Alert.alert('Error', error.message);
      }
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
      Bugsnag.notify(error);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView p={4}>
        <FormikProvider value={formik}>
          <Heading fontSize="2xl" fontWeight={700}>
            Add the properties you'll show and find the shortest route to reach them.
          </Heading>
          <View textAlign="right">
            <TouchableOpacity onPress={addField}>
              <Icon as={EvilIcons} name="plus" size="2xl" color="primary.500" />
            </TouchableOpacity>
          </View>
          <FieldArray name="distances">
            {() => (
              <>
                {formik.values.distances.map((_, index) => (
                  <View key={index} my={4} display="flex" flexDirection="row" alignItems="center">
                    <View flex="1">
                      <GooglePlacesAutocomplete
                        apiKey={Constants.manifest?.extra?.googleApiKey}
                        requestConfig={{ countries: ['US'] }}
                        onPlaceSelected={(place: PlaceDetails) => {
                          const newDistances = [...formik.values.distances];
                          const formattedAddress = place.formattedAddress?.replace(/,/g, '');

                          if (formattedAddress !== undefined) {
                            newDistances[index] = formattedAddress;
                            formik.setFieldValue('distances', newDistances);
                          }
                        }}
                      />
                    </View>
                    <TouchableOpacity onPress={() => removeField(index)}>
                      <Icon as={EvilIcons} name="close" size="2xl" color="black" />
                    </TouchableOpacity>
                  </View>
                ))}
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
        </FormikProvider>
      </ScrollView>
    </SafeAreaView>
  );
};
