import React, { useState } from 'react';
import { View, Text, Input } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const CurrencyInput = ({ value, onChangeText, onBlur, placeholder }) => {
  const [formattedValue, setFormattedValue] = useState(value);

  const handleChangeText = (text) => {
    // Remove any non-numeric characters and keep up to two decimal places
    const numericValue = text.replace(/[^0-9.]/g, '');
    const decimalCount = (numericValue.match(/\./g) || []).length;

    if (decimalCount <= 1) {
      setFormattedValue(numericValue);
      onChangeText(numericValue);
    }
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
