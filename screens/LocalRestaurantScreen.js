import React, {useEffect, useState} from 'react';
import {
  Image,
  FlatList,
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

import axios from 'axios';
import _ from 'lodash';
import * as Location from 'expo-location';

export const LocalRestaurantScreen = props => {
  const styles = StyleSheet.create({
    layout: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 12,
      marginHorizontal: 24,
      marginVertical: 16,
    },
  });

  const {locationStatus} = props;

  const [restaurantList, setRestaurantList] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      if (locationStatus !== 'granted') {
        return;
      }

      const res = await Location.getCurrentPositionAsync({});
      setLocation(res.coords);
    })();
  }, [locationStatus]);

  useEffect(() => {
    if (location) {
      const {latitude, longitude} = location;
      axios({
        method: 'get',
        url: `${process.env.SERVER_URL}/local-restaurants`,
        params: {location: `${latitude},${longitude}`},
      })
        .then(response => {
          const {data} = response;
          setRestaurantList(data);
        })
        .catch(error => {
          console.log('receiving', error);
        });
    }
  }, [location]);

  const openMap = (lng, lat) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const renderItem = ({item, index}) => {
    const {name, icon, reference, rating, opening_hours, geometry, photos} =
      item;
    if (!opening_hours?.open_now && !geometry) {
      return false;
    }

    const {location} = geometry;
    const {lng, lat} = location;

    return (
      <TouchableOpacity onPress={() => openMap(lng, lat)}>
        <Layout key={reference} level="4" style={styles.layout}>
          <Image
            source={{
              uri: icon,
            }}
          />
          <Text>{name}</Text>
          <Text>{rating}</Text>
        </Layout>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={{flex: 1, marginTop: 50}}>
      <Text category="h6" status="info" style={{padding: 16, color: '#02FDAA'}}>
        Fuel your body with goodness, and greatness will follow.
      </Text>
      {restaurantList && _.size(restaurantList) ? (
        <FlatList data={restaurantList} renderItem={renderItem} />
      ) : (
        <View style={{display: 'flex', alignItems: 'center', marginTop: 80}}>
          <Text category="h1">No Results Found!</Text>
        </View>
      )}
    </Layout>
  );
};
