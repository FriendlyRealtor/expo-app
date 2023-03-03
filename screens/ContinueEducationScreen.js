import React, { useState, useRef } from 'react';
import {
  View,
	TextInput,
	StyleSheet,
	ScrollView,
	Button
} from 'react-native';
import { continueEducationCourse } from '../utils'
import _ from 'lodash';
import uuid from 'react-native-uuid';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';

export const ContinueEducationScreen = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'center',
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
			<TextInput
				style={{height: 40}}
				placeholder="Type here to continue education renewal date."
				onChangeText={newText => setText(newText)}
				defaultValue={text}
			/>
			<View style={styles.container}>
				<Video
					ref={video}
					style={styles.video}
					source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
					useNativeControls
					resizeMode="contain"
					isLooping
					onPlaybackStatusUpdate={setStatus}
				/>
				<View style={styles.buttons}>
					<Button title="Play from 5s" onPress={() => video.current.playFromPositionAsync(5000)} />
					<Button title={status.isLooping ? "Set to not loop" : "Set to loop"} onPress={() => video.current.setIsLoopingAsync(!status.isLooping)} />
				</View>
				<StatusBar style="auto" />
			</View>
    </View>
  );
};
