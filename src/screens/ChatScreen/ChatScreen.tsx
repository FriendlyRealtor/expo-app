import { useState } from 'react';
import { StyleSheet, Pressable, StatusBar } from 'react-native';
import { Search } from '../../components';
import { Colors } from '../../config';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  View,
  ScrollView,
  Modal,
  Button,
  TextArea,
  IconButton,
  Icon,
} from 'native-base';
import { EvilIcons } from '@expo/vector-icons';
import SwipeableItem from '../../components/SwipeableItem';
import { useChats } from './ChatHooks';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { auth, db } from '../../config';

export const ChatScreen = ({ navigation }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [textAreaValue, setTextAreaValue] = useState('');

  const { messages, searchableUsers, sendUserMsg } = useChats();

  const handleAddMessage = () => {
    setOpen(true);
  };

  return (
    <View marginTop="4">
      <StatusBar />
      <IconButton
        icon={<Icon as={EvilIcons} name="plus" size="2xl" color="black.500" />}
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        onPress={handleAddMessage}
      />

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(!open);
        }}
        size="xl"
        height="full"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>New Message</Modal.Header>
          <Modal.Body>
            <Search
              label="To:"
              data={searchableUsers}
              onSelectionChange={(value) => {
                setSelectedUser(value);
              }}
              resetQuery={Object.keys(selectedUser).length === 0}
            />
            <View style={styles.messageArea}>
              <Text>Message</Text>
              <TextArea
                value={textAreaValue}
                autoCompleteType={false}
                onChangeText={(text) => setTextAreaValue(text)}
                h={40}
                placeholder="Text Area Placeholder"
                w="100%"
              />
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={styles.sendBtn}
              onPress={async () => {
                try {
                  const userRef = collection(db, 'users');
                  const q = query(
                    userRef,
                    where('userName', '==', selectedUser.userName || ''),
                    where('name', '==', selectedUser.name || ''),
                    limit(1),
                  );
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach(async (doc) => {
                    const recipientId = doc.id;
                    const messageContent = textAreaValue;
                    await sendUserMsg(auth.currentUser?.uid, recipientId, messageContent);
                    setTextAreaValue('');
                    setSelectedUser({});
                    setOpen(false);
                  });
                } catch (error) {
                  console.log('Error sending user message:', error);
                }
              }}
              disabled={!Object.keys(selectedUser).length}
            >
              <Text color="white">Send</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {messages && messages.length ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Box>
            <Heading fontSize="xl" p="4" pb="3">
              Messages
            </Heading>
            <FlatList
              data={messages}
              renderItem={({ item }) => (
                <SwipeableItem item={item}>
                  <Pressable
                    key={item.id}
                    style={styles.messageContainer}
                    onPress={() => {
                      navigation.navigate('My Chat');
                    }}
                  >
                    <Box
                      borderBottomWidth="1"
                      _dark={{
                        borderColor: 'muted.50',
                      }}
                      borderColor="muted.800"
                      pl={['0', '4']}
                      pr={['0', '5']}
                      py="2"
                    >
                      <HStack space={[2, 3]} justifyContent="space-between">
                        <Avatar
                          size="48px"
                          source={{
                            uri: item.avatarUrl,
                          }}
                        />
                        <VStack>
                          <Text
                            _dark={{
                              color: 'warmGray.50',
                            }}
                            color="coolGray.800"
                            bold
                          >
                            {item.fullName}
                          </Text>
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: 'warmGray.200',
                            }}
                          >
                            {item.recentText}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text
                          fontSize="xs"
                          _dark={{
                            color: 'warmGray.50',
                          }}
                          color="coolGray.800"
                          alignSelf="flex-start"
                        >
                          {item.timeStamp}
                        </Text>
                      </HStack>
                    </Box>
                  </Pressable>
                </SwipeableItem>
              )}
              keyExtractor={(item) => item.id}
            />
          </Box>
        </ScrollView>
      ) : (
        <View>
          <Text fontSize="2xl" textAlign="center">
            No Messages Found
          </Text>
        </View>
      )}
    </View>
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
