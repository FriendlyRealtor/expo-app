import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from '@ui-kitten/components';

export const Loading = ({ label }: { label?: string }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Text category="h6">{label || 'Loading...'}</Text>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};
