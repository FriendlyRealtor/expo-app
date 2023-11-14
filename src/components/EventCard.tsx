import React, { useState } from 'react';
import { View, Text, ScrollView, Box, Actionsheet, Button, HStack } from 'native-base';
import { Colors } from '../config';
import { EventOrganizerCategories } from '../screens/EventOrganizerScreen/EventOrganizerScreenTypes';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config';

export const EventCard = ({ event, index, isOrganizerCard, deleteEvent }) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [duplicateMsg, setDuplicateMsg] = useState<string>('');

  const userAuth = getAuth(); // Get the user's authentication information

  const handleJoinEvent = async () => {
    setSaving(true); // Set the saving state to indicate that the operation is in progress
    const { uid } = userAuth.currentUser; // Get the user's unique ID

    // Check if the user's ID is already in the participants array
    if (event.participants.includes(uid)) {
      // User is already added to the event
      setDuplicateMsg('User is already successfully added to the event.');
      setActionSheetVisible(false); // Close the action sheet
      setSaving(false); // Set the saving state to indicate that the operation is complete
      return;
    }

    // Add the user's ID to the participants array
    const updatedParticipants = [...event.participants, uid];

    // Create a reference to the event document in the "events" collection
    const eventRef = doc(db, 'events', event.id);

    try {
      // Update the document with the updated participants array
      await updateDoc(eventRef, { participants: updatedParticipants });
      setActionSheetVisible(false); // Close the action sheet
    } catch (error) {
      console.error('Error updating event:', error);
      // Handle the error as needed
    } finally {
      setSaving(false); // Set the saving state to indicate that the operation is complete
    }
  };

  const buttons = [
    {
      text: isOrganizerCard ? '' : 'Event Details',
      onPress: () => (isOrganizerCard ? () => {} : setActionSheetVisible(true)),
      color: Colors.mediumGray,
    },
    {
      text: isOrganizerCard ? 'Delete Event' : 'Join Event',
      onPress: () => (isOrganizerCard ? deleteEvent(event?.id, index) : handleJoinEvent()),
      color: Colors.black,
    },
  ];

  console.log('get here', duplicateMsg);
  return (
    <>
      <Box
        width="90%"
        backgroundColor={Colors.color2}
        borderRadius={8}
        shadow={2}
        p={4}
        my={4}
        onPress={() => setActionSheetVisible(true)}
      >
        {duplicateMsg && (
          <Text fontSize="md" color="red.600">
            {duplicateMsg}
          </Text>
        )}
        {/* Event Details */}
        <Text fontSize="xl" fontWeight="bold" color={Colors.white}>
          {event.title}
        </Text>
        <Text fontSize="md" color={Colors.white} my={2}>
          <Text fontWeight="bold" color="black">
            Location:
          </Text>{' '}
          {event.location}
        </Text>
        <Text fontSize="md" color={Colors.white}>
          <Text fontWeight="bold" color="black">
            Date:
          </Text>{' '}
          {event.eventDate}
        </Text>
        <Text fontSize="md" color={Colors.white} my={2}>
          <Text fontWeight="bold" color="black">
            Participants:
          </Text>{' '}
          {event.participants.length} | {event.totalParticipants}
        </Text>
        <Text fontSize="md" color={Colors.white}>
          <Text fontWeight="bold" color="black">
            Category:
          </Text>{' '}
          {EventOrganizerCategories.find((cat) => cat.key === event.category)?.name || ''}
        </Text>
        <HStack justifyContent="space-between" mt={4}>
          {buttons.map((button, index) => {
            if (
              !button.text ||
              (button.text === 'Join Event' &&
                parseInt(event.totalParticipants) <= event.participants.length)
            ) {
              return null;
            }
            return (
              <Button
                onPress={button.onPress}
                isLoading={button.text === 'Join Event' && saving}
                style={{ backgroundColor: button.color, borderWidth: 1 }}
              >
                <Text color={Colors.white}>{button.text}</Text>
              </Button>
            );
          })}
        </HStack>
      </Box>
      <Actionsheet isOpen={actionSheetVisible} onClose={() => setActionSheetVisible(false)}>
        <Actionsheet.Content px={8}>
          <ScrollView>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Event Details
            </Text>
            <Text>{event.description}</Text>
            <Text mt={2} fontSize="lg" fontWeight="bold">
              Organizer
            </Text>
            <Text>{event.organizer}</Text>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
