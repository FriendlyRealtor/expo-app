import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, View, TextInput, Button, Alert } from 'react-native';
import { useFacebook } from '../../hooks';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import Bugsnag from '@bugsnag/expo';

export const FacebookScreen = () => {
  const facebook = useFacebook();
  const [pageId, setPageId] = useState('');
  const [userAccessToken, setUserAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userPages, setUserPages] = useState([]);

  const fetchUserPages = async (accessToken, userId) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${userId}/accounts?access_token=${accessToken}`,
      );
      const data = await response.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error.message);
      }
      setUserPages(data.data || []);
    } catch (error) {
      Bugsnag.notify(`Error fetching user pages: ${error}`);
      Alert.alert('Error', 'Unable to fetch user pages.');
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AccessToken.getCurrentAccessToken();
      if (token) {
        setUserAccessToken(token.accessToken);
        setUserId(token.userID);
        fetchUserPages(token.accessToken, token.userID);
      }
    };

    fetchToken();
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <StatusBar style="auto" />
      <View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    </ScrollView>
  );
};
