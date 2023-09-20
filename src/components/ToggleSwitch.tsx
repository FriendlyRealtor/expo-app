import React, { useEffect, useState } from 'react';
import { View, Text, Switch, HStack } from 'native-base';

export const ToggleSwitch = ({ label, initialValue = false, onValueChange }) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    if (onValueChange) {
      onValueChange(!isEnabled);
    }
  };

  return (
    <View>
      <HStack space={2} alignItems="center">
        <Text>{label}</Text>
        <Switch colorScheme="blue" isChecked={isEnabled} onToggle={toggleSwitch} size="sm" />
      </HStack>
    </View>
  );
};
