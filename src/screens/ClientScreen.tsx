import React, { useState } from 'react';
import {
  IndexPath,
  Layout,
  Text,
  List,
  ListItem,
  Divider,
  Card,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import { View, Modal, Alert, StyleSheet, Pressable, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from '../components';
import { Formik, useFormik } from 'formik';
import { passwordResetSchema } from '../utils';
import { TextInput, FormErrorMessage } from '../components';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const { values, touched, errors, handleChange, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues: {
      address: '',
      closingDate: '',
      name: '',
      phone: '',
      type: '',
    },
    onSubmit: (submitValues) => {
      handleAddDeal(submitValues);
    },
  });

  const [errorState, setErrorState] = useState('');
  const defaultDate = new Date();
  const [date, setDate] = useState(defaultDate);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const handleAddDeal = (data) => {
    console.log('values', data);
  };

  const selectLabels = [
    {
      label: 'Client',
      value: 'client',
    },
    {
      label: 'Agent',
      value: 'agent',
    },
    {
      label: 'Lender',
      value: 'lender',
    },
    {
      label: 'Inspector',
      value: 'inspector',
    },
    {
      label: 'Title',
      value: 'title',
    },
  ];

  const displayValue = selectLabels[selectedIndex.row].label;

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
              <ScrollView>
                <TextInput
                  name="address"
                  placeholder="Enter Address"
                  autoCapitalize="none"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                />
                <FormErrorMessage error={errors.address} visible={touched.address} />
                <View>
                  <Text>Closing Date:</Text>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    display="default"
                    style={{ width: 150, marginRight: 0, marginBottom: 16 }}
                  />
                </View>
                <FormErrorMessage error={errors.email} visible={touched.email} />
                <TextInput
                  name="name"
                  placeholder="Enter Full Name"
                  value={values.name}
                  onChangeTe9xt={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                <FormErrorMessage error={errors.name} visible={touched.name} />
                <TextInput
                  name="phone"
                  placeholder="Enter Phone Number"
                  keyboardType="numeric"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                />
                <FormErrorMessage error={errors.phone} visible={touched.phone} />
                <Select
                  selectedIndex={selectedIndex}
                  value={displayValue}
                  onSelect={(index) => setSelectedIndex(index)}
                >
                  {selectLabels.map((label) => {
                    return <SelectItem title={label.label} />;
                  })}
                </Select>
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
