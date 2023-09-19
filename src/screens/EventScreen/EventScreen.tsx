import React, { useState } from 'react';
import { View, Text, Input, Icon, ScrollView, Box, Actionsheet, Button, HStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../config';

// Reusable Event Card Component
const EventCard = ({ event }) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const handleJoinEvent = () => {
    console.log('Implement logic to join event');
  };

  const buttons = [
    { text: 'Event Details', onPress: () => setActionSheetVisible(true), color: Colors.blue },
    { text: 'Join Event', onPress: () => handleJoinEvent(), color: Colors.transparent },
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
        mx="auto"
        onPress={() => setActionSheetVisible(true)}
      >
        {/* Event Image */}
        <Box height={100} bg="gray.200" borderRadius={8} marginBottom={4}>
          {/* Replace with your event image */}
        </Box>

        {/* Event Details */}
        <Text fontSize="xl" fontWeight="bold">
          {event.title}
        </Text>
        <Text fontSize="md" color="gray.600" my={2}>
          Location: {event.location}
        </Text>
        <Text fontSize="md" color="gray.600">
          Time: {event.timeframe}
        </Text>
        <Text fontSize="md" color="gray.600" my={2}>
          Attendees: {event.attendees}
        </Text>
        <Text fontSize="md" color="gray.600">
          Cost: {event.cost}
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

export const EventScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Event 1',
      location: 'Location 1',
      timeframe: 'Timeframe 1',
      attendees: 100,
      cost: 'Free',
      description: 'Description of Event 1...',
      address: '123 Main St, City, Country',
      longerDetails: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula ex eu odio tincidunt, in facilisis arcu blandit. Sed ac euismod risus. Nulla facilisi. In hac habitasse platea dictumst. Vivamus viverra nisl id purus dictum, eget fringilla augue vulputate. Proin auctor mauris velit, id condimentum elit lacinia at. Vestibulum auctor odio in eros vehicula tempus. Fusce eleifend at ante eu iaculis. Sed vestibulum quis libero id fermentum. Aliquam vitae gravida turpis. Nunc id orci in massa pharetra viverra. Nullam quis est eu dolor lacinia elementum. Vivamus tincidunt scelerisque vehicula. Fusce vulputate neque ac libero hendrerit bibendum. Nullam eu auctor nunc. Aliquam venenatis fermentum odio, nec aliquet justo tincidunt non. Nullam malesuada pharetra erat eget varius.

  Phasellus nec ultrices quam. Integer a sapien purus. Fusce vel feugiat erat. Cras blandit purus quis lacinia pharetra. Sed luctus ut justo non dapibus. Quisque euismod bibendum cursus. Sed sed purus venenatis, efficitur sapien sit amet, hendrerit est. Fusce non ante vel nulla finibus aliquam. Praesent scelerisque risus nec aliquam consectetur. Proin iaculis ligula id libero tincidunt rhoncus. Integer blandit urna velit, nec blandit ipsum mattis eget. Fusce eget neque ac quam efficitur auctor. Vestibulum sollicitudin malesuada justo, non laoreet velit laoreet at. Suspendisse quis ligula ut lectus efficitur scelerisque eu in leo. Aliquam nec bibendum arcu, non vestibulum nisi. Ut hendrerit euismod libero non vulputate.

  Address: 123 Main St, City, Country`,
    },
    {
      id: 2,
      title: 'Event 2',
      location: 'Location 2',
      timeframe: 'Timeframe 2',
      attendees: 50,
      cost: '$10',
      description: 'Description of Event 2...',
    },
    {
      id: 3,
      title: 'Event 2',
      location: 'Location 2',
      timeframe: 'Timeframe 2',
      attendees: 50,
      cost: '$10',
      description: 'Description of Event 2...',
    },
    {
      id: 4,
      title: 'Event 2',
      location: 'Location 2',
      timeframe: 'Timeframe 2',
      attendees: 50,
      cost: '$10',
      description: 'Description of Event 2...',
    },
    {
      id: 5,
      title: 'Event 2',
      location: 'Location 2',
      timeframe: 'Timeframe 2',
      attendees: 50,
      cost: '$10',
      description: 'Description of Event 2...',
    },
    {
      id: 6,
      title: 'Event 2',
      location: 'Location 2',
      timeframe: 'Timeframe 2',
      attendees: 50,
      cost: '$10',
      description: 'Description of Event 2...',
    },
    // Add more events here
  ]);

  const handleSearch = () => {
    // Implement your search logic here.
  };

  return (
    <View flex={1} p={4}>
      {/* Search Bar */}
      {/*<View flexDirection="row" alignItems="center" mb={4}>
        <Input
          flex={1}
          variant="filled"
          placeholder="Search Local Events"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          InputLeftElement={
            <Icon as={<MaterialCommunityIcons name="magnify" />} size="md" m={2} color="gray.400" />
          }
          InputRightElement={
            <Icon
              as={<MaterialCommunityIcons name="arrow-right" />}
              size="md"
              m={2}
              color="gray.400"
              onPress={handleSearch}
            />
          }
        />
				</View>*/}

      {/* Event List */}
      <ScrollView>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>
    </View>
  );
};
