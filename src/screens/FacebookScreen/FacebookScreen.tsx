import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, TextInput, Alert, Image, Switch } from 'react-native';
import { Button, HStack, View, Text, TextArea, Center, Select } from 'native-base';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import _ from 'lodash';

export const FacebookScreen = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState();
  const [generateImage, setGenerateImage] = useState(undefined);
  const [userId, setUserId] = useState('');
  const [selectedPage, setSelectedPage] = useState(undefined);
  const [postText, setPostText] = useState('');
  const [addImage, setAddImage] = useState(false);
  const [imageDescription, setImageDescription] = useState('');

  const fetchUserPages = async (accessToken, userId) => {
    try {
      const response = await fetch(
        `${Constants?.manifest?.extra?.fbBaseUrl}/${userId}/accounts?access_token=${accessToken}`,
      );
      const res = await response.json();
      setData(res.data);
      if (data?.error) {
        throw new Error(data.error.message);
      }
    } catch (error) {
      Bugsnag.notify(`Error fetching user pages: ${error}`);
      Alert.alert('Error', 'Unable to fetch user pages.');
    }
  };

  const handlePostSubmit = async () => {
    try {
      setIsSubmitting(true);

      const baseUrl = Constants?.manifest?.extra?.fbBaseUrl;
      const pageId = selectedPage.id;
      const accessToken = selectedPage.access_token;
      const imageUrl = encodeURIComponent(generateImage?.url || '');
      const captionText = encodeURIComponent(postText);
      if (addImage && imageUrl) {
        const url = `${baseUrl}/${pageId}/photos?url=${imageUrl}&caption=${captionText}&access_token=${accessToken}`;

        const response = await fetch(url, {
          method: 'POST',
        });

        const res = await response.json();

        if (res.error) {
          throw new Error(res.error.message);
        }
      } else {
        const messageUrl = `${baseUrl}/${pageId}/feed?message=${encodeURIComponent(
          postText,
        )}&access_token=${accessToken}`;
        const response = await fetch(messageUrl, {
          method: 'POST',
        });

        const res = await response.json();

        if (res.error) {
          throw new Error(res.error.message);
        }
      }

      Alert.alert('Success', 'Post submitted successfully.');
      setPostText('');
      setGenerateImage(undefined);
    } catch (error) {
      Bugsnag.notify(`Error submitting post: ${error}`);
      Alert.alert('Error', 'Unable to submit post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateImages = async () => {
    try {
      setIsImageLoading(true);
      const response = await fetch(`${Constants?.manifest?.extra?.serverUrl}/prompt-images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputMessage: imageDescription || 'Generate Real Estate Image',
          n: 1,
          size: '1024x1024',
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const res = await response.json();
      setGenerateImage(_.first(res.data));
    } catch (error) {
      Bugsnag.notify(error);
    } finally {
      setIsImageLoading(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AccessToken.getCurrentAccessToken();
      if (token) {
        setUserId(token.userID);
        fetchUserPages(token.accessToken, token.userID);
      }
    };

    fetchToken();
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <StatusBar style="auto" />
      <View mb={2}>
        <Center>
          <Text my={4}>
            To access this feature, please log in to your Facebook account to grant necessary
            permissions.
          </Text>
        </Center>
        <LoginButton
          onLoginFinished={async () => {
            const token = await AccessToken.getCurrentAccessToken();
            fetchUserPages(token?.accessToken, token?.userID);
          }}
          onLogoutFinished={() => {
            setSelectedPage(undefined);
            setData(undefined);
          }}
        />
      </View>
      <View>
        <Select
          placeholder="Select Facebook Page"
          minWidth={200}
          onValueChange={(value) => {
            const facebookPage = data.find((item) => item.name === value);
            setSelectedPage(facebookPage);
          }}
        >
          {data && data.length > 0
            ? data.map((item, index) => (
                <Select.Item key={index} label={item.name} value={item.name} />
              ))
            : null}
        </Select>
      </View>
      <View mt={8}>
        {generateImage?.url ? (
          <Image
            source={{
              uri: generateImage?.url || '',
            }}
            style={{
              height: 200,
              borderColor: 'lightgray',
              borderWidth: 2,
              overflow: 'hidden',
              marginBottom: 24,
            }}
          />
        ) : (
          <View height={200} />
        )}
        <HStack my={4} alignItems="center">
          <Text mr={4}>Add Image To Post</Text>
          <Switch value={addImage} onValueChange={() => setAddImage(!addImage)} />
        </HStack>
        {addImage && (
          <View>
            <TextInput
              placeholder="Describe the image (optional)"
              value={imageDescription}
              onChangeText={(text) => setImageDescription(text)}
              style={{ borderBottomWidth: 1, marginBottom: 12 }}
            />
            <Button onPress={generateImages} isLoading={isImageLoading}>
              Generate Image
            </Button>
          </View>
        )}
        <TextArea
          autoCompleteType={false}
          placeholder="Enter your post here"
          multiline
          value={postText}
          onChangeText={(text) => setPostText(text)}
          my={6}
        />
        <Button onPress={handlePostSubmit} disabled={!selectedPage} isLoading={isSubmitting}>
          Submit Post
        </Button>
      </View>
    </ScrollView>
  );
};
