import React, {useEffect, useState} from 'react';
import {
  Image,
  FlatList,
  View,
  Linking,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import {Layout, Text, Icon, Spinner} from '@ui-kitten/components';
import Constants from 'expo-constants';
import {Loading} from '../components';
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
    icon: {
      width: 20,
      height: 20,
      marginRight: 8,
    },
    container: {
      position: 'absolute' /* or absolute */,
      top: '50%',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  });

  const {locationStatus} = props;

  const [restaurantList, setRestaurantList] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      if (locationStatus !== 'granted') {
        return;
      }

      const res = await Location.getCurrentPositionAsync({});
      setLocation(res.coords);
    };

    getLocation();
  }, [locationStatus]);

  useEffect(() => {
    if (location) {
      setLoading(true);
      const {latitude, longitude} = location;
      axios({
        method: 'get',
        url: `${Constants.manifest.extra.serverUrl}/local-restaurants`,
        params: {location: `${latitude},${longitude}`},
      })
        .then(response => {
          const {data} = response;
          setRestaurantList(data);
          setLoading(false);
        })
        .catch(error => {
          console.log('receiving', JSON.stringify(error));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, Constants.manifest.extra.serverUrl]);

  const openMap = (lng, lat, name) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${name}@${latLng}`,
      android: `${scheme}${latLng}(${name})`,
    });
    Linking.openURL(url);
  };

  const renderItem = ({item, index}) => {
    const {name, icon, reference, rating, opening_hours, geometry} = item;
    if (!opening_hours?.open_now && !geometry) {
      return false;
    }

    const {location} = geometry;
    const {lng, lat} = location;

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
            }}>
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
    <Layout style={{flex: 1}}>
      <Text category="h6" style={{padding: 16, color: '#02FDAA'}}>
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
