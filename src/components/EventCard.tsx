import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Card,
  Box,
  Actionsheet,
  Button,
  IconButton,
  HStack,
  Image,
  Icon,
} from 'native-base';
import { Colors } from '../config';
import { EventOrganizerCategories } from '../screens/EventOrganizerScreen/EventOrganizerScreenTypes';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../config';
import { TouchableOpacity } from 'react-native';

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
      setDuplicateMsg('User already successfully added to the event.');
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

  return (
    <>
      <Card
        width="100%"
        backgroundColor={Colors.white}
        borderRadius={8}
        borderWidth={1}
        borderColor={Colors.black}
        my={4}
        padding={0}
        onPress={() => setActionSheetVisible(true)}
      >
        <View>
          <Image
            source={{
              uri: 'https://images.ctfassets.net/v3wxyl8kvdve/6LZCfjWBLPSbOboqV9Y7Ar/306b59797cde3d63e94b32defe6f78b4/640-it-students-view.JPG',
            }}
            alt="Event Image"
            resizeMode="cover"
            borderTopRadius={8}
            height={175}
            width="100%"
          />
          <View
            style={{
              position: 'absolute',
              top: 5,
              left: 5,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              padding: 0,
            }}
          >
            <Box backgroundColor={Colors.white} borderRadius={8} px={2.5} py={1.5}>
              <Text color={Colors.blue} fontWeight={700}>
                {event.eventDate}
              </Text>
            </Box>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              padding: 0,
            }}
          >
            <TouchableOpacity
              onPress={
                isOrganizerCard ? () => deleteEvent(event?.id, index) : () => handleJoinEvent()
              }
              style={{
                backgroundColor: isOrganizerCard ? Colors.red : Colors.blue,
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text color={Colors.white} fontWeight={700}>
                {isOrganizerCard ? 'Delete Event' : 'Join Event'}
              </Text>
            </TouchableOpacity>
          </View>
          {!isOrganizerCard && (
            <View
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: 0,
              }}
            >
              <IconButton
                onPress={() => setActionSheetVisible(true)}
                _pressed={{
                  bg: 'transparent',
                }}
              >
                <Icon
                  as={MaterialCommunityIcons}
                  name="information"
                  size="lg"
                  color={Colors.black}
                />
              </IconButton>
            </View>
          )}
        </View>
        {duplicateMsg && (
          <Text fontSize="md" color={Colors.red} mb={2}>
            {duplicateMsg}
          </Text>
        )}
        <View p={2} textAlign="left">
          <Text fontSize="2xl" fontWeight={600} color={Colors.blue}>
            {event.title}
          </Text>
          <HStack alignItems="center" mt={4} mb={2}>
            <Icon
              as={MaterialCommunityIcons}
              name="account-group"
              size="2xl"
              color={Colors.black}
              mr={4}
              alignItems="center"
            />
            <Text fontSize="md" color={Colors.black}>
              {event.participants.length} | {event.totalParticipants}
            </Text>
          </HStack>
          <Box borderWidth={1} borderColor={Colors.blue} borderRadius={8} px={1} py={1.5}>
            <Text color={Colors.blue} fontWeight={700}>
              {EventOrganizerCategories.find((cat) => cat.key === event.category)?.name || ''}
            </Text>
          </Box>
          <HStack my={2} alignItems="center">
            <Icon as={MaterialCommunityIcons} name="map-marker" size="2xl" color={Colors.color2} />
            <Text fontWeight={400} letterSpacing={1} color={Colors.black}>
              {event.location}
            </Text>
          </HStack>
        </View>
      </Card>
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
