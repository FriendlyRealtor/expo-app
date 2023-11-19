import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Center, Input, ScrollView, HStack } from 'native-base';
import { EventCard, Filter, UpgradePrompt } from '../../components';
import { EventCategories, EventDates } from './EventTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { db, Colors } from '../../config';
import { getDocs, collection } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

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
          const formattedDate = moment(event.eventDate, 'MMMM Do, YYYY').format('MMM Do');
          // Include the document ID as an 'id' key in the event object
          eventsData.push({
            id: doc.id,
            ...event,
            eventDate: formattedDate,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, padding: 4 }}>
      <ScrollView>
        {false && (
          <TouchableOpacity onPress={() => navigation.navigate('Event Organizer')}>
            <UpgradePrompt />
          </TouchableOpacity>
        )}
        <View mb={4} mx={1} textAlign="left">
          <Text fontSize="2xl" fontWeight={700}>
            Explore Local Events.
          </Text>
          <Text fontSize="xs" mt={1} mb={3} width={375} color={Colors.mediumGray}>
            Explore and stay updated with the latest events relevant to your real estate interests.
          </Text>
        </View>
        <View mb={2} mx={1}>
          <Input
            placeholder="Search For Events by name..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <HStack mx={1} mb={12} alignItems="center">
          <View mr={4}>
            <Filter
              title="Date"
              options={EventDates.map((date) => date.name)}
              onFilterChange={(filters) => setSelectedDate(filters)}
            />
          </View>
          <Filter
            title="Select Categories"
            options={EventCategories.map((category) => category.name)}
            onFilterChange={(filters) => {
              const filter = EventCategories.find((category) => category.name === filters[0]);
              if (filter && filter.key) {
                setSelectedCategories([filter.key]);
              }
            }}
          />
        </HStack>
        <View px={6}>
          {filteredEvents.length === 0 ? (
            <Center mt={16}>
              <Text fontWeight="bold" fontSize="lg">
                No events found for your search query or selected filters.
              </Text>
            </Center>
          ) : (
            filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
