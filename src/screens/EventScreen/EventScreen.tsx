import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Center, Input, ScrollView, VStack } from 'native-base';
import { EventCard, Filter, ToggleSwitch, UpgradePrompt } from '../../components';
import { EventCategories, EventDates, EventData } from './EventTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { db } from '../../config';
import { getDocs, collection } from 'firebase/firestore';

export const EventScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategories, setSelectedCategories] = useState('');
  const [events, setEvents] = useState([]);
  const [isFreeEvent, setIsFreeEvent] = useState(false);

  useEffect(() => {
    // Function to fetch events from the "events" collection
    const fetchEvents = async () => {
      try {
        const eventCollection = collection(db, 'events');
        const querySnapshot = await getDocs(eventCollection);

        const eventsData = [];
        querySnapshot.forEach((doc) => {
          // Extract event data and add it to the eventsData array
          const event = doc.data();
          // Include the document ID as an 'id' key in the event object
          eventsData.push({
            id: doc.id,
            ...event,
          });
        });

        // Set the events state with the fetched data
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Call the fetchEvents function to populate the events state
    fetchEvents();
  }, []);

  const isDateFilterMatch = (eventDate, selectedDateFilter) => {
    const today = moment();
    const eventMoment = moment(eventDate, 'MMM DD YYYY h:mm a');

    switch (selectedDateFilter.toLowerCase()) {
      case 'today':
        return eventMoment.isSame(today, 'day');
      case 'tomorrow':
        return eventMoment.isSame(today.clone().add(1, 'day'), 'day');
      case 'this week':
        return eventMoment.isSame(today, 'week');
      case 'this weekend':
        return (
          eventMoment.isSame(today, 'week') && (eventMoment.day() === 0 || eventMoment.day() === 6)
        );
      case 'any date':
        return true;
      default:
        return false;
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const titleMatches = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatches =
        selectedCategories.length === 0 || selectedCategories.includes(event.category);
      const dateMatches =
        selectedDate.length === 0 ||
        selectedDate.some((filter) => isDateFilterMatch(event.date, filter));

      // Check if the event is free (when isFreeEvent is true), if the title matches the search query,
      // and if the category and date match the selected filters
      return titleMatches && categoryMatches && dateMatches;
    });
  }, [events, searchQuery, isFreeEvent, selectedCategories, selectedDate]);

  return (
    <View flex={1} p={4} background="white">
      {false && (
        <TouchableOpacity onPress={() => navigation.navigate('Event Organizer')}>
          <UpgradePrompt />
        </TouchableOpacity>
      )}
      <Center mt={2} mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          All events in your area will be viewed here.
        </Text>
        <Text fontSize="md" mt={2} textAlign="center" color="gray.600">
          Explore and stay updated with the latest events relevant to your real estate interests.
        </Text>
      </Center>
      <View mb={12}>
        <Input
          placeholder="Search For Events by name..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView>
        <VStack>
          <Filter
            title="Date"
            options={EventDates.map((date) => date.name)}
            onFilterChange={(filters) => setSelectedDate(filters)}
          />
          <Filter
            title="Select Categories"
            options={EventCategories.map((category) => category.name)}
            onFilterChange={(filters) => setSelectedCategories(filters)}
          />
          {/*<ToggleSwitch
            label="Only Free Events"
            initialValue={isFreeEvent}
            onValueChange={(value) => setIsFreeEvent(value)}
			/>*/}
        </VStack>
        {filteredEvents.length === 0 ? (
          <Center mt={16}>
            <Text fontWeight="bold" fontSize="lg">
              No events found for your search query or selected filters.
            </Text>
          </Center>
        ) : (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </ScrollView>
    </View>
  );
};
