import { ChipProps } from './ChipTypes';
import { Box, Text, Pressable } from 'native-base';

export const Chip = (props: ChipProps) => {
  const { onPress, label, selected } = props;

  return (
    <Pressable onPress={onPress}>
      <Box
        bg={selected ? 'primary.500' : 'gray.200'}
        borderRadius="full"
        px={3}
        py={1}
        mr={2}
        mb={2}
      >
        <Text fontSize="sm" color={selected ? 'white' : 'gray.600'} fontWeight="bold">
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};
