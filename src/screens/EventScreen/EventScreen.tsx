import React from 'react';
import { View, Button, Text } from 'native-base';

export const EventScreen = () => {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="xl" mb={4}>
        Discover Local Events
      </Text>
      <Button colorScheme="primary" onPress={() => handleDiscoverEvents()}>
        Discover Events
      </Button>
      <Text fontSize="xl" my={4}>
        OR
      </Text>
      <Button colorScheme="success" onPress={() => handleCreateEvent()}>
        Create Event
      </Button>
    </View>
  );

  // Function to handle discovering local events
  const handleDiscoverEvents = () => {
    // Implement your logic here to navigate or perform actions for discovering events.
  };

  // Function to handle creating a new event
  const handleCreateEvent = () => {
    // Implement your logic here to navigate or perform actions for creating a new event.
  };
};
