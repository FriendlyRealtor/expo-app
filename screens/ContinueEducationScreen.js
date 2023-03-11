import React, { useState, useRef } from 'react';
import {
  View,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView
} from 'react-native';
import _ from 'lodash';
import { Video } from 'expo-av';
import {
	Text,
} from '@ui-kitten/components';

export const ContinueEducationScreen = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.currentHeight || 0,
		},
		buttons: {
			margin: 16
		}
	});

	const video = useRef(null);
	const [text, setText] = useState('');
  const [status, setStatus] = useState({});

  return (
    <ScrollView style={{ flex: 1, padding: 10, ...styles.container }}>
				<SafeAreaView style={{ marginVertical: 18 }}>
					<Video
						ref={video}
						source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
						useNativeControls
						isLooping
						onPlaybackStatusUpdate={setStatus}
						style={{ width: '100%', height: 300, marginBottom: 8 }}
					/>
					<Text category="h6" status="info">{`By: ${false ? '' : 'Agent LifeStyle'}`}</Text>
			</SafeAreaView>
			<SafeAreaView  style={{ marginVertical: 18 }}>
				<Video
					ref={video}
					source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
					useNativeControls
					isLooping
					onPlaybackStatusUpdate={setStatus}
					style={{ width: '100%', height: 300 }}
				/>
				<Text category="h6" status="info">{`By: ${false ? '' : 'Agent LifeStyle'}`}</Text>
		</SafeAreaView>
		<SafeAreaView  style={{ marginVertical: 18 }}>
				<Video
					ref={video}
					source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
					useNativeControls
					isLooping
					onPlaybackStatusUpdate={setStatus}
					style={{ width: '100%', height: 300 }}
				/>
				<Text category="h6" status="info">{`By: ${false ? '' : 'Agent LifeStyle'}`}</Text>
		</SafeAreaView>
    </ScrollView>
  );
};
