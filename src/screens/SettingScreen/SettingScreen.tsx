import React, { useEffect, useState, useCallback } from 'react';
import { Linking, ScrollView, Animated, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../config';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Chip, Container, FormErrorMessage } from '../../components';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { ProgressBar } from 'react-native-paper';
import { useLayout } from '../../hooks';
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
import Purchases from 'react-native-purchases';
import {
  Image,
  Button,
  Heading,
  Divider,
  Text,
  Link,
  HStack,
  View,
  Input,
  TextArea,
} from 'native-base';
import { validatePhoneNumberLength, AsYouType } from 'libphonenumber-js';

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
    const [photoShow, setPhotoShow] = useState(null);
    const [photoProgress, setPhotoProgress] = useState<number | undefined>(undefined);
    const [errorState, setErrorState] = useState<string>('');
    const [value, setValue] = useState(user.referralLink || '');
    const [bio, setBio] = useState(user.bio || '');
    const [locations, setLocations] = useState<string[]>(user.serviceZipCodes || []);
    const [saving, setSaving] = useState<boolean>(false);

    const [phoneNumber, setPhoneNumber] = useState(user.phone || '');
    const [chipValue, setChipValue] = useState<string>('');
    const [localCmaRows, setLocalCmaRows] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
      setPhotoShow(user.photo);
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

          setErrorState('');
        }
      } catch (err) {
        setErrorState('error uploading/selecting image from camera.');
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
      return {
        /*<ListItem
          title={`${index + 1}. ${item.location}`}
          description={`Estimated Value $${item.price}`}
          accessoryRight={<RenderItemIcon index={index} />}
          style={styles.listItem}
			/>*/
      };
    };

    const updateProfileBio = async () => {
      const { uid } = userAuth.currentUser;
      const docRef = await doc(db, 'users', uid);
      const data = { bio };

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

    const updatePhoneNumber = async () => {
      const { uid } = userAuth.currentUser;
      const docRef = await doc(db, 'users', uid);
      const data = { phone: value };

      if (docRef) {
        await updateDoc(docRef, data);
      }
    };

    const visitPublicProfile = () => {
      const publicProfileURL = `https://friendlyrealtor.app/profile/${
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

        if (validatePhoneNumberLength(phoneNumber, 'US')) {
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
        console.log('Error restoring purchases', error);
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
                    {locations.map((loc, index) => (
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
                        console.log('error', error);
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
