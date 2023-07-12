import React, { useEffect, useState } from 'react';
import { Container, List, Text } from 'native-base';
import * as Contacts from 'expo-contacts';

export const ContactScreen = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });

      console.log('data', data);
      setContacts(data);
    }
  };

  return (
    <Container>
      <List>
        {contacts.map((contact) => (
          <Text>{contact.name}</Text>
        ))}
      </List>
    </Container>
  );
};
