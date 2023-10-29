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
import { EventCard, ErrorMessage, CurrencyInput } from '../../components';
import { EventOrganizerCategories, CreateEventFormType } from './EventOrganizerScreenTypes';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import Bugsnag from '@bugsnag/expo';
import { getDocs, deleteDoc, doc, addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../config';

export const EventOrganizerScreen = () => {
  const userAuth = getAuth();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateEventFormType>({
    defaultValues: {
      title: '',
      location: '',
      description: '',
      eventDate: '',
      dateStartTime: '',
      dateEndTime: '',
      photo: '',
      category: 'open_houses',
      totalParticipants: '',
      //cost: '',
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
  const [errorState, setErrorState] = useState<string>('');

  const onCreateEvent = async (data) => {
    try {
      // Set the saving state to indicate the operation is in progress
      setSaving(true);
      const { uid } = userAuth.currentUser;

      const currentDate = moment(new Date());
      const formattedDate = currentDate.format('MMMM Do YYYY');
      const formattedStartTime = currentDate.format('h:mm a');
      const formattedEndTime = currentDate.format('h:mm a');

      // Check if eventDate is not an empty string; otherwise, use the formatted date
      const eventDate = data.eventDate ? data.eventDate : formattedDate;

      // Check if dateStartTime is not an empty string; otherwise, use the formatted start time
      const dateStartTime = data.dateStartTime ? data.dateStartTime : formattedStartTime;

      // Check if dateEndTime is not an empty string; otherwise, use the formatted end time
      const dateEndTime = data.dateEndTime ? data.dateEndTime : formattedEndTime;

      // Update the data object with the modified date and time values
      data.eventDate = eventDate;
      data.dateStartTime = dateStartTime;
      data.dateEndTime = dateEndTime;

      // Add the event data to the "events" collection in Firebase
      await addDoc(collection(db, 'events'), { ...data, participants: [], createdBy: uid });
      // Clear any previous error state, indicating a successful operation
      setErrorState('');
      setIsCreatingEvent(false);
      reset();
    } catch (error) {
      // Notify Bugsnag with the error for monitoring and debugging
      Bugsnag.notify(error);

      // Set an error state with a descriptive message and the error details
      setErrorState('Error saving event: ' + error.message);
    } finally {
      // Set the saving state to indicate that the operation is complete
      setSaving(false);
    }
  };

  // Simulated function to delete an event
  const deleteEvent = async (documentId, index) => {
    try {
      // Delete the event document from the 'events' collection using its document ID
      await deleteDoc(doc(db, 'events', documentId));

      // If the deletion is successful, remove the event from the local state
      const updatedEvents = [...events];
      updatedEvents.splice(index, 1);
      setEvents(updatedEvents);
    } catch (error) {
      // Handle any errors that may occur during deletion
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
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

  return (
    <ScrollView px={8} pt={8}>
      <Button onPress={() => setIsCreatingEvent(true)}>Create Event</Button>
      {/* List of Events */}
      {events.map((event, index) => (
        <EventCard
          key={event.id}
          index={index}
          event={event}
          isOrganizerCard
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
                <View textAlign="center">
                  {errorState != '' ? <ErrorMessage error={errorState} visible={true} /> : null}
                </View>
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
                  rules={{ required: 'Field is required', minLength: 3 }}
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
                  rules={{ required: 'Field is required', minLength: 3 }}
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
                  rules={{ required: 'Field is required', minLength: 3 }}
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
                  rules={{ required: 'Field is required', min: 1 }}
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

              {/*<FormControl>
                <FormControl.Label>Cost of Event (0 = Free)</FormControl.Label>
                <Controller
                  control={control}
                  name="cost"
                  render={({ field: { onChange, value , onBlur } }) => (
                    <View my={4}>
                      <CurrencyInput
                        value={value}
                        onChangeText={(val) => onChange(val)}
                        onBlur={onBlur}
												wholeNumbersOnly
                        placeholder="Cost of Event (0 = Free)"
                      />
                    </View>
                  )}
                />
                <ErrorMessage error={errors.cost?.message} visible={!!errors.cost?.message} />
									</FormControl>*/}

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
