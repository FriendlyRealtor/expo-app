import React, {useEffect, useState, useCallback, useContext} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {auth, db} from '../config';
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
import {useLayout} from '../hooks';
import {AuthenticatedUserContext} from '../providers';
import * as ImagePicker from 'expo-image-picker';

export const SettingScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const {user} = useContext(AuthenticatedUserContext);

  const [verifiedEmail, setVerifiedEmail] = useState([false]);
  const [userEmail, setUserEmail] = useState([]);
  const userAuth = getAuth();
  const {height} = useLayout();
  const translateY = useSharedValue(0);
  const input = [0, height * 0.082, height * 0.087, height * 0.09];

  const defaultDate =
    user && user.ceRenewalDate && user.ceRenewalDate.seconds
      ? new Date(user.ceRenewalDate.seconds * 1000)
      : new Date();
  const [date, setDate] = useState(defaultDate);

  useEffect(() => {
    onAuthStateChanged(userAuth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserEmail([user.email]);
        setVerifiedEmail([user.emailVerified.toString()]);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  const pickImage = useCallback(async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.uri && userAuth.currentUser) {
      const {uid} = userAuth.currentUser;
      const docRef = await doc(db, 'users', uid);
      const data = {photo: result.uri};
      if (docRef) {
        await updateDoc(docRef, data);
      } else {
        console.log('No such document!');
      }
    }
  }, []);

  const onChange = async (event, selectedDate) => {
    setDate(selectedDate || date);
    if (date && userAuth.currentUser) {
      const {uid} = userAuth.currentUser;
      const docRef = await doc(db, 'users', uid);
      const data = {ceRenewalDate: date};
      if (docRef) {
        await updateDoc(docRef, data);
      } else {
        console.log('No such document!');
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

  return (
    <Container style={styles.container}>
      <Layout level="4" style={styles.top}>
        <Animated.View style={scaleAvatar}>
          <TouchableOpacity onPress={pickImage}>
            {user.photo && (
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
            <Text category="p1">{userEmail}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.flexRow}>
            <Text category="label">Email Verified</Text>
            <Text category="p1">{verifiedEmail}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.flexRow}>
            <Text category="label">Renew Edu License</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              onChange={onChange}
              minimumDate={new Date()}
              display="default"
              style={{width: 150, marginRight: 0, marginBottom: 16}}
            />
          </View>
        </Layout>
      </Animated.ScrollView>
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
