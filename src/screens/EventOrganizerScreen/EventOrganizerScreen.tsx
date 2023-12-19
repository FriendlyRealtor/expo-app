import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  Input,
  Heading,
  ScrollView,
  Actionsheet,
  FormControl,
  Flex,
  Select,
  HStack,
  TextArea,
  VStack,
  KeyboardAvoidingView,
  Switch,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EventCard, ErrorMessage } from '../../components';
import { EventOrganizerCategories, CreateEventFormType } from './EventOrganizerScreenTypes';
import { useForm, Controller } from 'react-hook-form';
import { RefreshControl } from 'react-native';
import moment from 'moment';
import Bugsnag from '@bugsnag/expo';
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../config';
import { Colors } from '../../config';
import { useRefresh } from '../../hooks';
import _ from 'lodash';

export const EventOrganizerScreen = () => {
  const userAuth = getAuth();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
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
      link: '',
      virtual: false,
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

  const { uid } = userAuth.currentUser;
  const fetchEvents = async () => {
    try {
      const eventCollection = collection(db, 'events');
      const querySnapshot = await getDocs(query(eventCollection, orderBy('createdAt', 'desc')));

      const eventsData = [];
      querySnapshot.forEach((doc) => {
        const event = doc.data();
        const formattedDate = moment(event.eventDate, 'MMMM Do, YYYY').format('MMM Do');

        if (event.createdBy === uid) {
          eventsData.push({
            id: doc.id,
            ...event,
            eventDate: formattedDate,
          });
        }
      });

      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRefresh = async (): Promise<void> => {
    setTimeout(() => {
      fetchEvents();
    }, 2000);
  };

  const { isRefreshing, onRefresh } = useRefresh({ handleRefresh });

  const onCreateEvent = async (data) => {
    try {
      // Set the saving state to indicate the operation is in progress
      setSaving(true);
      const { uid } = userAuth.currentUser;

      const currentDate = moment(new Date());
      const formattedDate = currentDate.format('MMM Do YYYY');
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
      await addDoc(collection(db, 'events'), {
        ...data,
        participants: [],
        createdBy: uid,
        createdAt: serverTimestamp(),
      });
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

  return (
    <ScrollView
      px={8}
      pt={8}
      background="white"
      height="full"
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Follow these simple steps to create your event and connect with your audience:
      </Text>

      <Text fontSize="md" mb={4}>
        1. Tap "Create Event" below.
      </Text>

      <Text fontSize="md" mb={4}>
        2. Fill in event details, choose a category, and set the date.
      </Text>

      <Text fontSize="md" mb={4}>
        3. Specify total participants and hit "Save Event."
      </Text>
      <Button onPress={() => setIsCreatingEvent(true)} color={Colors.color2}>
        Create Event
      </Button>
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

              <KeyboardAvoidingView>
                <FormControl>
                  <View textAlign="center">
                    {errorState != '' ? <ErrorMessage error={errorState} visible={true} /> : null}
                  </View>
                  <FormControl.Label>
                    <Heading size="sm">Event Title</Heading>
                  </FormControl.Label>
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
                      />
                    )}
                  />
                  <ErrorMessage error={errors.title?.message} visible={!!errors.title?.message} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>
                    <Heading size="sm">Event Organizer</Heading>
                  </FormControl.Label>
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
                      />
                    )}
                  />
                  <ErrorMessage
                    error={errors.organizer?.message}
                    visible={!!errors.organizer?.message}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>
                    <Heading size="sm">Event Location</Heading>
                  </FormControl.Label>
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
                      />
                    )}
                  />
                  <ErrorMessage
                    error={errors.location?.message}
                    visible={!!errors.location?.message}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>
                    <Heading size="sm">Event Description</Heading>
                  </FormControl.Label>
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
                      />
                    )}
                  />
                  <ErrorMessage
                    error={errors.description?.message}
                    visible={!!errors.description?.message}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>
                    <Heading size="sm">Online Event</Heading>
                  </FormControl.Label>
                  <Controller
                    control={control}
                    name="virtual"
                    render={({ field: { onChange, value } }) => (
                      <Switch value={value} onValueChange={(val) => onChange(val)} />
                    )}
                  />
                </FormControl>

                {watch('virtual') && (
                  <FormControl>
                    <FormControl.Label>
                      <Heading size="sm">Link Url</Heading>
                    </FormControl.Label>
                    <Controller
                      control={control}
                      name="link"
                      rules={{
                        required: 'Field is required',
                        minLength: 1,
                      }}
                      render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                          value={value}
                          onChangeText={(val) => {
                            onChange(val);
                          }}
                          onBlur={onBlur}
                          placeholder="Online Meeting Link"
                        />
                      )}
                    />
                    <ErrorMessage error={errors.link?.message} visible={!!errors.link?.message} />
                  </FormControl>
                )}
                <FormControl>
                  <FormControl.Label>
                    <Heading size="sm">Event Category</Heading>
                  </FormControl.Label>
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
                          const formattedDate = moment(selectedTime).format('MMM Do YYYY');
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
                  <FormControl.Label>
                    <Heading size="sm">Total Available Participants</Heading>
                  </FormControl.Label>
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
                      />
                    )}
                  />
                  <ErrorMessage
                    error={errors.totalParticipants?.message}
                    visible={!!errors.totalParticipants?.message}
                  />
                </FormControl>
              </KeyboardAvoidingView>
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
