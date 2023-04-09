import React from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import * as Linking from "expo-linking";
import { Button } from '../components';

export const ClientScreen = (props) => {

	const makeCall = () => {
		Linking.openURL('tel:+12409064819');
	};

  return (
    <Layout style={{ flex: 1 }}>
      <Text>Hello World</Text>
			<Button onPress={() => makeCall()}><Text>Call</Text></Button>
    </Layout>
  );
};
