import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { SearchProps } from './SearchTypes';
import { Text } from 'native-base';

export const Search = (props: SearchProps) => {
  const { data, label } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    setSearchQuery(text);

    const filtered = data.filter((item) => item.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {label && (
          <View style={styles.label}>
            <Text>{label}</Text>
          </View>
        )}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    paddingLeft: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  searchInput: {
    paddingHorizontal: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
});
