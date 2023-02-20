import React, {useCallback, useState} from 'react';
import {
  View,
	Text,
	Button
} from 'react-native';
import { TextInput } from '../components'

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
      url: `http://localhost:3000/crm?param=${id}`,
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
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        Get CRM Valuation on the go!
      </Text>
      <TextInput
				value={id}
				onChangeText={(value) => setId(value)}
				placeholder="Enter Value"
        onSubmit={value => setId(value)}
      />
      <Button title='Click Me' onPress={getCrmValuation} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >{`$${crmEstimate}`}</Text>
			<Button title='Sign Out' onPress={handleLogout} />
    </View>
  );
};
