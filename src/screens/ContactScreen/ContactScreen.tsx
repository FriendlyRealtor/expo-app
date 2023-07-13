import {
  Box,
  Button,
  Container,
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
  WarningOutlineIcon,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { Alert } from 'react-native';
import { AsYouType } from 'libphonenumber-js';
import Bugsnag from '@bugsnag/expo';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { agentContactFormSchema } from '../../utils';
import { db } from '../../config';
import { getAuth } from 'firebase/auth';

export const ContactScreen = () => {
  const userAuth = getAuth();
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

        if (firebaseData.contacts && Array.isArray(firebaseData.contacts)) {
          const updatedContacts = [...firebaseData.contacts, values];
          await updateDoc(docRef, { contacts: updatedContacts });
        } else {
          await updateDoc(docRef, { contacts: [values] });
        }

        Alert.alert('Contact added successfully');
        fetchContacts(); // Fetch updated contacts from Firebase
      }
    } catch (error) {
      Bugsnag.notify(error);
    } finally {
      resetForm();
    }
  };

  const handleOpenForm = () => {
    setContacts([]);
  };

  return (
    <View w="100%" px={8} textAlign="center">
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
        <Container my={8}>
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
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => {
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
          <IconButton
            my={4}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Icon as={MaterialCommunityIcons} name="plus-circle-outline" size="2xl" color="black" />
          </IconButton>
          <ScrollView width="100%">
            {contacts.map((contact) => (
              <View key={contact.id} my={2}>
                <Text>{contact.name}</Text>
                <Text>{contact.phoneNumber}</Text>
                <Text>{contact.type}</Text>
              </View>
            ))}
          </ScrollView>
        </Container>
      )}
    </View>
  );
};
