import React, {useCallback, useState} from 'react';
import {
  View,
	Text,
} from 'react-native';
import { TextInput } from '../components'
import { Card, Button } from 'react-native-paper';

//data test
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../config';

export const HomeScreen = () => {
  const [id, setId] = useState();
  const [crmEstimate, setCrmEstimate] = useState(0);

  const getCrmValuation = useCallback(() => {
    axios({
      method: 'get',
      url: `http://localhost:5000/crm?param=${id}`,
    })
      .then(response => {
        if (response.data) {
          const {value} = response.data;
          setCrmEstimate(value);
        }
      })
      .catch(error => {
        console.log('receingg', error);
      });
  }, [id]);

	const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
			<Card type="elevation" elevation={3}>
				<Card.Title title="Get CRM Valuation on the go!" subtitle="Get accurate crm valuations." />
				<Card.Content>
					<TextInput
						value={id}
						onChangeText={(value) => setId(value)}
						placeholder="Enter Value"
						onSubmit={value => setId(value)}
					/>
					<Text
						style={{
							textAlign: 'center',
							fontSize: '24px',
							fontWeight: 'bold',
						}}
					>{`$${crmEstimate}`}</Text>
				</Card.Content>
				<Card.Actions>
					<Button type='outlined' onPress={getCrmValuation} buttonColor="white" textColor="black">
						Get valuation
					</Button>
					<Button type='outlined' onPress={handleLogout} buttonColor="white" textColor="black">
						Sign Out
					</Button>
				</Card.Actions>
			</Card>
    </View>
  );
};
