import React, { useEffect, useState } from 'react';
import {
	Image,
	View,
	FlatList,
	Linking,
	TouchableOpacity
} from 'react-native';
import { Surface, Text } from 'react-native-paper';
import axios from 'axios';
import _ from 'lodash';
import * as Location from 'expo-location';

export const LocalRestaurantScreen = () => {
	const [restaurantList, setRestaurantList] = useState([])
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

	useEffect(() => {
		if (location) {
			const { latitude, longitude } = location
			axios({
				method: 'get',
				url: `http://localhost:5001/local-restaurants`,
				params: { location: `${latitude},${longitude}` }
			})
			.then(response => {
				const { data } = response
				setRestaurantList(data)
			})
			.catch(error => {
				console.log('receiving', error);
			});
		}
	}, [location])

	const openMap = (lng, lat) => {
		const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
		const latLng = `${lat},${lng}`;
		const label = 'Custom Label';
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`
		});
		Linking.openURL(url);
	}

	const renderItem = ({ item, index }) => {
		const { name, icon, reference, rating, opening_hours, geometry, photos } = item
		if (!opening_hours?.open_now && !geometry) {
			return false
		}

		const { location } = geometry;
		const { lng, lat } = location;

		return (
			<TouchableOpacity onPress={() => openMap(lng, lat)}>
				<Surface key={reference} elevation={4} style={{ backgroundColor: 'white', marginTop: 8, marginBottom: 8, marginLeft: 16, marginRight: 16, height: 100, padding: 8, alignItems: 'center', justifyContent: 'center' }}>
					<Image
					source={{
						uri: icon,
					}} />
					<Text>{name}</Text>
					<Text style={{ padding: 2, backgroundColor: 'grey' }}>{rating}</Text>
				</Surface>
			</TouchableOpacity>
		)
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
			<FlatList data={restaurantList} renderItem={renderItem} />
    </View>
  );
};
