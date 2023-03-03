import React, { useEffect, useState } from 'react';
import {
  View,
	SectionList,
	StyleSheet
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from 'firebase/auth';
import { auth } from '../config';

export const SettingScreen = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: 22,
		},
		sectionHeader: {
			paddingTop: 2,
			paddingLeft: 10,
			paddingRight: 10,
			paddingBottom: 2,
			fontSize: 14,
			fontWeight: 'bold',
			backgroundColor: 'rgba(247,247,247,1.0)',
		},
		item: {
			padding: 10,
			fontSize: 18,
			height: 44,
		},
	});

	const [name, setName] = useState([])
	const [verifiedEmail, setVerifiedEmail] = useState([false])
	const [userEmail, setUserEmail] = useState([])

	const userAuth = getAuth();

	useEffect(() => {
		onAuthStateChanged(userAuth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				setUserEmail([user.email])
				setVerifiedEmail([user.emailVerified])
				// ...
			} else {
				// User is signed out
				// ...
			}
		});
	}, [])

	const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  return (
		<View style={styles.container}>
			<SectionList
				sections={[
					{title: 'Name', data: ['Test']},
					{title: 'Email', data: userEmail},
					{title: 'Email Verified', data: verifiedEmail},
				]}
				renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
				renderSectionHeader={({section}) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				keyExtractor={item => `basicListEntry-${item}`}
			/>
			<Button type='outlined' compact buttonColor='#f57c00' textColor="black" onPress={handleLogout}>
				Sign Out
			</Button>
		</View>
  );
};
