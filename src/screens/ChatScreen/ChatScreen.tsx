import { useState } from 'react';
import { StyleSheet, Pressable, StatusBar } from 'react-native';
import { Search } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../config';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
} from 'native-base';

export const ChatScreen = ({ navigation }) => {
  const [open, setOpen] = useState<boolean>(false);

  const messages = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Aafreen Khan',
      timeStamp: '12:47 PM',
      recentText: 'Good Day!',
      avatarUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Sujitha Mathur',
      timeStamp: '11:11 PM',
      recentText: 'Cheer up, there!',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Anci Barroco',
      timeStamp: '6:22 PM',
      recentText: 'Good Day!',
      avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Aniket Kumar',
      timeStamp: '8:56 PM',
      recentText: 'All the best',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },
  ];

  const handleAddMessage = () => {
    setOpen(true);
  };

  const handleSubmit = () => {};

  return (
    <View>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={handleAddMessage}>
          <Icon name="plus" size={30} color={Colors.black} />
        </TouchableOpacity>
        <Box>
          <Heading fontSize="xl" p="4" pb="3">
            Messages
          </Heading>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Pressable
                key={item.id}
                style={styles.messageContainer}
                onPress={() => {
                  navigation.navigate('UserChat');
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
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
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
            <Modal.Header>Contact Us</Modal.Header>
            <Modal.Body>
              <Search label="To:" />
              <View style={styles.messageArea}>
                <Text>Message</Text>
                <TextArea
                  autoCompleteType={false}
                  h={40}
                  placeholder="Text Area Placeholder"
                  w="100%"
                />
              </View>
            </Modal.Body>
            <Modal.Footer>
              <Button style={styles.sendBtn} onPress={handleSubmit}>
                <Text>Send</Text>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </ScrollView>
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
