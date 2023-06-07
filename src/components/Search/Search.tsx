import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { SearchProps } from './SearchTypes';
import {
  Input,
  Icon,
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Text,
  View,
  IconButton,
} from 'native-base';
import { EvilIcons } from '@expo/vector-icons';

export const Search = (props: SearchProps) => {
  const { data, label, onSelectionChange, resetQuery } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedUser, setSelectedUser] = useState({});

  const handleSearch = (text) => {
    setSearchQuery(text);

    const filtered = data.filter(
      (item) =>
        item.name &&
        item.userName &&
        (item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.userName.toLowerCase().includes(text.toLowerCase())),
    );
    setFilteredData(filtered);
    setFilteredData(filtered);
  };

  const handleSelectUser = (item) => {
    setSelectedUser(item);
    onSelectionChange(item);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedUser({});
  };

  useEffect(() => {
    if (resetQuery) {
      handleReset();
    }
  }, [resetQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {label && (
          <View style={styles.label}>
            <Text>{label}</Text>
          </View>
        )}
        <Input
          borderWidth={0}
          backgroundColor="white"
          placeholder="Search..."
          width={250}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {searchQuery.length > 0 && Object.keys(selectedUser).length === 0 ? (
        <FlatList
          data={filteredData}
          contentContainerStyle={styles.listContainer}
          maxHeight={200}
          renderItem={({ item }) => (
            <Pressable key={item.id} onPress={() => handleSelectUser(item)}>
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: 'muted.50',
                }}
                borderColor="muted.800"
                pl={['0', '4']}
                pr={['0', '5']}
                py="2"
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.fullName}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Pressable>
          )}
        />
      ) : (
        Object.keys(selectedUser).length > 0 && (
          <View
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>{selectedUser.userName || selectedUser.name}</Text>
            <IconButton icon={<Icon as={EvilIcons} name="close" />} onPress={handleReset} />
          </View>
        )
      )}
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
    width: '100%',
    marginHorizontal: 0,
    gap: 8,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
});
