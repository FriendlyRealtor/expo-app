import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Input,
  ScrollView,
  Actionsheet,
  Select,
  HStack,
  TextArea,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { Chip } from '../../components';

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
  const [newEvent, setNewEvent] = useState({ title: '', location: '', description: '', date: '' });
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState(-1); // Index of the event being edited
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [chipValue, setChipValue] = useState<string>('');
  const [eventImage, setEventImage] = useState(null);
  const [tags, setTags] = useState([]);

  const createEvent = () => {
    // Validate and save the new event to your database
    // For simplicity, we'll just add it to the local state here
    setEvents([...events, newEvent]);
    setIsCreatingEvent(false);
    // You would typically send the event data to your backend or database here
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
    // Simulated function to fetch events from your database
    // For simplicity, we'll use a local array as the initial state
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

  const handleAddChip = () => {
    setTags([...tags, chipValue]);
    setChipValue('');
  };

  const handleDeleteChip = (index: number) => {
    const updatedChips = [...tags];
    updatedChips.splice(index, 1);
    setTags(updatedChips);
  };

  if (false) {
    return (
      <View px={8} pt={8}>
        <UpgradeBenefitsSection />
      </View>
    );
  }

  const options = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <ScrollView px={8} pt={8}>
      <Button onPress={() => setIsCreatingEvent(true)}>Create Event</Button>
      {/* List of Events */}
      {events.map((event, index) => (
        <View key={index} p={2} borderWidth={1} my={2} borderRadius={4}>
          <Text fontSize="lg" fontWeight="bold">
            {event.title}
          </Text>
          <Text fontSize="md" color="gray.600">
            Location: {event.location}
          </Text>
          <Text fontSize="md" color="gray.600">
            Date: {event.date}
          </Text>
          <Text fontSize="md">{event.description}</Text>
          <Button onPress={() => setEditingEventIndex(index)}>Edit</Button>
          <Button onPress={() => deleteEvent(index)}>Delete</Button>
        </View>
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
            <View>
              <Input
                placeholder="Event Tags"
                value={chipValue}
                onChangeText={(text) => setChipValue(text)}
                onSubmitEditing={handleAddChip}
                width="100%"
								mb={2}
              />
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {!!tags?.length &&
                  tags.map((loc, index) => (
                    <Chip label={loc} onPress={() => handleDeleteChip(index)} />
                  ))}
              </View>
            </View>
            <Select
              selectedValue={selectedOption}
              minWidth={200} // Adjust the width as needed
              onValueChange={(itemValue) => setSelectedOption(itemValue)}
              mt={4} // Margin top to separate from DateTimePicker
            >
              {options.map((option, index) => (
                <Select.Item key={index} label={option} value={option} />
              ))}
            </Select>
            <View>
              <Text fontSize="md" fontWeight="bold">
                Event Date
              </Text>

              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                onChange={onChange}
                display="default"
                minimumDate={new Date()}
                style={{ width: '100%' }}
              />

              <Text fontSize="md" fontWeight="bold" mt={2}>
                Start Time
              </Text>

              <DateTimePicker
                testID="startTimePicker"
                value={startTime}
                mode="time"
                onChange={(event, selectedTime) => {
                  setStartTime(selectedTime || startTime);
                }}
                display="default"
                style={{ width: '100%' }}
              />

              <Text fontSize="md" fontWeight="bold" mt={2}>
                End Time
              </Text>
              <DateTimePicker
                testID="endTimePicker"
                value={endTime}
                mode="time"
                onChange={(event, selectedTime) => {
                  setEndTime(selectedTime || endTime);
                }}
                display="default"
                style={{ width: '100%' }}
              />
            </View>
            <HStack justifyContent="space-between" mt={4}>
              <Button onPress={createEvent}>Save Event</Button>
              <Button onPress={() => setIsCreatingEvent(false)}>Cancel</Button>
            </HStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </ScrollView>
  );
};
