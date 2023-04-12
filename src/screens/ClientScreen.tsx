import React, { useState } from 'react';
import { Layout, Text, List, ListItem, Divider, Card, Input } from '@ui-kitten/components';
import { View, Modal, Alert, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../components';
import { Formik, useFormik } from 'formik';
import { passwordResetSchema } from '../utils';
import { FormErrorMessage } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../config';
import { getAuth } from 'firebase/auth';

export const AddDeal = ({ modalVisible, setModalVisible }) => {
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      height: 600,
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    close: {
      position: 'absolute',
      background: 'red',
      color: 'white',
      top: 10,
      right: 10,
    },
  });

	const userAuth = getAuth();

  const { values, touched, errors, handleChange, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues: {
      address: '',
      closingDate: new Date(),
      clientName: '',
      clientPhone: '',
      agentName: '',
      agentPhone: '',
      inspectorName: '',
      inspectorPhone: '',
      titleName: '',
      titlePhone: '',
      lenderName: '',
      lenderPhone: '',
    },
    onSubmit: (submitValues) => {
      handleAddDeal(submitValues);
    },
  });

  const [errorState, setErrorState] = useState('');
  const defaultDate = new Date();

  const handleAddDeal = async (data) => {
    console.log('values', data);
		const { uid } = userAuth.currentUser;
    const docRef = await doc(db, 'users', uid);

		if (docRef) {
			// await updateDoc(docRef, data);
		}
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.close}>
            <Icon style={{ marginRight: 8 }} name="close" size={24} />
          </Pressable>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={passwordResetSchema}
            onSubmit={(values) => handleAddDeal(values)}
          >
            {() => (
              <ScrollView style={{ width: '100%' }}>
                <View style={{ marginBottom: 16 }}>
									<Input
										name="address"
										placeholder="Enter Address"
										label="Address"
										value={values.address}
										onChangeText={handleChange('address')}
									/>
									<FormErrorMessage error={errors.address} visible={touched.address} />
								</View>
                <View>
                  <Text>Closing Date:</Text>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={values.closingDate}
                    mode={'date'}
                    display="default"
										onChange={() => {
											handleChange('closingDate');
										}}
                    style={{ width: '100%', marginBottom: 16 }}
                  />
                </View>
                <FormErrorMessage error={errors.closingDate} visible={touched.closingDate} />
                <View style={{ marginBottom: 16 }}>
                  <Input
                    name="clientName"
                    placeholder="Enter Full Name"
                    label="Client"
                    value={values.clientName}
                    onChangeText={handleChange('clientName')}
                  />
                  <FormErrorMessage error={errors.clientName} visible={touched.clientName} />
                  <Input
                    name="clientPhone"
                    placeholder="Enter Phone Number"
                    keyboardType="numeric"
                    value={values.clientPhone}
                    onChangeText={handleChange('clientPhone')}
                    style={{ marginTop: 8 }}
                  />
                  <FormErrorMessage error={errors.clientPhone} visible={touched.clientPhone} />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <Input
                    name="agentName"
                    label="Agent"
                    placeholder="Enter Full Name"
                    value={values.agentName}
                    onChangeText={handleChange('agentName')}
                  />
                  <FormErrorMessage error={errors.agentName} visible={touched.agentName} />
                  <Input
                    name="agentPhone"
                    placeholder="Enter Phone Number"
                    keyboardType="numeric"
                    value={values.agentPhone}
                    onChangeText={handleChange('agentPhone')}
                    style={{ marginTop: 8 }}
                  />
                  <FormErrorMessage error={errors.agentPhone} visible={touched.agentPhone} />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <Input
                    name="inspectorName"
                    label="Inspector"
                    placeholder="Enter Full Name"
                    value={values.inspectorName}
                    onChangeText={handleChange('inspectorName')}
                  />
                  <FormErrorMessage error={errors.inspectorName} visible={touched.inspectorName} />
                  <Input
                    name="inspectorPhone"
                    placeholder="Enter Phone Number"
                    keyboardType="numeric"
                    value={values.inspectorPhone}
                    onChangeText={handleChange('inspectorPhone')}
                    style={{ marginTop: 8 }}
                  />
                  <FormErrorMessage error={errors.inspectorPhone} visible={touched.inspectorPhone} />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <Input
                    name="titleName"
                    label="Title Company"
                    placeholder="Enter Full Name"
                    value={values.titleName}
                    onChangeText={handleChange('titleName')}
                  />
                  <FormErrorMessage error={errors.titleName} visible={touched.titleName} />
                  <Input
                    name="titlePhone"
                    placeholder="Enter Phone Number"
                    keyboardType="numeric"
                    value={values.titlePhone}
                    onChangeText={handleChange('titlePhone')}
                    style={{ marginTop: 8 }}
                  />
                  <FormErrorMessage error={errors.titlePhone} visible={touched.titlePhone} />
                </View>
                <View style={{ marginBottom: 16 }}>
                  <Input
                    name="lenderName"
                    placeholder="Enter Full Name"
                    label="Lender"
                    value={values.lenderName}
                    onChangeText={handleChange('lenderName')}
                  />
                  <FormErrorMessage error={errors.lenderName} visible={touched.lenderName} />
                  <Input
                    name="lenderPhone"
                    placeholder="Enter Phone Number"
                    keyboardType="numeric"
                    value={values.lenderPhone}
                    onChangeText={handleChange('lenderPhone')}
                    style={{ marginTop: 8 }}
                  />
                  <FormErrorMessage error={errors.lenderPhone} visible={touched.lenderPhone} />
                </View>
                <Button
                  style={{
                    width: 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 8,
                    marginTop: 16,
                    backgroundColor: '#02FDAA',
                    fontFamily: 'Ubuntu',
                  }}
                  onPress={handleSubmit}
                >
                  <Text>Save</Text>
                </Button>
              </ScrollView>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export const ClientScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItemHeader = (headerProps, item) => (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text category="h6" {...headerProps} status="info">
        {item.item.address}
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Icon
          {...headerProps}
          name="pencil-square-o"
          size={24}
          onPress={() => {
            console.log('edit item');
          }}
        />
        <Icon
          {...headerProps}
          name="trash"
          size={24}
          color="red"
          onPress={() => {
            console.log('delete item');
          }}
        />
      </View>
    </View>
  );

  const renderItemFooter = (footerProps, item) => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text {...footerProps}>Status: {item.item.status}</Text>
        <Text {...footerProps}>Closing: {item.item.closingDate}</Text>
      </View>
    );
  };

  const rightItem = (tel: string) => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Icon
          style={{ marginRight: 8 }}
          name="phone"
          size={24}
          onPress={() => {
            Linking.openURL(`tel:+1${tel}`);
          }}
        />
        <Icon
          style={{ marginRight: 8 }}
          name="commenting"
          size={24}
          color="#02FDAA"
          onPress={() => {
            Linking.openURL(`sms:+1${tel}`);
          }}
        />
      </View>
    );
  };

  const renderItem2 = ({ item, index }) => {
    return (
      <ListItem
        title={item.name}
        description={item.type}
        accessoryRight={() => rightItem(item.tel)}
      />
    );
  };

  const renderItem = (item) => {
    return (
      <Card
        status="basic"
        header={(headerProps) => renderItemHeader(headerProps, item)}
        footer={(footerProps) => renderItemFooter(footerProps, item)}
      >
        <List data={item.item.data} ItemSeparatorComponent={Divider} renderItem={renderItem2} />
      </Card>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <View>
        <AddDeal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        <Icon
          name="plus-circle"
          size={24}
          onPress={() => {
            setModalVisible(true);
          }}
          style={{ textAlign: 'right', marginRight: 16, padding: 8 }}
        />
      </View>
      <List
        data={[
          {
            address: '123 main st',
            closingDate: '10/19/2023',
            status: 'active',
            data: [
              {
                name: 'Montrell Jubilee',
                tel: '2409064819',
                type: 'client',
              },
              {
                name: 'Lender 1',
                tel: '2409064819',
                type: 'lender',
              },
              {
                name: 'Inspector 1',
                tel: '2409064819',
                type: 'inspector',
              },
              {
                name: 'Title 1',
                tel: '2409064819',
                type: 'title',
              },
              {
                name: 'Agent 1',
                tel: '2409064819',
                type: 'agent',
              },
            ],
          },
          {
            address: '123 main st',
            closingDate: '10/19/2023',
            status: 'closed',
            data: [
              {
                name: 'MOntrell Jubilee 2',
                tel: '2409064819',
                type: 'client',
              },
              {
                name: 'Lender 2',
                tel: '2409064819',
                type: 'lender',
              },
              {
                name: 'Inspector 2',
                tel: '2409064819',
                type: 'inspector',
              },
              {
                name: 'Title 3',
                tel: '2409064819',
                type: 'title',
              },
              {
                name: 'Agent 4',
                tel: '2409064819',
                type: 'agent',
              },
            ],
          },
          {
            address: '12345 main st',
            closingDate: '10/19/2023',
            status: 'decline',
            data: [
              {
                name: 'MOntrell Jubilee 3',
                tel: '2409064819',
                type: 'client',
              },
              {
                name: 'Lender 3',
                tel: '2409064819',
                type: 'lender',
              },
              {
                name: 'Inspector 3',
                tel: '2409064819',
                type: 'inspector',
              },
              {
                name: 'Title 3',
                tel: '2409064819',
                type: 'title',
              },
              {
                name: 'Agent 3',
                tel: '2409064819',
                type: 'agent',
              },
            ],
          },
        ]}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </Layout>
  );
};
