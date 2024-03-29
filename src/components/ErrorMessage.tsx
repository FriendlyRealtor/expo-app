import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Colors } from '../config';

export const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: Colors.red,
    fontWeight: '600',
  },
});
