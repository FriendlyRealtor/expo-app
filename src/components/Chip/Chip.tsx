import { ChipProps } from './ChipTypes';
import { Box, Text, Pressable, Flex, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export const Chip = (props: ChipProps) => {
  const { onPress, label, selected, width = 100 } = props;

  return (
    <Pressable onPress={onPress}>
      <Box
        bg={selected ? 'primary.500' : 'gray.200'}
        borderRadius="full"
        px={3}
        py={1}
        mb={2}
        flexDirection="row"
        alignItems="center"
        width={width}
      >
        <Text fontSize="sm" color={selected ? 'white' : 'gray.600'} fontWeight="bold">
          {label}
        </Text>
        <Flex justifyContent="center" alignItems="center" ml={2}>
          <Icon
            as={<MaterialIcons name="cancel" />}
            size="sm"
            color={selected ? 'white' : 'gray.600'}
          />
        </Flex>
      </Box>
    </Pressable>
  );
};
