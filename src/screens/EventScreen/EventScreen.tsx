import React, { useState } from 'react';
import { View, Text, Input, Icon, ScrollView, Box, Actionsheet, Button, HStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../config';
import { EventCard } from '../../components';

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
