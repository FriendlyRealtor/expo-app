import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Input,
  ScrollView,
  Actionsheet,
  Flex,
  Select,
  HStack,
  TextArea,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { Chip, EventCard } from '../../components';
import { EventOrganizerCategories } from './EventOrganizerScreenTypes';

const UpgradeBenefitsSection = () => {
  return (
    <View px={8} pt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Why Upgrade to a Paid Plan?
      </Text>
      <Text fontSize="md" mb={2}>
        Unlock the full potential of our app with a paid plan for just $10 per month or $100 per
        year. Here's why it's important:
      </Text>
      <Text fontSize="md" mb={2}>
        - Create and manage unlimited real estate community events.
      </Text>
      <Text fontSize="md" mb={2}>
        - Earn money by hosting events and connecting with the real estate community.
      </Text>
      <Text fontSize="md" mb={2}>
        - Access premium features and tools for event organizers.
      </Text>
      <Text fontSize="md" mb={4}>
        - Priority customer support to assist you in your journey.
      </Text>
      <Button>Upgrade Now</Button>
    </View>
  );
};

export const EventOrganizerScreen = () => {
  const [events, setEvents] = useState([]); // Store the list of events
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    description: '',
    date: '',
    totalSeats: '',
    price: '',
  });
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState(-1); // Index of the event being edited
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('open_houses');
  const [chipValue, setChipValue] = useState<string>('');
  const [eventImage, setEventImage] = useState(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [photoProgress, setPhotoProgress] = useState<number | undefined>(undefined);

  const createEvent = () => {
    setEvents([...events, newEvent]);
    setSaving(true);
  };

  // Simulated function to edit an existing event
  const editEvent = () => {
    // Validate and update the event in your database
    // For simplicity, we'll just update it in the local state here
    const updatedEvents = [...events];
    updatedEvents[editingEventIndex] = newEvent;
    setEvents(updatedEvents);
    setIsCreatingEvent(false);
    setEditingEventIndex(-1);
    // You would typically send the updated event data to your backend or database here
  };

  // Simulated function to delete an event
  const deleteEvent = (index) => {
    // Delete the event from your database
    // For simplicity, we'll just remove it from the local state here
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
    // You would typically send a delete request to your backend or database here
  };

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  useEffect(() => {
    const initialEvents = [
      {
        title: 'Event 1',
        location: 'Location 1',
        description: 'Description of Event 1...',
        date: '2023-09-30',
      },
      {
        title: 'Event 2',
        location: 'Location 2',
        description: 'Description of Event 2...',
        date: '2023-10-15',
      },
    ];

    setEvents(initialEvents);
  }, []);

  if (false) {
    return (
      <View px={8} pt={8}>
        <UpgradeBenefitsSection />
      </View>
    );
  }

  return (
    <ScrollView px={8} pt={8}>
      <Button onPress={() => setIsCreatingEvent(true)}>Create Event</Button>
      {/* List of Events */}
      {events.map((event, index) => (
        <EventCard
          key={event.id}
          event={event}
          isOrganizerCard
          editEvent={editEvent}
          deleteEvent={deleteEvent}
        />
      ))}
      <Actionsheet
        isOpen={isCreatingEvent}
        onClose={() => {
          setIsCreatingEvent(false);
          setEditingEventIndex(-1);
        }}
      >
        <Actionsheet.Content>
          <ScrollView width="100%">
            <Input
              placeholder="Event Title"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
              my={4}
            />
            <TouchableOpacity>
              <Image
                source={{ uri: '' }}
                display="flex"
                alt="Event Photo"
                style={{
                  alignSelf: 'center',
                  width: 96,
                  height: 96,
                  marginTop: 8,
                  marginBottom: 32,
                }}
              />
            </TouchableOpacity>
            <Input
              placeholder="Event Organizer"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
              my={4}
            />
            <Input
              placeholder="Event Location"
              value={newEvent.location}
              onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
              my={4}
            />
            <TextArea
              placeholder="Event Description"
              value={newEvent.description}
              onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
              my={4}
            />
            <Select
              selectedValue={selectedOption}
              minWidth={200} // Adjust the width as needed
              onValueChange={(itemValue) => setSelectedOption(itemValue)}
              mt={4} // Margin top to separate from DateTimePicker
            >
              {EventOrganizerCategories.map((option, index) => (
                <Select.Item key={index} label={option.name} value={option.key} />
              ))}
            </Select>
            <Flex
              flexDirection="row"
              flexWrap="wrap"
              alignItems="flex-start" // Adjust alignment as needed
              my={4}
            >
              <HStack justifyContent="space-between" width="100%">
                <Text fontSize="md" fontWeight="bold">
                  Event Date
                </Text>
                <Text fontSize="md" fontWeight="bold">
                  Start Time
                </Text>
                <Text fontSize="md" fontWeight="bold">
                  End Time
                </Text>
              </HStack>
              <HStack justifyContent="space-between" width="100%" mt={2}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  onChange={onChange}
                  display="default"
                  minimumDate={new Date()}
                />

                <DateTimePicker
                  testID="startTimePicker"
                  value={startTime}
                  mode="time"
                  onChange={(event, selectedTime) => {
                    setStartTime(selectedTime || startTime);
                  }}
                  display="default"
                />

                <DateTimePicker
                  testID="endTimePicker"
                  value={endTime}
                  mode="time"
                  onChange={(event, selectedTime) => {
                    setEndTime(selectedTime || endTime);
                  }}
                  display="default"
                />
              </HStack>
            </Flex>
            <Input
              placeholder="Avaliable Seats"
              value={newEvent.totalSeats}
              keyboardType="numeric"
              onChangeText={(text) => setNewEvent({ ...newEvent, totalSeats: text })}
              my={4}
            />
            <Input
              placeholder="Cost of Event (0 = Free)"
              value={newEvent.price}
              keyboardType="numeric"
              onChangeText={(text) => setNewEvent({ ...newEvent, price: text })}
              my={4}
            />
            <HStack justifyContent="space-between" mt={4}>
              <Button onPress={createEvent} isLoading={saving}>
                Save Event
              </Button>
              <Button onPress={() => setIsCreatingEvent(false)}>Cancel</Button>
            </HStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </ScrollView>
  );
};
