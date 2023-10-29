import React, { useState } from 'react';
import { View, Text, Input } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CurrencyInput = ({ value, onChangeText, onBlur, placeholder, wholeNumbersOnly }) => {
  const [formattedValue, setFormattedValue] = useState(value);

  const handleChangeText = (text) => {
    // Remove any non-numeric characters
    let numericValue = text.replace(/[^0-9.]/g, '');

    // Allow only two decimal places
    if (numericValue.includes('.')) {
      const decimalPart = numericValue.split('.')[1];
      if (decimalPart.length > 2) {
        numericValue = numericValue.slice(0, numericValue.indexOf('.') + 3);
      }
    }

    // Limit to whole numbers if the wholeNumbersOnly prop is true
    if (wholeNumbersOnly) {
      numericValue = numericValue.split('.')[0];
    }

    setFormattedValue(numericValue);
    onChangeText(numericValue);
  };

  return (
    <View flexDirection="row" alignItems="center" padding={0}>
      <MaterialCommunityIcons name="currency-usd" size={22} color="gray" />
      <Input
        value={formattedValue}
        onChangeText={handleChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        keyboardType="numeric"
      />
    </View>
  );
};
