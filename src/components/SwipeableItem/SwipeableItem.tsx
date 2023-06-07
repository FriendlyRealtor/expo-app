import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { Animated } from 'react-native';
import { SwipeableItemProps } from './SwipeableItemTypes';
import { EvilIcons } from '@expo/vector-icons';
import { IconButton, Icon } from 'native-base';

export const SwipeableItem = ({ item, onDelete, children }: SwipeableItemProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.id);
    }
  };

  const renderRightActions = (_, dragX) => {
    const transX = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <RectButton onPress={handleDelete}>
        <Animated.View
          style={{
            transform: [{ translateX: transX }],
          }}
        >
          <IconButton icon={<Icon as={EvilIcons} name="trash" size="lg" color="red.500" />} />
        </Animated.View>
      </RectButton>
    );
  };

  return <Swipeable renderRightActions={renderRightActions}>{children}</Swipeable>;
};
