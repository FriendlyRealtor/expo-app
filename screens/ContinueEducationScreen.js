import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import _ from 'lodash';
import {Video} from 'expo-av';
import {ref, getDownloadURL, listAll} from 'firebase/storage';
import {storage} from '../config';
import uuid from 'react-native-uuid';
import {useIsFocused} from '@react-navigation/native';

export const ContinueEducationScreen = () => {
	const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    buttons: {
      margin: 16,
    },
  });

  const video = useRef(null);
  const [courses, setCourses] = useState([]);

	useEffect(() => {

	}, [isFocused])

  useEffect(() => {
    // Create a reference to the file we want to download
    const videoRef = ref(storage, 'courses/');

    listAll(videoRef)
      .then(res => {
        res.items.forEach(itemRef => {
          // All the items under listRef.
          getDownloadURL(ref(storage, itemRef.fullPath))
            .then(url => {
              setCourses([...courses, url]);
            })
            .catch(error => {
              // Handle any errors
            });
        });
      })
      .catch(error => {
        // Uh-oh, an error occurred!
      });
  }, [video]);

  return (
    <ScrollView style={{flex: 1, padding: 10, ...styles.container}}>
      <SafeAreaView style={{marginVertical: 18}}>
        {courses.map(res => {
          return (
            <Video
              ref={video}
              source={{uri: res}}
              key={uuid.v4()}
              useNativeControls
              isLooping
              style={{width: '100%', height: 300, marginBottom: 8}}
            />
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
};
