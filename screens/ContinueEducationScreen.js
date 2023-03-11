import React, { useState, useRef } from 'react';
import {
  View,
	StyleSheet,
	SafeAreaView,
	StatusBar,
} from 'react-native';
import _ from 'lodash';
import uuid from 'react-native-uuid';
import { Video } from 'expo-av';

export const ContinueEducationScreen = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: StatusBar.currentHeight || 0,
		},
		video: {
			flex: 1,
			alignSelf: 'stretch'
		},
		buttons: {
			margin: 16
		}
	});

	const video = useRef(null);
  const secondVideo = useRef(null);
	const [text, setText] = useState('');
  const [status, setStatus] = useState({});
  const [statusSecondVideo, setStatusSecondVideo] = useState({});

  return (
    <View style={{ flex: 1, marginTop: 50, padding: 10 }}>
			<SafeAreaView style={styles.container}>
				<Video
					ref={video}
					style={styles.video}
					source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
					useNativeControls
					resizeMode="contain"
					isLooping
					onPlaybackStatusUpdate={setStatus}
				/>
				<Video
				ref={video}
				style={styles.video}
				source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
				useNativeControls
				resizeMode="contain"
				isLooping
				onPlaybackStatusUpdate={setStatus}
			/>
			<Video
				ref={video}
				style={styles.video}
				source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
				useNativeControls
				resizeMode="contain"
				isLooping
				onPlaybackStatusUpdate={setStatus}
				/>
				<Video
				ref={video}
				style={styles.video}
				source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
				useNativeControls
				resizeMode="contain"
				isLooping
				onPlaybackStatusUpdate={setStatus}
			/>
			<Video
				ref={video}
				style={styles.video}
				source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
				useNativeControls
				resizeMode="contain"
				isLooping
				onPlaybackStatusUpdate={setStatus}
				/>
				<Video
				ref={video}
				style={styles.video}
				source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
				useNativeControls
				resizeMode="contain"
				isLooping
				onPlaybackStatusUpdate={setStatus}
			/>
			<Video
				ref={video}
				style={styles.video}
				source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
				useNativeControls
				resizeMode="contain"
				isLooping
				onPlaybackStatusUpdate={setStatus}
				/>
			</SafeAreaView>
    </View>
  );
};
