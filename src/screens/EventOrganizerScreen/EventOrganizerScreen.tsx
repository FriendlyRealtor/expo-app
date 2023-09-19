import React, { useState, useEffect } from 'react';
import { View, Text, Button, Input, ScrollView } from 'native-base';

export const EventOrganizerScreen = () => {
  const [events, setEvents] = useState([]); // Store the list of events
  const [newEvent, setNewEvent] = useState({ title: '', location: '', description: '', date: '' });
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState(-1); // Index of the event being edited

  // Simulated function to create a new event
  const createEvent = () => {
    // Validate and save the new event to your database
    // For simplicity, we'll just add it to the local state here
    setEvents([...events, newEvent]);
    setIsCreatingEvent(false);
    setNewEvent({ title: '', location: '', description: '', date: '' });
    // You would typically send the event data to your backend or database here
  };

  // Simulated function to edit an event
  const editEvent = () => {
    // Validate and update the edited event in your database
    // For simplicity, we'll just update it in the local state here
    const updatedEvents = [...events];
    updatedEvents[editingEventIndex] = newEvent;
    setEvents(updatedEvents);
    setIsCreatingEvent(false);
    setNewEvent({ title: '', location: '', description: '', date: '' });
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

  return (
    <ScrollView>
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
        Event Organizer Screen
      </Text>

      {/* Create Event Button */}
      {!isCreatingEvent ? (
        <Button onPress={() => setIsCreatingEvent(true)}>Create Event</Button>
      ) : (
        // New Event Form
        <View>
          <Input
            placeholder="Event Title"
            value={newEvent.title}
            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
          />
          <Input
            placeholder="Event Location"
            value={newEvent.location}
            onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
          />
          <Input
            placeholder="Event Description"
            value={newEvent.description}
            onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
          />
          <Input
            placeholder="Event Date"
            value={newEvent.date}
            onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
          />
          {editingEventIndex === -1 ? (
            <Button onPress={createEvent}>Save Event</Button>
          ) : (
            <Button onPress={editEvent}>Update Event</Button>
          )}
          <Button onPress={() => setIsCreatingEvent(false)}>Cancel</Button>
        </View>
      )}

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
    </ScrollView>
  );
};
