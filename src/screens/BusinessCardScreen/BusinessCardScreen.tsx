import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BusinessCardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.vCardText}>{vCardData}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vCardText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default BusinessCardScreen;
