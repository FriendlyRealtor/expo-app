import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  Input,
  ScrollView,
  Actionsheet,
  FormControl,
  Flex,
  Select,
  HStack,
  TextArea,
  VStack,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { EventCard, ErrorMessage, CurrencyInput } from '../../components';
import { EventOrganizerCategories, CreateEventFormType } from './EventOrganizerScreenTypes';
import { useForm, Controller } from 'react-hook-form';
import { UpgradeBenefitsSection } from './UpgradeBenefitsSection';
import moment from 'moment';

export const EventOrganizerScreen = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateEventFormType>({
    defaultValues: {
      title: '',
      location: '',
      description: '',
      eventDate: '',
      dateStartTime: '',
      photo: '',
      dateEndTime: '',
      category: '',
      totalParticipants: '',
      cost: '',
    },
  });

  const [events, setEvents] = useState([]); // Store the list of events
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

  const onCreateEvent = (data) => {
    console.log('what is this', data);
    // setSaving(true);
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
            <VStack width="80%" space={4}>
              {/*<FormControl isInvalid={'photo' in errors}>
								<FormControl.Label>Event Photo</FormControl.Label>
								<Controller 
									control={control}
									render={({ onChange }) => (
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
									)}
								/>
										</FormControl>*/}

              <FormControl>
                <FormControl.Label>Event Title</FormControl.Label>
                <Controller
                  control={control}
                  name="title"
                  rules={{ required: 'Field is required', minLength: 3 }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      value={value}
                      onChangeText={(val) => onChange(val)}
                      onBlur={onBlur}
                      placeholder="Event Title"
                      my={4}
                    />
                  )}
                />
                <ErrorMessage error={errors.title?.message} visible={!!errors.title?.message} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Event Organizer</FormControl.Label>
                <Controller
                  control={control}
                  name="organizer"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      value={value}
                      onChangeText={(val) => onChange(val)}
                      onBlur={onBlur}
                      placeholder="Event Organizer"
                      my={4}
                    />
                  )}
                />
                <ErrorMessage
                  error={errors.organizer?.message}
                  visible={!!errors.organizer?.message}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Event Location</FormControl.Label>
                <Controller
                  control={control}
                  name="location"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      value={value}
                      onChangeText={(val) => onChange(val)}
                      onBlur={onBlur}
                      placeholder="Event Location"
                      my={4}
                    />
                  )}
                />
                <ErrorMessage
                  error={errors.location?.message}
                  visible={!!errors.location?.message}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Event Description</FormControl.Label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextArea
                      value={value}
                      onChangeText={(val) => onChange(val)}
                      onBlur={onBlur}
                      placeholder="Event Description"
                      my={4}
                    />
                  )}
                />
                <ErrorMessage
                  error={errors.description?.message}
                  visible={!!errors.description?.message}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Event Category</FormControl.Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      selectedValue={value}
                      minWidth={200}
                      onValueChange={(val) => onChange(val)}
                      mt={4}
                    >
                      {EventOrganizerCategories.map((option, index) => (
                        <Select.Item key={index} label={option.name} value={option.key} />
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
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
                    display="default"
                    minimumDate={new Date()}
                    onChange={(event, selectedTime) => {
                      if (event.type === 'set') {
                        const formattedDate = moment(selectedTime).format('MMMM Do YYYY');
                        setValue('eventDate', formattedDate);
                      }
                    }}
                  />
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startTime}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      if (event.type === 'set') {
                        const formattedTime = moment(selectedTime).format('h:mm a');
                        setValue('dateStartTime', formattedTime);
                      }
                    }}
                  />
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endTime}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      if (event.type === 'set') {
                        const formattedTime = moment(selectedTime).format('h:mm a');
                        setValue('dateEndTime', formattedTime);
                      }
                    }}
                  />
                </HStack>
              </Flex>
              <FormControl>
                <FormControl.Label>Total Available Participants</FormControl.Label>
                <Controller
                  control={control}
                  name="totalParticipants"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      value={value}
                      onChangeText={(val) => {
                        // Use a regular expression to remove any non-numeric characters
                        const numericValue = val.replace(/[^0-9]/g, '');
                        onChange(numericValue);
                      }}
                      onBlur={onBlur}
                      placeholder="Total Available Participants"
                      keyboardType="numeric"
                      my={4}
                    />
                  )}
                />
                <ErrorMessage
                  error={errors.totalParticipants?.message}
                  visible={!!errors.totalParticipants?.message}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Cost of Event (0 = Free)</FormControl.Label>
                <Controller
                  control={control}
                  name="cost"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <View my={4}>
                      <CurrencyInput
                        value={value}
                        onChangeText={(val) => onChange(val)}
                        onBlur={onBlur}
                        placeholder="Cost of Event (0 = Free)"
                      />
                    </View>
                  )}
                />
                <ErrorMessage error={errors.cost?.message} visible={!!errors.cost?.message} />
              </FormControl>

              <HStack justifyContent="space-between" mt={4}>
                <Button onPress={handleSubmit(onCreateEvent)} isLoading={saving}>
                  Save Event
                </Button>
                <Button onPress={() => setIsCreatingEvent(false)}>Cancel</Button>
              </HStack>
            </VStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </ScrollView>
  );
};
