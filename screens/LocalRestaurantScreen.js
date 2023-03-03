import React, { useEffect, useState } from 'react';
import {
	Image,
	ScrollView,
} from 'react-native';
import { Surface, Text } from 'react-native-paper';
import axios from 'axios';

export const LocalRestaurantScreen = () => {
	const [restaurantList, setRestaurantList] = useState([])

	useEffect(() => {
		axios({
      method: 'get',
      url: `http://localhost:5001/local-restaurants`,
			params: { location: '38.79371,-77.061651' }
    })
      .then(response => {
				const { data } = response
				setRestaurantList(data)
      })
      .catch(error => {
        console.log('receiving', error);
      });
	}, [])

  return (
    <ScrollView style={{ flex: 1, marginTop: 50 }}>
			{restaurantList.length > 0 && restaurantList.map((restaurant) => {
				const { name, icon, reference, rating, opening_hours } = restaurant
				if (!opening_hours?.open_now) {
					return false
				}

				return (
					<Surface key={reference} elevation={4}>
						<Image style={{ width: 66, height: 58 }}
						source={{
							uri: icon,
						}} />
						<Text>{name}</Text>
						<Text>{rating}</Text>
					</Surface>
				)
			})}
    </ScrollView>
  );
};
