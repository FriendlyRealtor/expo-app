import React, {useState, useCallback, useContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {getAuth, signOut} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {auth, db, storage} from '../config';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Layout,
  StyleService,
  useStyleSheet,
  Text,
  Divider,
} from '@ui-kitten/components';
import {Container} from '../components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ProgressBar, Colors} from 'react-native-paper';
import {useLayout} from '../hooks';
import {AuthenticatedUserContext} from '../providers';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

export const SettingScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [photoShow, setPhotoShow] = useState(null);
  const [photoProgress, setPhotoProgress] = React.useState(0);

  const userAuth = getAuth();
  const {height} = useLayout();
  const translateY = useSharedValue(0);
  const input = [0, height * 0.082, height * 0.087, height * 0.09];
  const defaultDate =
    user && user.ceRenewalDate && user.ceRenewalDate.seconds
      ? new Date(user.ceRenewalDate.seconds * 1000)
      : new Date();
  const [date, setDate] = useState(defaultDate);

  const handleLogout = useCallback(() => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(error => console.log('Error logging out: ', error));
  }, [auth.currentUser]);

  const pickImage = useCallback(async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPhotoShow(result.uri);
        const {uid} = userAuth.currentUser;
        const storageRef = ref(storage, uid);
        const response = await fetch(result.uri);
        try {
          const blob = await response.blob();
          try {
            const uploadTask = uploadBytesResumable(storageRef, blob);

            uploadTask.on(
              'state_changed',
              snapshot => {
                const progress =
                  snapshot.bytesTransferred / snapshot.totalBytes;
                setPhotoProgress(progress);
              },
              error => {
                console.log('error uploading image: ', error);
              },
              () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async downloadURL => {
                    const docRef = await doc(db, 'users', uid);
                    const data = {photo: downloadURL};

                    if (docRef) {
                      await updateDoc(docRef, data);
                      setPhotoShow(null);
                    }
                  },
                );
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

  const onChange = async (event, selectedDate) => {
    if (selectedDate && userAuth.currentUser) {
      setDate(selectedDate);
      const {uid} = userAuth.currentUser;
      const docRef = await doc(db, 'users', uid);
      const data = {ceRenewalDate: selectedDate};
      if (docRef) {
        await updateDoc(docRef, data);
      } else {
        console.log('Not able to retrieve user renewal date');
      }
    }
  };

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

  const year = moment().year();
  const month = moment().month();
  const day = moment().format('D');

  return (
    <Container style={styles.container}>
      <Layout level="4" style={styles.top}>
        <Animated.View style={scaleAvatar}>
          <TouchableOpacity onPress={pickImage}>
            {user.photo && !photoShow && (
              <Image
                source={{uri: user.photo}}
                style={{
                  alignSelf: 'center',
                  width: 96,
                  height: 96,
                  zIndex: 100,
                  marginTop: 32,
                  borderRadius: 9999,
                }}
              />
            )}
            {photoShow && (
              <Image
                source={{uri: photoShow}}
                style={{
                  alignSelf: 'center',
                  width: 96,
                  height: 96,
                  zIndex: 100,
                  marginTop: 32,
                  borderRadius: 9999,
                }}
              />
            )}
          </TouchableOpacity>
        </Animated.View>
      </Layout>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 50}}
      >
        <Layout level="4" style={styles.layout}>
          <View style={styles.flexRow}>
            <Text category="label" style={{marginTop: 16}}>
              Name
            </Text>
            <Text category="p1" style={{marginTop: 16}}>
              {user.name || ''}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.flexRow}>
            <Text category="label">Email</Text>
            {userAuth.currentUser && userAuth.currentUser.email && (
              <Text category="p1">{userAuth.currentUser.email}</Text>
            )}
          </View>
          <Divider style={styles.divider} />
          <View style={styles.flexRow}>
            <Text category="label">Renew Education License</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              onChange={onChange}
              display="default"
              minimumDate={new Date(year, month, day)}
              style={{width: 150, marginRight: 0, marginBottom: 16}}
            />
          </View>
        </Layout>
      </Animated.ScrollView>
      {photoShow && (
        <ProgressBar
          style={{marginBottom: 10}}
          progress={photoProgress}
          color="#02FDAA"
        />
      )}
      <Text
        status="danger"
        onPress={() => handleLogout()}
        style={{textAlign: 'center'}}
      >
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
  divider: {
    backgroundColor: 'background-basic-color-3',
    marginVertical: 12,
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
