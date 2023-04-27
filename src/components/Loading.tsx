import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text, Spinner } from '@ui-kitten/components';

export const Loading = ({ label }: { label?: string }) => {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      top: '50%',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
    },
    padding: {
      padding: 16,
    },
  });

  return (
    <Layout style={styles.container} level="1">
      <View style={styles.flexContainer}>
        <Spinner size="giant" status="primary" />
        <Text category="h6" style={styles.padding}>
          {label || 'Loading...'}
        </Text>
      </View>
    </Layout>
  );
};
