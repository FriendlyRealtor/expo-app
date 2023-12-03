import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, images } from '../../constants';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Bugsnag from '@bugsnag/expo';

export const AIScreen = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [outputMessage, setOutputMessage] = useState('Results to be shown here.');
  const [messages, setMessages] = useState([]);
  const [isChatSaved, setIsChatSaved] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const placeholderText =
    'Get started with your personal AI assistant for realtors. Ask any questions about real estate.';

  useEffect(() => {
    const fetchVoiceToSpeechStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('voiceToSpeechEnabled');
        setIsEnabled(value);
      } catch (error) {
        setError('Error retrieving Voice to Speech status');
      }
    };

    fetchVoiceToSpeechStatus();
  }, []);

  const handleInputText = (text) => {
    setInputMessage(text);
  };

  const saveChat = async () => {
    try {
      const existingMessages = await AsyncStorage.getItem('chat_messages');
      const parsedMessages = existingMessages ? JSON.parse(existingMessages) : [];
      const updatedMessages = GiftedChat.append(parsedMessages, messages);
      await AsyncStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
      setIsChatSaved(true);
    } catch (error) {
      setError('Error isLoading chat');
    }
  };

  const renderMessage = (props) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 1) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: COLORS.primary,
                marginRight: 12,
                marginVertical: 12,
              },
            }}
            textStyle={{
              right: {
                color: COLORS.white, // Change the text color for the sender here
              },
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <Image
            source={images.avatar}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginLeft: 8,
            }}
          />
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: COLORS.tertiaryBlack,
                marginLeft: 12,
              },
            }}
            textStyle={{
              left: {
                color: COLORS.white, // Change the text color for the sender here
              },
            }}
          />
        </View>
      );
    }
  };

  const submitHandler = () => {
    if (inputMessage.toLocaleLowerCase().startsWith('generate image')) {
      generateImages();
    } else {
      generateText();
    }
  };

  const generateText = async () => {
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((previousMessage) => GiftedChat.append(previousMessage, [message]));
    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.SERVER_URL}/mobile-prompt`, {
        inputMessage: inputMessage,
      });

      if (response.status === 200) {
        const data = response.data;
        setInputMessage('');
        setOutputMessage(data.choices[0]);
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: data?.choices[0]?.message?.content || 'Assistant could not find a responose.',
          createdAt: new Date(),
          user: { _id: 2, name: 'Brain Chat' },
        };
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]));

        if (isEnabled === 'true' || isEnabled === true) {
          const options = {};
          Speech.speak(data.choices[0], options);
        }
      }
    } catch (error) {
      // Handle errors here
      Bugsnag.notify(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImages = async () => {
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((previousMessage) => GiftedChat.append(previousMessage, [message]));
    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.SERVER_URL}/prompt-images`, {
        inputMessage: inputMessage,
        n: 1,
        size: '1024x1024',
      });

      if (response.status === 200) {
        const data = response.data;
        setInputMessage('');
        setOutputMessage(data.data[0].url);

        data.data.forEach((item) => {
          const message = {
            _id: Math.random().toString(36).substring(7),
            text: 'Image',
            createdAt: new Date(),
            user: { _id: 2, name: 'Brain Chat' },
            image: item.url,
          };
          setMessages((previousMessages) => GiftedChat.append(previousMessages, [message]));
        });
      }
    } catch (error) {
      // Handle errors here
      Bugsnag.notify(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <View
        style={{
          height: 60,
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          top: 0,
          right: 0,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 22,
          width: SIZES.width,
          zIndex: 999,
        }}
      >
        <TouchableOpacity onPress={saveChat}>
          {isChatSaved ? (
            <Ionicons name="bookmark" size={24} color={'#0B0B0B'} />
          ) : (
            <Ionicons name="bookmark-outline" size={24} color={'#0B0B0B'} />
          )}
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {messages.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, color: COLORS.gray }}>{placeholderText}</Text>
          </View>
        ) : (
          <GiftedChat
            messages={messages}
            user={{ _id: 1 }}
            renderInputToolbar={() => undefined}
            minInputToolbarHeight={0}
            renderMessage={renderMessage}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          paddingVertical: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            backgroundColor: false ? COLORS.tertiaryBlack : '#F2F2F2',
            paddingVertical: 8,
            marginHorizontal: 12,
            borderRadius: 12,
          }}
        >
          <TextInput
            style={{
              color: '#0B0B0B',
              flex: 1,
              paddingHorizontal: 10,
            }}
            value={inputMessage}
            onChangeText={handleInputText}
            placeholderTextColor={'#0B0B0B'}
            placeholder="Enter your question"
          />
          <TouchableOpacity onPress={submitHandler}>
            {isLoading ? (
              // Render the loading indicator (three dots) when loading is true
              <View
                style={{
                  padding: 6,
                  borderRadius: 8,
                  marginHorizontal: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator size="small" color={COLORS.primary} />
              </View>
            ) : (
              // Render the send icon when not loading
              <View
                style={{
                  padding: 6,
                  borderRadius: 8,
                  marginHorizontal: 12,
                }}
              >
                <FontAwesome name="send-o" size={24} color={COLORS.primary} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
