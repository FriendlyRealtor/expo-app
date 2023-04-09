import React, { useState } from 'react';
import { Layout, Text, List, ListItem, Divider, Icon, Card } from '@ui-kitten/components';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import { Button } from '../components';

export const ClientScreen = (props) => {
  const [errorState, setErrorState] = useState('');

	const makeCall = () => {
		Linking.openURL('tel:+12409064819');
	};

	const sendText = () => {
		Linking.openURL('sms:+12409064819');
	};

	const handleDeleteItem = async (index) => {
    try {
      // await store.deleteCMAItem(userAuth, user, index);
      // setLocalCmaRows(store.cmaRows);
    } catch (error) {
      setErrorState('error deleting item');
    }
  };

	const renderItemHeader = (headerProps, item) =>
     (
		<View {...headerProps}>
      <Text category="h6">
					{item.index + 1}.) {item.item.address}
      </Text>
    </View>
		);


  const renderItemFooter = (footerProps, item) => {
		console.log(item.item.closingDate)
    return (
		<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
			<Text {...footerProps}>
				Status: {item.item.status}
			</Text>
			<Text {...footerProps}>
				Closing: {item.item.closingDate}
			</Text>
		</View>
		);
		};

	const renderItem2 = ({ item, index }) => {
    return (
		<ListItem
      title={item.name}
      description={item.type}
    />
		);
	};

  const renderItem = (item) => {
    return (
		<Card
      status="basic"
      header={headerProps => renderItemHeader(headerProps, item)}
      footer={footerProps => renderItemFooter(footerProps, item)}>
      <List data={item.item.data} ItemSeparatorComponent={Divider} renderItem={renderItem2} />
    </Card>
		);
	};

  return (
    <Layout style={{ flex: 1 }}>
			<Button onPress={() => makeCall()}><Text>Call</Text></Button>
			<Button onPress={() => sendText()}><Text>Text</Text></Button>
			<View style={{ flex: 1, marginTop: 22 }}>
				<Text category="h6" style={{ marginTop: 24, textAlign: 'center' }}>
					Deals
				</Text>
				<View style={{ textAlign: 'center' }}>
					<List data={[
						{
							address: '123 main st',
							closingDate: '10/19/2023',
							status: 'active',
							data: [{
								name: 'Montrell Jubilee',
								tel: '2409064819',
								type: 'client',
							},
							{
								name: 'Lender 1',
								tel: '2409064819',
								type: 'lender',
							},
							{
								name: 'Inspector 1',
								tel: '2409064819',
								type: 'inspector',
							},
							{
								name: 'Title 1',
								tel: '2409064819',
								type: 'title',
							},
							{
								name: 'Agent 1',
								tel: '2409064819',
								type: 'agent',
							}],
						},
						{
							address: '123 main st',
							closingDate: '10/19/2023',
							status: 'closed',
							data: [{
								name: 'MOntrell Jubilee 2',
								tel: '2409064819',
								type: 'client',
							},
							{
								name: 'Lender 2',
								tel: '2409064819',
								type: 'lender',
							},
							{
								name: 'Inspector 2',
								tel: '2409064819',
								type: 'inspector',
							},
							{
								name: 'Title 3',
								tel: '2409064819',
								type: 'title',
							},
							{
								name: 'Agent 4',
								tel: '2409064819',
								type: 'agent',
							}],
						},
						{
							address: '12345 main st',
							closingDate: '10/19/2023',
							status: 'decline',
							data: [{
								name: 'MOntrell Jubilee 3',
								tel: '2409064819',
								type: 'client',
							},
							{
								name: 'Lender 3',
								tel: '2409064819',
								type: 'lender',
							},
							{
								name: 'Inspector 3',
								tel: '2409064819',
								type: 'inspector',
							},
							{
								name: 'Title 3',
								tel: '2409064819',
								type: 'title',
							},
							{
								name: 'Agent 3',
								tel: '2409064819',
								type: 'agent',
							}],
						},
					]} ItemSeparatorComponent={Divider} renderItem={renderItem} />
				</View>
			</View>
    </Layout>
  );
};
