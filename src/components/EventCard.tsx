import React, { useState } from 'react';
import { View, Text, ScrollView, Box, Actionsheet, Button, HStack } from 'native-base';
import { Colors } from '../config';

export const EventCard = ({ event, isOrganizerCard, editEvent, deleteEvent }) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const handleJoinEvent = () => {
    console.log('Implement logic to join event');
  };

  const buttons = [
    {
      text: isOrganizerCard ? 'Edit Event' : 'Event Details',
      onPress: () => (isOrganizerCard ? editEvent() : setActionSheetVisible(true)),
      color: Colors.blue,
    },
    {
      text: isOrganizerCard ? 'Delete Event' : 'Join Event',
      onPress: () => (isOrganizerCard ? deleteEvent() : handleJoinEvent()),
      color: Colors.transparent,
    },
  ];

  return (
    <>
      <Box
        width="90%"
        backgroundColor="white"
        borderRadius={8}
        shadow={2}
        p={4}
        my={4}
        onPress={() => setActionSheetVisible(true)}
      >
        {/* Event Image */}
        <Box height={100} bg="gray.200" borderRadius={8} marginBottom={4}>
          {/* Replace with your event image */}
        </Box>

        {/* Event Details */}
        <Text fontSize="xl" fontWeight="bold" color={Colors.color2}>
          {event.title}
        </Text>
        <Text fontSize="md" color="gray.600" my={2}>
          <Text fontWeight="bold" color="black">
            Location:
          </Text>{' '}
          {event.location}
        </Text>
        <Text fontSize="md" color="gray.600">
          <Text fontWeight="bold" color="black">
            Date:
          </Text>{' '}
          {event.date}
        </Text>
        <Text fontSize="md" color="gray.600" my={2}>
          <Text fontWeight="bold" color="black">
            Participants:
          </Text>{' '}
          {event.participants} | {event.totalParticipants}
        </Text>
        <Text fontSize="md" color="gray.600">
          <Text fontWeight="bold" color="black">
            Category:
          </Text>{' '}
          {event.category}
        </Text>
        <Text fontSize="md" color="gray.600">
          <Text fontWeight="bold" color="black">
            Cost:
          </Text>{' '}
          {event.cost}
        </Text>
        <HStack justifyContent="space-between" mt={4}>
          {buttons.map((button, index) => (
            <Button
              onPress={button.onPress}
              style={{ backgroundColor: button.color, borderWidth: 1 }}
            >
              <Text color={button.text === 'Event Details' ? 'white' : 'black'}>{button.text}</Text>
            </Button>
          ))}
        </HStack>
      </Box>
      <Actionsheet isOpen={actionSheetVisible} onClose={() => setActionSheetVisible(false)}>
        <Actionsheet.Content px={8}>
          <ScrollView>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Event Details
            </Text>
            <Text>{event.longerDetails?.length && event.longerDetails}</Text>
            <Text mt={2} fontSize="lg" fontWeight="bold">
              Address
            </Text>
            <Text>{event.address}</Text>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
