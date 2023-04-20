import React, { useEffect, useState } from 'react';
import { Image, FlatList, View, Linking, TouchableOpacity, Platform } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { Loading, Text } from '../../components';
import axios from 'axios';
import _ from 'lodash';
import { LocalRestaurantScreenStyles } from './LocalRestaurantScreenStyles';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

export const LocalRestaurantScreen = (props) => {
  const styles = LocalRestaurantScreenStyles;

  const { locationStatus } = props;

  const [restaurantList, setRestaurantList] = useState(undefined);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      setLoading(true);
      if (locationStatus !== 'granted') {
        setLoading(false);
        return;
      }

      const res = await Location.getCurrentPositionAsync({});
      setLocation(res.coords);
    };

    getLocation();
  }, [locationStatus]);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      axios({
        method: 'get',
        url: `${Constants.manifest.extra.serverUrl}/local-restaurants`,
        params: { location: `${latitude},${longitude}` },
      })
        .then((response) => {
          const { data } = response;
          setRestaurantList(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('receiving', JSON.stringify(error));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, Constants.manifest.extra.serverUrl]);

  const openMap = (lng, lat, name) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${name}@${latLng}`,
      android: `${scheme}${latLng}(${name})`,
    });
    Linking.openURL(url);
  };

  const renderItem = ({ item, index }) => {
    const { name, icon, reference, rating, opening_hours, geometry } = item;
    if (!opening_hours?.open_now && !geometry) {
      return false;
    }

    const { location } = geometry;
    const { lng, lat } = location;

    return (
      <TouchableOpacity onPress={() => openMap(lng, lat, name)}>
        <Layout key={reference} level="4" style={styles.layout}>
          <Image
            source={{
              uri: icon,
            }}
          />
          <Text category="h5">{name}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon style={styles.icon} fill="#FFE234" name="star" />
            <Text>{rating}</Text>
          </View>
        </Layout>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {locationStatus !== 'denied' ? (
        <Layout>
          <Text category="h6" style={styles.text}>
            Fuel your body with goodness, and greatness will follow.
          </Text>
          {restaurantList && _.size(restaurantList) === 0 ? (
            <View style={styles.notFound}>
              <Text category="h1">No Results Found!</Text>
            </View>
          ) : null}
          {restaurantList && _.size(restaurantList) > 0 ? (
            <FlatList data={restaurantList} renderItem={renderItem} />
          ) : null}
        </Layout>
      ) : (
        <Text>Head to your location services and allow.</Text>
      )}
    </Layout>
  );
};
