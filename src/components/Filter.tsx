import React, { useState, useEffect } from 'react';
import {
  HStack,
  View,
  Text,
  Button,
  ScrollView,
  CheckIcon,
  Box,
  Icon,
  IconButton,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Filter = ({ title = 'Select Filters', options, multiSelect, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const toggleFilter = (filter) => {
    if (multiSelect) {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((selected) => selected !== filter));
      } else {
        setSelectedFilters([...selectedFilters, filter]);
      }
    } else {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters([]);
      } else {
        setSelectedFilters([filter]);
      }
    }
  };

  // Determine the label for the "Select Filters" button
  const selectFiltersLabel = selectedFilters.length === 0 ? `${title}` : selectedFilters.join(', ');

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        variant="ghost"
        padding={0}
      >
        <HStack space={2} alignItems="center" borderWidth={1} px={2}>
          <Text>{selectFiltersLabel}</Text>
          <Icon
            as={MaterialCommunityIcons}
            name={isDropdownOpen ? 'arrow-down' : 'arrow-up'}
            size="lg"
            backgroundColor={'transparent'}
            ml={2}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        </HStack>
      </TouchableOpacity>

      {isDropdownOpen && (
        <Box borderWidth={1} borderColor="gray.200" mt={2} p={2} borderRadius={4}>
          <ScrollView>
            {options.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => toggleFilter(filter)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                {selectedFilters.includes(filter) && <CheckIcon size={3} mr={2} />}
                <Text>{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Box>
      )}
    </View>
  );
};
