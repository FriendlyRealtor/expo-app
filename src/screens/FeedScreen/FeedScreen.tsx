import React, { useState } from 'react';
import _ from 'lodash';
import { StatusBar, ScrollView, Button, Alert } from 'react-native';
import { Input } from 'native-base';

export const FeedScreen = () => {
  const [apiKey, setApiKey] = useState('');

  const handleSaveApiKey = () => {
    if (apiKey) {
      // Call the function to set the API key (update this based on your API handling logic)
      setApiKey(apiKey);
      Alert.alert('Success', 'API Key saved successfully!');
    } else {
      Alert.alert('Error', 'Please enter a valid API Key.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <StatusBar style="auto" />
      <Input
        placeholder="Enter Follow Up Boss API Key"
        value={apiKey}
        onChangeText={(text) => setApiKey(text)}
      />

      <Button title="Save API Key" onPress={handleSaveApiKey} />
    </ScrollView>
  );
};
