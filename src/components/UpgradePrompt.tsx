import React from 'react';
import { Text, Box } from 'native-base';

export const UpgradePrompt = () => {
  return (
    <Box borderWidth={1} borderColor="gray.200" p={4} borderRadius={4} marginBottom={4}>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Unlock Premium Features
      </Text>
      <Text mb={4}>
        Create and host your own events to monetize your creative thinking and boost your real
        estate business.
      </Text>
    </Box>
  );
};
