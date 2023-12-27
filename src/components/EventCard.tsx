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
import Constants from 'expo-constants';
import Bugsnag from '@bugsnag/expo';
import { customEvent } from 'vexo-analytics';

export const EventCard = ({ event, index, isOrganizerCard, deleteEvent, navigation }) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [duplicateMsg, setDuplicateMsg] = useState<string>('');

  const userAuth = getAuth(); // Get the user's authentication information

  const handleJoinEvent = async () => {
    try {
      if (!userAuth?.currentUser?.uid) {
        customEvent('user-join-event-login', {
          description: 'User not logged in, joining event',
        });
        navigation.navigate('Login');
      }
      setSaving(true); // Set the saving state to indicate that the operation is in progress
      // Check if the user's ID is already in the participants array
      if (event.participants.includes(userAuth?.currentUser?.uid)) {
        // User is already added to the event
        setDuplicateMsg('User already successfully added to the event.');
        setActionSheetVisible(false); // Close the action sheet
        setSaving(false); // Set the saving state to indicate that the operation is complete
        return;
      }

      // Add the user's ID to the participants array
      const updatedParticipants = [...event.participants, userAuth?.currentUser?.uid];

      // Create a reference to the event document in the "events" collection
      const eventRef = doc(db, 'events', event.id);

      const eventDateTimeString = `${event?.eventDate} ${event?.dateStartTime} - ${event?.dateEndTime}`;

      // Send a POST request to your send-event-email API
      const response = await fetch(`${Constants?.manifest?.extra?.serverUrl}/send-event-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userAuth?.currentUser?.email,
          virtual: event.virtual || false,
          eventLink: event.link || '',
          location: event.location || '',
          date: eventDateTimeString,
          name: event.title,
        }),
      });

      if (response.ok) {
        // Update the document with the updated participants array
        await updateDoc(eventRef, { participants: updatedParticipants });
        setDuplicateMsg('Email sent successfully!, check your email');
        customEvent('user-join-event', {
          description: 'User joining event',
        });
      } else {
        setDuplicateMsg(`Error joining event:', ${response.statusText}`);
      }

      setTimeout(() => {
        setDuplicateMsg('');
      }, 2000);

      setActionSheetVisible(false); // Close the action sheet
    } catch (error) {
      Bugsnag.notify(error);
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
            <Button
              onPress={
                isOrganizerCard ? () => deleteEvent(event?.id, index) : () => handleJoinEvent()
              }
              isLoading={saving}
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
            </Button>
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
          <Text
            fontSize="md"
            color={
              duplicateMsg === 'Email sent successfully!, check your email'
                ? Colors.color2
                : Colors.red
            }
            mb={2}
            ml={2}
          >
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
          <HStack>{event.virtual && <Text my={2}>Online Event</Text>}</HStack>
          <HStack>
            <Text my={2} color={Colors.color2}>
              Start: {event.dateStartTime} | End: {event.dateEndTime}
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
