import React, { useState } from 'react';
import { View, Text, Input, Button, VStack, FormControl } from 'native-base';

export const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSaveCard = () => {
    // Implement logic to save card information here
    // Typically, you would send this data to a backend server for processing
  };

  return (
    <View flex={1} p={4}>
      <Text fontSize="xl" mb={4}>
        Add Card Information
      </Text>
      <VStack space={4}>
        <FormControl>
          <FormControl.Label>Card Number</FormControl.Label>
          <Input
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(text)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Expiry Date</FormControl.Label>
          <Input
            placeholder="MM/YY"
            keyboardType="number-pad"
            value={expiryDate}
            onChangeText={(text) => setExpiryDate(text)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>CVV</FormControl.Label>
          <Input
            placeholder="123"
            keyboardType="number-pad"
            value={cvv}
            onChangeText={(text) => setCvv(text)}
          />
        </FormControl>
        <Button colorScheme="primary" onPress={handleSaveCard}>
          Save Card
        </Button>
      </VStack>
    </View>
  );
};
