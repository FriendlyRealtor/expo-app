import React, { useEffect, useState } from 'react';
import {
  View,
	SectionList,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Platform
} from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Layout,
  StyleService,
  useStyleSheet,
  Avatar,
	Text,
  Toggle,
} from '@ui-kitten/components';
import {Container, NavigationAction } from '../components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useLayout } from '../hooks';
import { Images }  from '../assets/images';

import {
  ANDROID_MODE,
  DAY_OF_WEEK,
  IOS_MODE,
  ANDROID_DISPLAY,
  IOS_DISPLAY,
} from '../constants';

export const SettingScreen = () => {
  const styles = useStyleSheet(themedStyles);
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
  const {height, width, top, bottom} = useLayout();
  const translateY = useSharedValue(0);
  const input = [0, height * 0.082, height * 0.087, height * 0.09];

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

	const scaleAvatar = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, input, [1, 1, 0.6, 0.6]);
    const transY = interpolate(
      translateY.value,
      input,
      [0, -40, -88, -88],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale: scale}, {translateY: transY}],
    };
  }, []);

	const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
  });

  return (
		<Container style={styles.container}>
			<Layout level="5" style={styles.top}>
				<View style={[{paddingTop: top}, styles.flexRow]}>
					<NavigationAction marginLeft={4} />
					<NavigationAction icon="edit-outline" marginLeft={4} />
				</View>
				<Animated.View style={scaleAvatar}>
					<Avatar
						source={Images.avatar.avatar10}
						style={{
							alignSelf: 'center',
							width: 96,
							height: 96,
							zIndex: 100,
						}}
					/>
				</Animated.View>
				<Animated.View>
					<Text category='h1'>
						MyName
					</Text>
        </Animated.View>
			</Layout>
			<Animated.ScrollView  scrollEventThrottle={16}
			onScroll={scrollHandler}
			showsVerticalScrollIndicator={false}
			>
				<Text category='h4'>Test H4</Text>
				<Text>+84 123456790</Text>
			</Animated.ScrollView>
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
					 return <Text>{item}</Text> }}
				}
				renderSectionHeader={({section}) => (
					<Text>{section.title}</Text>
				)}
				keyExtractor={item => `basicListEntry-${item}`}
			/>
			<Text status="danger" onPress={() => handleLogout()} style={{ textAlign: 'center' }}>
				LOG OUT
			</Text>
		</Container>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  top: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  textView: {
    justifyContent: 'center',
  },
  layout: {
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 24,
    justifyContent: 'space-between',
    paddingRight: 16,
    marginHorizontal: 24,
  },
  iconFb: {
    tintColor: 'text-white-color',
    height: 24,
    width: 11,
  },
  iconGG: {
    tintColor: 'text-white-color',
    width: 20.5,
    height: 21,
  },
  fb: {
    borderRadius: 50,
    margin: 10,
    backgroundColor: '#6979F8',
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  gg: {
    borderRadius: 50,
    margin: 10,
    backgroundColor: '#FF647C',
    padding: 14,
  },
});
