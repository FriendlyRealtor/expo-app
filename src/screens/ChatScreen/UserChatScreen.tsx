import React from 'react';
import { View, Text, SectionList, Input, Button } from 'native-base';

export const UserChatScreen = () => {
  // Dummy messages
  const messages = [
    { id: 1, text: 'Hello', sender: 'user' },
    { id: 2, text: 'Hi there!', sender: 'otherUser' },
    { id: 3, text: 'How are you?', sender: 'user' },
    { id: 4, text: "I'm good, thanks!", sender: 'otherUser' },
    { id: 5, text: 'What about you?', sender: 'otherUser' },
  ];

  // Group messages by sender
  const sections = [
    {
      title: 'User',
      data: messages.filter((message) => message.sender === 'user'),
    },
    {
      title: 'Other User',
      data: messages.filter((message) => message.sender === 'otherUser'),
    },
  ];

  // Function to render each message
  const renderMessage = ({ item }) => {
    const messageStyle = item.sender === 'user' ? { textAlign: 'right' } : {};
    return (
      <View key={item.id}>
        <Text marginY={2} style={messageStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View flex={1} marginY={16} marginX={4}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>{title}</Text>
        )}
      />
      <View display="flex" flexDirection="column" alignItems="flex-end">
        <Input placeholder="Send Message..." borderRadius={99} borderColor="black" />
        <Button marginTop={4} borderRadius={99} width={100}>
          Send
        </Button>
      </View>
    </View>
  );
};
