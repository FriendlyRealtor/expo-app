import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Image, View, Animated, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../config';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Layout, List, ListItem, Input } from '@ui-kitten/components';
import { Button, Divider, Container, FormErrorMessage, Text } from '../../components';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { ProgressBar } from 'react-native-paper';
import { useLayout } from '../../hooks';
// import { User } from '../../providers/types';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { SettingScreenStyles } from './SettingScreenStyles';
import { StatusBar } from 'expo-status-bar';
import { inject, observer } from 'mobx-react';

export const SettingScreen = inject('appStore')(
  observer(({ appStore }) => {
    const styles = SettingScreenStyles;
    const { user, signOut, cmaRows, cmaFromDatabase, deleteCMAItem, deleteUserAccount } = appStore;

    const [photoShow, setPhotoShow] = useState(null);
    const [photoProgress, setPhotoProgress] = useState<number | undefined>(undefined);
    const [errorState, setErrorState] = useState('');

    const userAuth = getAuth();
    const { height } = useLayout();
    const translateY = useSharedValue(0);
    const input = [0, height * 0.082, height * 0.087, height * 0.09];
    const defaultDate =
      user && user.ceRenewalDate && user.ceRenewalDate.seconds
        ? new Date(user.ceRenewalDate.seconds * 1000)
        : new Date();
    const [date, setDate] = useState(defaultDate);
    const [value, setValue] = useState(user.referralLink || '');
    const [bio, setBio] = useState(user.bio || '');
    const [locations, setLocations] = useState(user.location || '');

    const [localCmaRows, setLocalCmaRows] = useState();
    const isFocused = useIsFocused();

		useEffect(() => {
			setPhotoShow(user.photo)
		}, [user])

    useEffect(() => {
      const retrieveRows = async () => {
        if (user.cmaEvaluations) {
          await cmaFromDatabase(userAuth);
          setLocalCmaRows(cmaRows);
        }
      };
      retrieveRows();
    }, [isFocused]);

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
          const { uid } = userAuth.currentUser;
          const storageRef = ref(storage, uid);
          const response = await fetch(result.uri);
          try {
            const blob = await response.blob();
            try {
              const uploadTask = uploadBytesResumable(storageRef, blob);

              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress = snapshot.bytesTransferred / snapshot.totalBytes;

									if (progress) {
										setPhotoProgress(progress);
									}
                },
                (error) => {
                  console.log('error uploading image: ', error);
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const docRef = await doc(db, 'users', uid);
                    const data = { photo: downloadURL };

                    if (docRef) {
                      await updateDoc(docRef, data);
                      setPhotoShow(downloadURL);
                    }
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

    const onChange = async (event, selectedDate) => {
      if (selectedDate && userAuth.currentUser) {
        setDate(selectedDate);
        const { uid } = userAuth.currentUser;
        const docRef = await doc(db, 'users', uid);
        const data = { ceRenewalDate: selectedDate };
        if (docRef) {
          await updateDoc(docRef, data);
        } else {
          console.log('Not able to retrieve user renewal date');
        }
      }
    };

    const scaleAvatar = useAnimatedStyle(() => {
      const scale = interpolate(translateY.value, input, [1, 1, 0.6, 0.6]);
      const transY = interpolate(translateY.value, input, [0, -40, -88, -88], Extrapolate.CLAMP);
      return {
        transform: [{ scale: scale }, { translateY: transY }],
      };
    }, []);

    const scrollHandler = useAnimatedScrollHandler((event) => {
      translateY.value = event.contentOffset.y;
    });

    const handleDeleteItem = async (index) => {
      try {
        await deleteCMAItem(userAuth, user, index);
        setLocalCmaRows(cmaRows);
      } catch (error) {
        setErrorState('error deleting item');
      }
    };

    const RenderItemIcon = (props: { index: number }) => (
      <Button
        title=""
        style={{ padding: 0, margin: 0 }}
        onPress={() => handleDeleteItem(props.index)}
      >
        <Icon name="trash" color="red" size={20} />
      </Button>
    );

    const renderItem = ({ item, index }) => {
      return (
        <ListItem
          title={`${index + 1}. ${item.location}`}
          description={`Estimated Value $${item.price}`}
          accessoryRight={<RenderItemIcon index={index} />}
          style={styles.listItem}
        />
      );
    };

    const updateReferralLink = async () => {
      const { uid } = userAuth.currentUser;
      const docRef = await doc(db, 'users', uid);
      const data = { referralLink: value };

      if (docRef) {
        await updateDoc(docRef, data);
      }
    };

    const updateProfileBio = async () => {
      const { uid } = userAuth.currentUser;
      const docRef = await doc(db, 'users', uid);
      const data = { referralLink: value };

      if (docRef) {
        await updateDoc(docRef, data);
      }
    };

    const updateServiceLocation = async () => {
      const { uid } = userAuth.currentUser;
      const docRef = await doc(db, 'users', uid);
      const data = { referralLink: value };

      if (docRef) {
        await updateDoc(docRef, data);
      }
    };

    const year = moment().year();
    const month = moment().month();
    const day = moment().format('D');

    return (
      <Container style={styles.container}>
        <StatusBar style="auto" />
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            flexDirection: 'row',
            paddingTop: 24,
            paddingRight: 32,
          }}
        >
          <Text status="danger" onPress={() => signOut()}>
            LOG OUT
          </Text>
        </View>
        <View style={styles.layout}>
          <Animated.View style={scaleAvatar}>
            <TouchableOpacity onPress={pickImage}>
              {user.photo && !photoShow && (
                <Image
                  source={{ uri: user.photo }}
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
                  source={{ uri: photoShow }}
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
          <View style={styles.flexRow}>
            <Text category="label">Username</Text>
            <Text category="p1" style={{ marginTop: 16, fontFamily: 'Ubuntu' }}>
              {user.userName || ''}
            </Text>
          </View>
          <Divider />
          <View style={styles.flexRow}>
            <Text category="label" style={{ marginTop: 16 }}>
              Name
            </Text>
            <Text category="p1" style={{ marginTop: 16, fontFamily: 'Ubuntu' }}>
              {user.name || ''}
            </Text>
          </View>
          <Divider />
          <View style={styles.flexRow}>
            <Text category="label">Email</Text>
            {userAuth.currentUser && userAuth.currentUser.email && (
              <Text category="p1" style={{ fontFamily: 'Ubuntu' }}>
                {userAuth.currentUser.email}
              </Text>
            )}
          </View>
          <Divider />
          <View style={styles.flexRow}>
            <Text category="label">Bio</Text>
            <Input
              placeholder="Place enter bio"
              value={bio}
              onChangeText={(nextValue) => setBio(nextValue)}
              onBlur={() => updateProfileBio()}
              size="small"
              style={styles.input}
            />
          </View>
          <Divider />
          <View style={styles.flexRow}>
            <Text category="label">Service Areas</Text>
            <Input
              placeholder="Place your service areas"
              value={locations}
              onChangeText={(nextValue) => setLocations(nextValue)}
              onBlur={() => updateServiceLocation()}
              size="small"
              style={styles.input}
            />
          </View>
          <Divider />
          <View style={styles.flexRow}>
            <Text category="label">Renew Education License</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              onChange={onChange}
              display="default"
              minimumDate={new Date(year, month, day)}
            />
          </View>
          <Divider />
          <View style={styles.flexRow}>
            <Text category="label">Referral Link</Text>
            <Text
              style={{ fontSize: 10, flexWrap: 'wrap' }}
            >{`https://friendlyrealtor.app/profile/${user.userName}`}</Text>
          </View>
          <Divider />
          <View style={styles.flexRow}>
            <Text category="label">App Version</Text>
            <Text>{Constants.manifest.version}</Text>
          </View>
          <Divider />
          {Device.osVersion && (
            <View style={styles.flexRow}>
              <Text category="label">IOS Version</Text>
              <Text>{Device.osVersion}</Text>
            </View>
          )}
          {Device.osVersion && <Divider />}
          <View style={styles.flexRow}>
            <Text category="label" status="danger">
              Delete Account
            </Text>
            <Button
              onPress={() => {
                try {
                  deleteUserAccount();
                } catch (error) {
                  console.log('error', error);
                }
              }}
            >
              <Text>Delete</Text>
            </Button>
          </View>
        </View>
        <View style={styles.rows}>
          {localCmaRows && _.size(localCmaRows) > 0 ? (
            <View>
              <Text category="h6" style={{ marginTop: 24, textAlign: 'center' }}>
                CMA History
              </Text>
              <View style={{ textAlign: 'center' }}>
                <List
                  data={localCmaRows}
                  ItemSeparatorComponent={Divider}
                  renderItem={renderItem}
                />
              </View>
            </View>
          ) : null}
          {photoProgress && photoProgress !== 1 && (
            <ProgressBar style={{ marginBottom: 10 }} progress={photoProgress} color="#02FDAA" />
          )}
          {errorState !== '' ? <FormErrorMessage error={errorState} visible={true} /> : null}
        </View>
      </Container>
    );
  }),
);
