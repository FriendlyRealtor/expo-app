import React, { useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import { Text } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from '@ui-kitten/components';
import _ from 'lodash';
import { storage } from '../../config';
import { getAuth } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export const PostScreen = () => {
  const userAuth = getAuth();
  const [photoShow, setPhotoShow] = useState<string | null>(null);

  const uploadPhotoAsync = useCallback(async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPhotoShow(result.uri);
        const { uid } = userAuth.currentUser;
        const path = `photos/${uid}/${Date.now()}.jpg`;
        const storageRef = ref(storage, path);
        const response = await fetch(result.uri);
        try {
          const blob = await response.blob();
          try {
            const uploadTask = uploadBytesResumable(storageRef, blob);

            uploadTask.on(
              'state_changed',
              (error) => {
                console.log('error performing upload image: ', error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                  const docRef = await doc(db, 'users', uid);
                  const data = { photo: downloadURL };
                  setPhotoShow(downloadURL);

                  /*if (docRef) {
										await updateDoc(docRef, data);
									}*/
                });
              },
            );
          } catch (err) {
            console.log('error storing image', err);
          }
        } catch (err) {
          console.log('error uploading image', err);
        }
      }
    } catch (err) {
      console.log('error selecting image from camera', err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontWeight: '500' }}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../../../assets/icon.png')} style={styles.avatar} />
        <Input
          multiline
          style={{ flex: 1, minHeight: 64, borderWidth: 0 }}
          placeholder="want to share something"
        />
      </View>
      <TouchableOpacity style={styles.photo} onPress={uploadPhotoAsync}>
        <Icon name="camera" size={30} color="lightgrey" />
      </TouchableOpacity>
      <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
        <Image source={{ uri: photoShow }} style={{ width: '100%', height: '100%' }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'green',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
});