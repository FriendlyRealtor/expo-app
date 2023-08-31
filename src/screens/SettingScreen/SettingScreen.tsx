import * as Device from 'expo-device';
import * as ImagePicker from 'expo-image-picker';

import { Alert, Animated, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { AsYouType, validatePhoneNumberLength } from 'libphonenumber-js';
import {
  Button,
  Divider,
  HStack,
  Heading,
  Image,
  Input,
  Link,
  Text,
  TextArea,
  View,
} from 'native-base';
import { Chip, Container, FormErrorMessage } from '../../components';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import React, { useCallback, useEffect, useState } from 'react';
import { db, storage } from '../../config';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { inject, observer } from 'mobx-react';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProgressBar } from 'react-native-paper';
import Purchases from 'react-native-purchases';
import { SettingScreenStyles } from './SettingScreenStyles';
import { StatusBar } from 'expo-status-bar';
import _ from 'lodash';
import { getAuth } from 'firebase/auth';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { useLayout } from '../../hooks';

export const SettingScreen = inject('appStore')(
  observer(({ appStore }) => {
    const styles = SettingScreenStyles;
    const { user, signOut, cmaRows, cmaFromDatabase, deleteCMAItem, deleteUserAccount } = appStore;

    const userAuth = getAuth();
    const { height } = useLayout();
    const translateY = useSharedValue(0);
    const input = [0, height * 0.082, height * 0.087, height * 0.09];
    const defaultDate =
      user && user.ceRenewalDate && user.ceRenewalDate.seconds
        ? new Date(user.ceRenewalDate.seconds * 1000)
        : new Date();
    const [date, setDate] = useState(defaultDate);
    const [videoUri, setVideoUri] = useState(user.video || null);
    const [videoProgress, setVideoProgress] = useState<number | undefined>(undefined);
    const [photoShow, setPhotoShow] = useState(null);
    const [photoProgress, setPhotoProgress] = useState<number | undefined>(undefined);
    const [errorState, setErrorState] = useState<string>('');
    const [bio, setBio] = useState(user.bio || '');
    const [locations, setLocations] = useState<string[]>(user.serviceZipCodes || []);
    const [saving, setSaving] = useState<boolean>(false);

    const [phoneNumber, setPhoneNumber] = useState(user.phone || '');
    const [chipValue, setChipValue] = useState<string>('');
    const [localCmaRows, setLocalCmaRows] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
      if (user?.photo) {
        setPhotoShow(user.photo);
      }

      if (user?.video) {
        setVideoUri(user.video);
      }
    }, [user]);

    useEffect(() => {
      const retrieveRows = async () => {
        if (user.cmaEvaluations) {
          await cmaFromDatabase(userAuth);
          setLocalCmaRows(cmaRows);
        }
      };
      retrieveRows();
    }, [isFocused]);

    const pickVideo = useCallback(async () => {
      try {
        const { granted } = await Camera.requestCameraPermissionsAsync();
        if (!granted) {
          setErrorState('Camera permission is required to access videos.');
          return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: false,
          quality: 1,
        });

        if (!result.cancelled) {
          setVideoUri(result.uri);
          setErrorState('');

          const { uid } = userAuth.currentUser;
          const storageRef = ref(storage, `video/${uid}`);

          // Convert the video to a blob
          const response = await fetch(result.uri);
          const videoBlob = await response.blob();

          // Upload video blob to Firebase Storage
          const uploadTask = uploadBytesResumable(storageRef, videoBlob);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = snapshot.bytesTransferred / snapshot.totalBytes;
              if (progress) {
                setVideoProgress(progress);
              }
            },
            (error) => {
              Bugsnag.notify(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                const docRef = await doc(db, 'users', uid);
                const data = { video: downloadURL };
                if (docRef) {
                  await updateDoc(docRef, data);
                  setVideoUri(downloadURL);
                }
              });
            },
          );
        }
      } catch (err) {
        Bugsnag.notify(err);
        setErrorState('Error uploading/selecting video.');
      }
    }, []);

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
          const blob = await response.blob();
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
              Bugsnag.notify(error);
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

          setErrorState('');
        }
      } catch (err) {
        Bugsnag.notify(err);
        setErrorState('error uploading/selecting image from camera.');
      }
    }, []);

    const onChange = async (event, selectedDate) => {
      if (selectedDate && userAuth.currentUser) {
        try {
          setDate(selectedDate);
          const { uid } = userAuth.currentUser;
          const docRef = await doc(db, 'users', uid);
          const data = { ceRenewalDate: selectedDate };
          if (docRef) {
            await updateDoc(docRef, data);
          }
        } catch (error) {
          Bugsnag.notify(error);
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

    const visitPublicProfile = () => {
      const publicProfileURL = `https://friendlyrealtor.app/agent/${
        user.username || user.userName
      }`;
      Linking.openURL(publicProfileURL);
    };

    const handleAddChip = () => {
      if (/^\d{5}$/.test(chipValue.trim())) {
        setLocations([...locations, chipValue]);
        setChipValue('');
        setErrorState('');
      } else {
        setErrorState('Make sure the zip code is a valid 5 digit number.');
      }
    };

    const handleDeleteChip = (index: number) => {
      const updatedChips = [...locations];
      updatedChips.splice(index, 1);
      setLocations(updatedChips);
    };

    const handleSaveToFirebase = async () => {
      setSaving(true);

      const { uid } = userAuth.currentUser;
      try {
        const docRef = await doc(db, 'users', uid);

        if (phoneNumber?.length > 0 && validatePhoneNumberLength(phoneNumber, 'US')) {
          setErrorState('Invalid phone number length, US.');
          return;
        }
        const data = {
          phone: phoneNumber,
          bio: bio,
          ceRenewalDate: date,
          serviceZipCodes: locations,
        };

        if (docRef) {
          await updateDoc(docRef, data);
          setErrorState('');
        }
      } catch (event) {
        Bugsnag.notify(event);
        setErrorState('Error saving settings', event);
      } finally {
        setSaving(false);
      }
    };

    const restorePurchase = async () => {
      try {
        const restoredEntitlements = await Purchases.restorePurchases();
        if (restoredEntitlements.length > 0) {
          Alert.alert('Successfully restored purchases.');
        } else {
          Alert.alert('No purchases to restore.');
        }
      } catch (error) {
        Bugsnag.notify(error);
        Alert.alert('Error restoring purchases.', error);
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
            paddingVertical: 24,
            paddingRight: 32,
          }}
        >
          <Text fontSize="md" bold onPress={() => signOut()}>
            LOG OUT
          </Text>
        </View>
        <View>
          {photoProgress && photoProgress !== 1 && (
            <ProgressBar style={{ marginBottom: 10 }} progress={photoProgress} color="#02FDAA" />
          )}
        </View>
        <View>
          <View style={styles.layout}>
            <HStack mt={4} mr={6} justifyContent="flex-end">
              <Button
                onPress={handleSaveToFirebase}
                isLoading={saving}
                isLoadingText="Save"
                spinnerPlacement="end"
              >
                Save
              </Button>
            </HStack>
            <View textAlign="center">
              {errorState != '' ? <FormErrorMessage error={errorState} visible={true} /> : null}
            </View>
            <Animated.View style={scaleAvatar}>
              <TouchableOpacity onPress={pickImage}>
                {user.photo && !photoShow && (
                  <Image
                    source={{ uri: user.photo }}
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    alt="User Profile Photo"
                    style={{
                      alignSelf: 'center',
                      width: 96,
                      height: 96,
                      marginTop: 8,
                      marginBottom: 32,
                    }}
                  />
                )}
                {photoShow && (
                  <Image
                    source={{ uri: photoShow }}
                    rounded="full"
                    display="flex"
                    alignItems="center"
                    alt="User Profile Photo"
                    style={{
                      alignSelf: 'center',
                      width: 96,
                      height: 96,
                      marginTop: 8,
                      marginBottom: 32,
                    }}
                  />
                )}
              </TouchableOpacity>
            </Animated.View>
            <View style={{ height: 450 }}>
              <ScrollView>
                <HStack
                  alignItems="center"
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Username</Heading>
                  <Text fontSize="md">{user.username || user.userName || ''}</Text>
                </HStack>
                <Divider thickness={1} bg="black" />
                <HStack
                  alignItems="center"
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Name</Heading>
                  <Text fontSize="md">{user.name || ''}</Text>
                </HStack>
                <Divider thickness={1} bg="black" />
                <HStack
                  alignItems="center"
                  space={2}
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Email</Heading>
                  {userAuth.currentUser && userAuth.currentUser.email && (
                    <Text fontSize="md">{userAuth.currentUser.email}</Text>
                  )}
                </HStack>
                <Divider thickness={1} bg="black" />
                <HStack
                  alignItems="center"
                  space={2}
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Phone Number</Heading>
                  <View flex={1}>
                    <Input
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChangeText={(nextValue) => {
                        {
                          const formatNum = new AsYouType('US').input(nextValue);
                          setPhoneNumber(formatNum);
                        }
                      }}
                      width="100%"
                    />
                  </View>
                </HStack>
                <Divider thickness={1} bg="black" />
                <HStack
                  alignItems="center"
                  space={2}
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Bio</Heading>
                  <TextArea
                    placeholder="Tell your viewers more about you."
                    autoCompleteType="false"
                    value={bio}
                    multiline={true}
                    onChangeText={(nextValue) => setBio(nextValue)}
                    size="sm"
                    h={20}
                    w="75%"
                    maxW="300"
                    fontSize="sm"
                  />
                </HStack>
                <Divider thickness={1} bg="black" />
                <HStack
                  alignItems="center"
                  space={2}
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Service Areas By ZipCode</Heading>
                  <View display="flex" flexDirection="column" flex={1}>
                    {!!locations?.length &&
                      locations.map((loc, index) => (
                        <Chip label={loc} onPress={() => handleDeleteChip(index)} />
                      ))}
                    <Input
                      placeholder="Enter service locations by zip code."
                      value={chipValue}
                      onChangeText={(text) => setChipValue(text)}
                      onSubmitEditing={handleAddChip}
                      keyboardType="numeric"
                      width="100%"
                    />
                  </View>
                </HStack>
                <Divider thickness={1} bg="black" />
                <HStack
                  alignItems="center"
                  space={2}
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Upload Profile Video</Heading>
                  <Button onPress={pickVideo}>Pick Video</Button>
                </HStack>
                {videoProgress && videoProgress !== 1 && (
                  <ProgressBar
                    style={{ marginBottom: 10 }}
                    progress={videoProgress}
                    color="#02FDAA"
                  />
                )}
                {videoUri && (
                  <Video
                    source={{ uri: videoUri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    useNativeControls
                    style={{ width: '100%', height: 200 }}
                  />
                )}
                <Divider thickness={1} bg="black" />
                <HStack
                  alignItems="center"
                  space={2}
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Renew Education License</Heading>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    onChange={onChange}
                    display="default"
                    minimumDate={new Date(year, month, day)}
                  />
                </HStack>
                <Divider thickness={1} bg="black" />
                {user.username ||
                  (user.userName && (
                    <HStack
                      alignItems="center"
                      paddingY={2}
                      paddingX={4}
                      justifyContent="space-between"
                    >
                      <Heading size="xs">Referral Link</Heading>
                      <Text fontSize="md">
                        <Link onPress={visitPublicProfile}>Visit Public Profile</Link>
                      </Text>
                    </HStack>
                  ))}
                {/*<Divider thickness={1} bg="black" />
									<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 16 }}>
										<Button onPress={() => { try { restorePurchase(); } catch (error) { console.log('error', error); } }}>
											<Text status="danger">Restore Purchases</Text>
										</Button>
									</View>*/}
                <Divider thickness={1} bg="black" />
                <HStack
                  alignItems="center"
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">App Version</Heading>
                  <Text fontSize="md">{Constants?.manifest?.version}</Text>
                </HStack>
                <Divider thickness={1} bg="black" />
                {Device.osVersion && (
                  <HStack
                    alignItems="center"
                    paddingY={2}
                    paddingX={4}
                    justifyContent="space-between"
                  >
                    <Heading size="sm">Ios Version</Heading>
                    <Text fontSize="md">{Device.osVersion}</Text>
                  </HStack>
                )}
                {Device.osVersion && <Divider thickness={1} bg="black" />}
                <HStack
                  alignItems="center"
                  paddingY={2}
                  paddingX={4}
                  justifyContent="space-between"
                >
                  <Heading size="xs">Delete Account</Heading>
                  <Button
                    onPress={() => {
                      try {
                        deleteUserAccount();
                        setErrorState('');
                      } catch (error) {
                        Bugsnag.notify(error);
                        setErrorState('Error deleting user account');
                      }
                    }}
                    colorScheme="red"
                    size="sm"
                  >
                    <Text fontSize="md" color="white">
                      Delete
                    </Text>
                  </Button>
                </HStack>
              </ScrollView>
              <View style={styles.rows}>
                {/*localCmaRows && _.size(localCmaRows) > 0 ? (
								<View>
									<Text category="h6" style={{ marginTop: 24, textAlign: 'center' }}>
										CMA History
									</Text>
									<View style={{ textAlign: 'center' }}>
										<List data={localCmaRows} ItemSeparatorComponent={Divider} renderItem={renderItem} />
									</View>
								</View>
							) : null*/}
              </View>
            </View>
          </View>
        </View>
      </Container>
    );
  }),
);
