import React, { useEffect, useState } from 'react';
import {
  View,
	SectionList,
	StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
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

  return (
		<View style={styles.container}>
			<SectionList
				sections={[
					{title: 'Name', data: ['Test']},
					{title: 'Email', data: userEmail},
					{title: 'Email Verified', data: verifiedEmail},
					{title: 'Billing Info', data: verifiedEmail},
				]}
				renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
				renderSectionHeader={({section}) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				keyExtractor={item => `basicListEntry-${item}`}
			/>
		</View>
  );
};
