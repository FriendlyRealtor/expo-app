import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import {
  Box,
  Button,
  FormControl,
  Icon,
  IconButton,
  Input,
  List,
  Modal,
  ScrollView,
  Select,
  Stack,
  Text,
  View,
} from 'native-base';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { Alert } from 'react-native';
import { AsYouType } from 'libphonenumber-js';
import Bugsnag from '@bugsnag/expo';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { agentContactFormSchema } from '../../utils';
import { db, Colors } from '../../config';
import { getAuth } from 'firebase/auth';
import uuid from 'react-native-uuid';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ContactScreen = () => {
  const userAuth = getAuth();
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { uid } = userAuth.currentUser;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const firebaseData = docSnap.data();

        if (firebaseData.contacts?.length) {
          setContacts(firebaseData.contacts);
        }
      }
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const addContact = async (values, { resetForm }) => {
    try {
      const { uid } = userAuth.currentUser;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const firebaseData = docSnap.data();
        values.id = uuid.v4();
        if (firebaseData.contacts && Array.isArray(firebaseData.contacts)) {
          const updatedContacts = [...firebaseData.contacts, values];
          await updateDoc(docRef, { contacts: updatedContacts });
        } else {
          await updateDoc(docRef, { contacts: [values] });
        }

        Alert.alert('Contact added successfully');
        setModalVisible(false);
        fetchContacts(); // Fetch updated contacts from Firebase
      }
    } catch (error) {
      Bugsnag.notify(error);
    } finally {
      resetForm();
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      const { uid } = userAuth.currentUser;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const firebaseData = docSnap.data();

        if (firebaseData.contacts && Array.isArray(firebaseData.contacts)) {
          const updatedContacts = firebaseData.contacts.filter(
            (contact) => contact.id !== contactId,
          );

          await updateDoc(docRef, { contacts: updatedContacts });
          setContacts(updatedContacts);
        }

        Alert.alert('Contact deleted successfully');
      }
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const filterContacts = (type) => {
    setSelectedType(type);
  };

  const filteredContacts = selectedType
    ? contacts.filter((contact) => contact.type === selectedType)
    : contacts;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar style="auto" />
      <ScrollView paddingX={3}>
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize={32} fontWeight={700}>
            Add Your Contacts
          </Text>
          <IconButton
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            _pressed={{
              bg: 'transparent',
            }}
          >
            <Icon as={MaterialCommunityIcons} name="account-plus" size="2xl" color={Colors.blue} />
          </IconButton>
        </Stack>
        {contacts.length === 0 ? (
          <Formik
            initialValues={{
              name: '',
              phoneNumber: '',
              type: 'client',
            }}
            onSubmit={addContact}
            validationSchema={agentContactFormSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
              return (
                <Box w="100%" mt={8}>
                  <View>
                    <Text my={2} textAlign="center" color="gray.500" fontSize="sm">
                      This is your first time adding a contact.
                    </Text>
                    <FormControl isRequired>
                      <Stack>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                        />
                        {errors.name && touched.name ? (
                          <Text color="red.500">{errors.name}</Text>
                        ) : null}
                      </Stack>
                    </FormControl>
                    <FormControl isRequired>
                      <Stack>
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <Input
                          onChangeText={(nextValue) => {
                            const formatNum = new AsYouType('US').input(nextValue);
                            handleChange('phoneNumber')(formatNum);
                          }}
                          onBlur={handleBlur('phoneNumber')}
                          value={values.phoneNumber}
                          keyboardType="phone-pad"
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <Text color="red.500">{errors.phoneNumber}</Text>
                        ) : null}
                      </Stack>
                    </FormControl>
                    <Stack>
                      <FormControl.Label>Type</FormControl.Label>
                      <Select
                        selectedValue={values.type}
                        minWidth={200}
                        accessibilityLabel="Contact Type"
                        placeholder="Select Type"
                        onValueChange={handleChange('type')}
                      >
                        <Select.Item label="Client" value="client" />
                        <Select.Item label="Lender" value="lender" />
                        <Select.Item label="Agent" value="agent" />
                        <Select.Item label="Title" value="title" />
                        <Select.Item label="Inspector" value="inspector" />
                      </Select>
                    </Stack>
                    <Button
                      my={8}
                      onPress={handleSubmit}
                      isDisabled={!!Object.keys(errors).length && !!Object.keys(touched).length}
                      color="primary.500"
                    >
                      <Text color="white">Add Contact</Text>
                    </Button>
                  </View>
                </Box>
              );
            }}
          </Formik>
        ) : (
          <View>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
              <Formik
                initialValues={{
                  name: '',
                  phoneNumber: '',
                  type: 'client',
                }}
                onSubmit={addContact}
                validationSchema={agentContactFormSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  resetForm,
                }) => {
                  return (
                    <Modal.Content>
                      <Modal.CloseButton
                        onPress={() => {
                          setModalVisible(false);
                          resetForm();
                        }}
                      />
                      <Modal.Header>Add New Contact</Modal.Header>
                      <Modal.Body>
                        <Box w="100%" mt={8}>
                          <View>
                            <Text my={2} textAlign="center" color="gray.500" fontSize="sm">
                              This is your first time adding a contact.
                            </Text>
                            <FormControl isRequired>
                              <Stack>
                                <FormControl.Label>Name</FormControl.Label>
                                <Input
                                  onChangeText={handleChange('name')}
                                  onBlur={handleBlur('name')}
                                  value={values.name}
                                />
                                {errors.name && touched.name ? (
                                  <Text color="red.500">{errors.name}</Text>
                                ) : null}
                              </Stack>
                            </FormControl>
                            <FormControl isRequired>
                              <Stack>
                                <FormControl.Label>Phone Number</FormControl.Label>
                                <Input
                                  onChangeText={(nextValue) => {
                                    const formatNum = new AsYouType('US').input(nextValue);
                                    handleChange('phoneNumber')(formatNum);
                                  }}
                                  onBlur={handleBlur('phoneNumber')}
                                  value={values.phoneNumber}
                                  keyboardType="phone-pad"
                                />
                                {errors.phoneNumber && touched.phoneNumber ? (
                                  <Text color="red.500">{errors.phoneNumber}</Text>
                                ) : null}
                              </Stack>
                            </FormControl>
                            <Stack>
                              <FormControl.Label>Type</FormControl.Label>
                              <Select
                                selectedValue={values.type}
                                minWidth={200}
                                accessibilityLabel="Contact Type"
                                placeholder="Select Type"
                                onValueChange={handleChange('type')}
                              >
                                <Select.Item label="Client" value="client" />
                                <Select.Item label="Lender" value="lender" />
                                <Select.Item label="Agent" value="agent" />
                                <Select.Item label="Title" value="title" />
                                <Select.Item label="Inspector" value="inspector" />
                              </Select>
                            </Stack>
                            <Button
                              my={8}
                              onPress={handleSubmit}
                              isDisabled={
                                !!Object.keys(errors).length && !!Object.keys(touched).length
                              }
                              color="primary.500"
                            >
                              <Text color="white">Add Contact</Text>
                            </Button>
                          </View>
                        </Box>
                      </Modal.Body>
                    </Modal.Content>
                  );
                }}
              </Formik>
            </Modal>
            <View>
              <Select
                selectedValue={selectedType}
                minWidth={200}
                accessibilityLabel="Filter by Type"
                placeholder="Filter by Type"
                onValueChange={filterContacts}
                mt={4}
                mb={2}
              >
                <Select.Item label="All" value="" />
                <Select.Item label="Client" value="client" />
                <Select.Item label="Lender" value="lender" />
                <Select.Item label="Agent" value="agent" />
                <Select.Item label="Title" value="title" />
                <Select.Item label="Inspector" value="inspector" />
              </Select>
              <List width="100%" borderWidth={0}>
                {filteredContacts.map((contact) => (
                  <List.Item
                    key={contact.id}
                    flex={1}
                    my={1}
                    borderBottomWidth={1}
                    borderColor={Colors.black}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <View flex={1}>
                        <Text fontWeight={700} fontSize={20}>
                          {contact.name}
                        </Text>
                        <Text
                          fontSize={10}
                          fontWeight={500}
                          lineHeight={20}
                          color={Colors.darkGray}
                        >
                          {contact.phoneNumber}
                        </Text>
                        <Text
                          fontSize={10}
                          fontWeight={700}
                          lineHeight={20}
                          color={Colors.mediumGray}
                        >
                          {contact.type}
                        </Text>
                      </View>
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          variant="ghost"
                          onPress={() => {
                            Linking.openURL(`tel:+1${contact.phoneNumber}`);
                          }}
                          icon={
                            <Icon
                              as={MaterialCommunityIcons}
                              name="phone-hangup"
                              size="sm"
                              color="black"
                            />
                          }
                        />
                        <IconButton
                          variant="ghost"
                          onPress={() => {
                            Linking.openURL(`sms:+1${contact.phoneNumber}`);
                          }}
                          icon={
                            <Icon
                              as={MaterialCommunityIcons}
                              name="message"
                              size="sm"
                              color="#02FDAA"
                            />
                          }
                        />
                        <IconButton
                          variant="ghost"
                          onPress={() => {
                            deleteContact(contact.id);
                          }}
                          icon={
                            <Icon
                              as={MaterialCommunityIcons}
                              name="trash-can-outline"
                              size="sm"
                              color="red.500"
                            />
                          }
                        />
                      </Stack>
                    </Stack>
                  </List.Item>
                ))}
              </List>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
