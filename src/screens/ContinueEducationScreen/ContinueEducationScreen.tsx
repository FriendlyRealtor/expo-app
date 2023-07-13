import { Loading, Text } from '../../components';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

import Bugsnag from '@bugsnag/expo';
import { Video } from 'expo-av';
import _ from 'lodash';
import { storage } from '../../config';
import uuid from 'react-native-uuid';

export const ContinueEducationScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: '#FFFFFF',
    },
    buttons: {
      margin: 16,
    },
  });

  const video = useRef(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create a reference to the file we want to download
    const videoRef = ref(storage, 'courses/');
    setLoading(true);

    listAll(videoRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          getDownloadURL(ref(storage, itemRef.fullPath))
            .then((url) => {
              const appendCourses = [...courses, url];
              setCourses(appendCourses);
              setLoading(false);
            })
            .catch((error) => {
              Bugsnag.notify(error);
            });
        });
      })
      .catch((error) => {
        Bugsnag.notify(error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 10, ...styles.container }}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ marginVertical: 18 }}>
        <View style={{ marginVertical: 16 }}>
          <Text category="h6">Never stop learning: always curious, always growing.</Text>
          <Text category="s1" status="info" style={{ color: '#02FDAA' }}>
            Search for courses below.
          </Text>
        </View>
        {!!courses.length &&
          courses.map((res) => {
            const key = uuid.v4();
            return (
              <Video
                ref={video}
                source={{ uri: res }}
                key={key}
                useNativeControls
                isLooping
                style={{ width: '100%', height: 300, marginBottom: 8 }}
              />
            );
          })}
      </SafeAreaView>
    </ScrollView>
  );
};
