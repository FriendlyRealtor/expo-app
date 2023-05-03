import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import _ from 'lodash';

export const PostScreen = () => {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <StatusBar style="auto" />
    </ScrollView>
  );
};
