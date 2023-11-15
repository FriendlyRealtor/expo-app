import * as Linking from 'expo-linking';

import { Alert, Modal, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { Card, Divider, Layout, List, ListItem } from '@ui-kitten/components';
import { ErrorMessage } from '../../components';
import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import Bugsnag from '@bugsnag/expo';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Input, View, Box, Text, Heading, Button } from 'native-base';
import _ from 'lodash';
import { Colors, db } from '../../config';
import { getAuth } from 'firebase/auth';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ClientScreenStyles } from './ClientStyles';

export const AddDeal = ({ modalVisible, setModalVisible, formData, setUserDeals }) => {
  const styles = ClientScreenStyles;
  const [saving, setSaving] = useState(false);

  const userAuth = getAuth();
  const { values, touched, errors, setFieldValue, handleChange, handleSubmit, resetForm } =
    useFormik({
      onSubmit: async (submitValues) => {
        try {
          setSaving(true);
          submitValues.id = uuid.v4();
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
                setUserDeals(updatedDeals);
                resetForm();
                setModalVisible(false);
              }
            }
          } else {
            handleAddDeal(submitValues);
          }
        } catch (error) {
          Bugsnag.notify(error);
        } finally {
          setSaving(false);
        }
      },
    });

  useEffect(() => {
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
        price: formData && formData.price ? formData.price : '',
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
        setUserDeals(deals);
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
      <View style={{ ...styles.centeredView, backgroundColor: Colors.white }}>
        <View style={styles.modalView}>
          <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.close}>
            <Icon style={{ marginRight: 8 }} name="close" size={24} />
          </Pressable>
          <Formik>
            {() => (
              <ScrollView style={{ width: '100%' }}>
                <KeyboardAwareScrollView>
                  <View style={{ marginBottom: 16 }}>
                    <Heading size="sm">Current Address</Heading>
                    <Input
                      name="address"
                      placeholder="Enter Address"
                      value={values.address}
                      onChangeText={handleChange('address')}
                      size="md"
                    />
                    <ErrorMessage error={errors.address} visible={touched.address} />
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Heading size="sm">Sale Price</Heading>
                    <Input
                      name="address"
                      placeholder="Enter Address"
                      value={values.price}
                      onChangeText={handleChange('price')}
                      size="md"
                    />
                    <ErrorMessage error={errors.price} visible={touched.price} />
                  </View>
                  <View>
                    <Heading size="sm">Closing Date</Heading>
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
                  <ErrorMessage error={errors.closingDate} visible={touched.closingDate} />
                  <View style={{ marginBottom: 16 }}>
                    <Heading size="sm">Client Name</Heading>
                    <Input
                      name="clientName"
                      placeholder="Enter Full Name"
                      value={values.clientName}
                      onChangeText={handleChange('clientName')}
                      size="md"
                    />
                    <ErrorMessage error={errors.clientName} visible={touched.clientName} />
                    <Box mt={2} />
                    <Input
                      name="clientPhone"
                      placeholder="Enter Phone Number"
                      keyboardType="numeric"
                      value={values.clientPhone}
                      onChangeText={handleChange('clientPhone')}
                      size="md"
                    />
                    <ErrorMessage error={errors.clientPhone} visible={touched.clientPhone} />
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Heading size="sm">Agent Name</Heading>
                    <Input
                      name="agentName"
                      placeholder="Enter Full Name"
                      value={values.agentName}
                      onChangeText={handleChange('agentName')}
                      size="md"
                    />
                    <ErrorMessage error={errors.agentName} visible={touched.agentName} />
                    <Box mt={2} />

                    <Input
                      name="agentPhone"
                      placeholder="Enter Phone Number"
                      keyboardType="numeric"
                      value={values.agentPhone}
                      onChangeText={handleChange('agentPhone')}
                      size="md"
                    />
                    <ErrorMessage error={errors.agentPhone} visible={touched.agentPhone} />
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Heading size="sm">Inspector Name</Heading>
                    <Input
                      name="inspectorName"
                      placeholder="Enter Full Name"
                      value={values.inspectorName}
                      onChangeText={handleChange('inspectorName')}
                      size="md"
                    />
                    <ErrorMessage error={errors.inspectorName} visible={touched.inspectorName} />
                    <Box mt={2} />
                    <Input
                      name="inspectorPhone"
                      placeholder="Enter Phone Number"
                      keyboardType="numeric"
                      value={values.inspectorPhone}
                      onChangeText={handleChange('inspectorPhone')}
                      size="md"
                    />
                    <ErrorMessage error={errors.inspectorPhone} visible={touched.inspectorPhone} />
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Heading size="sm">Title Company</Heading>
                    <Input
                      name="titleName"
                      placeholder="Enter Full Name"
                      value={values.titleName}
                      onChangeText={handleChange('titleName')}
                      size="md"
                    />
                    <ErrorMessage error={errors.titleName} visible={touched.titleName} />
                    <Box mt={2} />
                    <Input
                      name="titlePhone"
                      placeholder="Enter Phone Number"
                      keyboardType="numeric"
                      value={values.titlePhone}
                      onChangeText={handleChange('titlePhone')}
                      size="md"
                    />
                    <ErrorMessage error={errors.titlePhone} visible={touched.titlePhone} />
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Heading size="sm">Lender Name</Heading>
                    <Input
                      name="lenderName"
                      placeholder="Enter Full Name"
                      value={values.lenderName}
                      onChangeText={handleChange('lenderName')}
                      size="md"
                    />
                    <ErrorMessage error={errors.lenderName} visible={touched.lenderName} />
                    <Box mt={2} />
                    <Input
                      name="lenderPhone"
                      placeholder="Enter Phone Number"
                      keyboardType="numeric"
                      value={values.lenderPhone}
                      onChangeText={handleChange('lenderPhone')}
                      size="md"
                    />
                    <ErrorMessage error={errors.lenderPhone} visible={touched.lenderPhone} />
                  </View>
                  <Button
                    style={{
                      width: 250,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                      borderRadius: 8,
                      marginTop: 16,
                      backgroundColor: Colors.color2,
                    }}
                    isLoading={saving}
                    onPress={handleSubmit}
                  >
                    <Text style={{ color: '#FFFFFF' }}>Save</Text>
                  </Button>
                </KeyboardAwareScrollView>
              </ScrollView>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export const ClientScreen = ({ navigation }) => {
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <StatusBar style="auto" />
        <Text category="h6" {...headerProps} status="info">
          {item.address}
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', paddingRight: 12 }}>
          <Icon
            {...headerProps}
            name="pencil-square-o"
            size={24}
            onPress={() => {
              setFormData(item);
              setModalVisible(true);
            }}
            style={{ paddingHorizontal: 0, paddingRight: 12 }}
          />
          <Icon
            {...headerProps}
            name="trash"
            size={24}
            color="red"
            style={{ paddingHorizontal: 0 }}
            onPress={async () => {
              try {
                const userAuth = getAuth();
                const { uid } = userAuth.currentUser;
                const docRef = await doc(db, 'users', uid);
                const filterDeals = userDeals.filter((deal) => deal.id !== item.id);
                await updateDoc(docRef, { deals: filterDeals });
                setUserDeals(filterDeals);
              } catch (error) {
                Bugsnag.notify(error);
              }
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
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 1 }}>
        <View display="flex" flexDirection="row" alignItems="center">
          <Text {...footerProps} fontWeight="bold">
            Sale Price:
          </Text>
          <Text>{item.price}</Text>
        </View>
        <View display="flex" flexDirection="row" alignItems="center">
          <Text {...footerProps} fontWeight="bold">
            Status:
          </Text>
          <Text>{item.status}</Text>
        </View>
        <View display="flex" flexDirection="row" alignItems="center">
          <Text {...footerProps} fontWeight="bold">
            Closing:
          </Text>
          <Text>{formattedDate}</Text>
        </View>
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
          color={Colors.color2}
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
        {userDeals.length === 0 && (
          <Text style={{ marginHorizontal: 12, marginTop: 32 }}>
            Posting a deal is easy. Just create a post with the details of the deal.
          </Text>
        )}
        <AddDeal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          formData={formData}
          setUserDeals={setUserDeals}
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
