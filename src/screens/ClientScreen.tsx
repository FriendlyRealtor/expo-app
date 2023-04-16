import React, { useEffect, useState } from 'react';
import { Layout, Text, List, ListItem, Divider, Card, Input } from '@ui-kitten/components';
import { View, Modal, Alert, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../components';
import { Formik, useFormik } from 'formik';
import { passwordResetSchema } from '../utils';
import { FormErrorMessage } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import { getAuth } from 'firebase/auth';
import _ from 'lodash';
import uuid from 'react-native-uuid';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

export const AddDeal = ({ modalVisible, setModalVisible, formData }) => {
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
  const { values, touched, errors, setFieldValue, handleChange, handleSubmit, resetForm } =
    useFormik({
      onSubmit: async (submitValues) => {
        if (formData && formData.id) {
          const { uid } = userAuth.currentUser;
          const docRef = await doc(db, 'users', uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const firebaseData = docSnap.data();
            const docIndex = firebaseData.deals.findIndex((deal) => deal.id === formData.id);
            const updatedDeals = firebaseData.deals.filter((deal) => deal.id !== formData.id);
            updatedDeals.splice(1, docIndex, submitValues);
            if (docRef) {
              await updateDoc(docRef, { deals: updatedDeals });
              resetForm();
              setModalVisible(false);
            }
          }
        } else {
          handleAddDeal(submitValues);
        }
      },
    });

  useEffect(() => {
    if (formData && formData.closingDate) {
    }
    resetForm({
      values: {
        id: formData && formData.id ? formData.id : uuid.v4(),
        address: formData && formData.address ? formData.address : '',
        closingDate:
          formData && formData.closingDate
            ? moment.utc(formData.closingDate.seconds * 1000).toDate()
            : new Date(),
        clientName: formData && formData.clientName ? formData.clientName : '',
        clientPhone: formData && formData.clientPhone ? formData.clientPhone : '',
        agentName: formData && formData.agentName ? formData.agentName : '',
        agentPhone: formData && formData.agentPhone ? formData.agentPhone : '',
        inspectorName: formData && formData.inspectorName ? formData.inspectorName : '',
        inspectorPhone: formData && formData.inspectorPhone ? formData.inspectorPhone : '',
        titleName: formData && formData.titleName ? formData.titleName : '',
        titlePhone: formData && formData.titlePhone ? formData.titlePhone : '',
        lenderName: formData && formData.lenderName ? formData.lenderName : '',
        lenderPhone: formData && formData.lenderPhone ? formData.lenderPhone : '',
        status: formData && formData.status ? formData.status : '',
      },
    });
  }, [formData]);

  const [errorState, setErrorState] = useState('');
  const defaultDate = new Date();

  const handleAddDeal = async (data) => {
    const { uid } = userAuth.currentUser;
    const docRef = await doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    data.status = 'active';

    if (docSnap.exists()) {
      const firebaseData = docSnap.data();
      let deals: any[] = [];

      if (firebaseData.deals && _.size(firebaseData.deals)) {
        const concatDeals = firebaseData.deals.concat(data);
        deals = deals.concat(concatDeals);
      } else {
        deals.push(data);
      }

      if (docRef) {
        await updateDoc(docRef, { deals: deals });
        resetForm();
        setModalVisible(false);
      }
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
          <Formik validationSchema={passwordResetSchema}>
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
                    onChange={(event, value) => {
                      setFieldValue('closingDate', value);
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
                  <FormErrorMessage
                    error={errors.inspectorPhone}
                    visible={touched.inspectorPhone}
                  />
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
  const [userDeals, setUserDeals] = useState([]);
  const [formData, setFormData] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchDeals = async () => {
        const userAuth = getAuth();
        const { uid } = userAuth.currentUser;

        const docRef = await doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userDoc = docSnap.data();

          if (userDoc.deals) {
            setUserDeals(userDoc.deals);
          }
        }
      };

      fetchDeals();
    }
  }, [isFocused]);

  const renderItemHeader = (headerProps, item) => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text category="h6" {...headerProps} status="info">
          {item.address}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Icon
            {...headerProps}
            name="pencil-square-o"
            size={24}
            onPress={() => {
              setFormData(item);
              setModalVisible(true);
            }}
          />
          <Icon
            {...headerProps}
            name="trash"
            size={24}
            color="red"
            onPress={async () => {
              const userAuth = getAuth();
              const { uid } = userAuth.currentUser;
              const docRef = await doc(db, 'users', uid);
              const filterDeals = userDeals.filter((deal) => deal.id !== item.id);
              await updateDoc(docRef, { deals: filterDeals });
            }}
          />
        </View>
      </View>
    );
  };

  const renderItemFooter = (footerProps, item) => {
    const duration = moment.duration(item.closingDate.seconds, 'seconds');
    const formattedDate = moment(duration).format('MM-DD-YYYY');

    return (
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text {...footerProps}>Status: {item.status}</Text>
        <Text {...footerProps}>Closing: {formattedDate}</Text>
      </View>
    );
  };

  const rightItem = (tel: string) => {
    if (!tel) {
      return null;
    }
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

  const renderItem = (item) => {
    return (
      <Card
        status="basic"
        header={(headerProps) => renderItemHeader(headerProps, item.item)}
        footer={(footerProps) => renderItemFooter(footerProps, item.item)}
      >
        <ListItem
          title={item.item.clientName}
          description="Client"
          accessoryRight={() => rightItem(item.item.clientPhone)}
        />
        <Divider />
        <ListItem
          title={item.item.agentName}
          description="Agent"
          accessoryRight={() => rightItem(item.item.agentPhone)}
        />
        <Divider />

        <ListItem
          title={item.item.lenderName}
          description="Lender"
          accessoryRight={() => rightItem(item.item.lenderPhone)}
        />
        <Divider />

        <ListItem
          title={item.item.titleName}
          description="Title"
          accessoryRight={() => rightItem(item.item.titlePhone)}
        />
        <Divider />

        <ListItem
          title={item.item.inspectorName}
          description="Inspector"
          accessoryRight={() => rightItem(item.item.inspectorPhone)}
        />
      </Card>
    );
  };

  return (
    <Layout style={{ flex: 1 }}>
      <View>
        <AddDeal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formData={formData}
        />
        <Icon
          name="plus-circle"
          size={24}
          onPress={() => {
            setModalVisible(true);
            setFormData(undefined);
          }}
          style={{ textAlign: 'right', marginRight: 16, padding: 8 }}
        />
      </View>
      {userDeals && userDeals.length > 0 && (
        <List data={userDeals} ItemSeparatorComponent={Divider} renderItem={renderItem} />
      )}
    </Layout>
  );
};
