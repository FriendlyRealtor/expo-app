import { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Pressable } from 'react-native';
import { Text, Search, Button } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input } from '@ui-kitten/components';

export const ChatScreen = ({ navigation }) => {
  const [open, setOpen] = useState<boolean>(false);

  const messages = [
    { id: 1, sender: 'John', content: 'Hello' },
    { id: 2, sender: 'Jane', content: 'Hi there' },
    { id: 3, sender: 'John', content: 'How are you?' },
    { id: 4, sender: 'Jane', content: 'I am good, thanks!' },
  ];

  const handleAddMessage = () => {
    setOpen(true);
  };

  const handleSubmit = () => {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={handleAddMessage}>
        <Icon name="plus" size={30} color={Colors.black} />
      </TouchableOpacity>
      {messages.map((message) => (
        <Pressable
          key={message.id}
          style={styles.messageContainer}
          onPress={() => {
            navigation.navigate('UserChat');
          }}
        >
          <Text>{`${message.sender}: ${message.content}`}</Text>
        </Pressable>
      ))}
      <Modal
        animationType="slide"
        visible={open}
        transparent={true}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setOpen(false)} style={styles.close}>
              <Icon style={{ marginRight: 8 }} name="close" size={24} />
            </Pressable>
            <Search label="To:" />
            <View style={styles.messageArea}>
              <Text category="h6">Message</Text>
              <Input
                placeholder="Where are your services located"
                multiline={true}
                size="small"
                textStyle={styles.input}
              />
            </View>
            <Button style={styles.sendBtn} onPress={handleSubmit}>
              <Text>Send</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  sendBtn: {
    backgroundColor: Colors.blue,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    textAlign: 'center',
    borderRadius: 8,
  },
  messageArea: {
    marginTop: 32,
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  input: {
    width: '100%',
    minHeight: 128,
    borderRadius: 8,
  },
});
