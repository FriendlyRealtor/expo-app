import React, { useEffect, useState } from 'react';
import {
  View,
	SectionList,
	TextInput,
	StyleSheet,
	Platform
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  ANDROID_MODE,
  DAY_OF_WEEK,
  IOS_MODE,
  ANDROID_DISPLAY,
  IOS_DISPLAY,
} from '../constants';

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
		input: {
			height: 40,
			margin: 12,
			borderWidth: 1,
			padding: 10,
		},
	});

	const MODE_VALUES = Platform.select({
		ios: Object.values(IOS_MODE),
		android: Object.values(ANDROID_MODE),
		windows: [],
	});
	const DISPLAY_VALUES = Platform.select({
		ios: Object.values(IOS_DISPLAY),
		android: Object.values(ANDROID_DISPLAY),
		windows: [],
	});
	const MINUTE_INTERVALS = [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30];

	const [name, setName] = useState([])
	const [verifiedEmail, setVerifiedEmail] = useState([false])
	const [userEmail, setUserEmail] = useState([])
	const [renewalDate, setRenewalDate] = useState(["dklsdd"])
	const userAuth = getAuth();

	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	const [text, setText] = useState('Empty');

	useEffect(() => {
		onAuthStateChanged(userAuth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				setName([user.displayName])
				setUserEmail([user.email])
				setVerifiedEmail([user.emailVerified.toString()])
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

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setShow(Platform.OS === 'ios')
		setDate(currentDate)

		let tempDate = new Date(currentDate)
		let fDate = tempDate.getDate()
		setText(fDate)
	}

  return (
		<View style={styles.container}>
			<SectionList
				sections={[
					{title: 'Name', data: name},
					{title: 'Email', data: userEmail},
					{title: 'Email Verified', data: verifiedEmail},
					{title: 'Renew Education License', data: renewalDate }
				]}
				renderItem={({ section, item }) => {
				switch (section.title) {
					case 'Name':
						return <TextInput
							style={styles.input}
							onChangeText={setName}
							value={name}
					/>
					case 'Renew Education License':
						return <DateTimePicker
										testID="dateTimePicker"
										value={date}
										mode={'date'}
										onChange={onChange}
										display="default"
									/>
					default:
					 return <Text style={styles.item}>{item}</Text> }}
				}
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
