import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, TextInput, Alert, Image, Switch } from 'react-native';
import { Button, HStack, View, Text, TextArea, Center, Select } from 'native-base';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import _ from 'lodash';
import fetch from 'node-fetch'; // Import node-fetch

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
  const [businessAccess, setBusinessAccess] = useState(false); // New state for business access
  const [pageId, setPageId] = useState(''); // New state for page ID

  const fetchUserPages = async (accessToken, userId) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${userId}/accounts?access_token=${accessToken}`,
      );
      const res = await response.json();
      setData(res.data);
      if (res.error) {
        throw new Error(res.error.message);
      }
    } catch (error) {
      Bugsnag.notify(`Error fetching user pages: ${error}`);
      Alert.alert('Error', 'Unable to fetch user pages.');
    }
  };

  const handlePostSubmit = async () => {
    try {
      setIsSubmitting(true);

      const pageIdToUse = businessAccess ? pageId : selectedPage.id; // Use the selected Page ID or the manually input Page ID
      const accessTokenToUse = businessAccess
        ? selectedPage.access_token
        : selectedPage.access_token;
      const imageUrl = encodeURIComponent(generateImage?.url || '');
      const captionText = encodeURIComponent(postText);

      let url = `https://graph.facebook.com/v18.0/${pageIdToUse}/`;

      if (addImage && imageUrl) {
        url += 'photos';
      } else {
        url += 'feed';
      }

      url += `?url=${imageUrl}&caption=${captionText}&access_token=${accessTokenToUse}`;

      const response = await fetch(url, {
        method: 'POST',
      });

      const res = await response.json();

      if (res.error) {
        throw new Error(res.error.message);
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
        <HStack my={4} alignItems="center">
          <Text mr={4}>Grant Business Access</Text>
          <Switch value={businessAccess} onValueChange={() => setBusinessAccess(!businessAccess)} />
        </HStack>
        {businessAccess && (
          <View>
            <TextInput
              placeholder="Enter Page ID"
              value={pageId}
              onChangeText={(text) => setPageId(text)}
              style={{ borderBottomWidth: 1, marginBottom: 12 }}
            />
          </View>
        )}
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
