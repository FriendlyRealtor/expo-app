import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {icons} from '../assets/icons';
import {AppStyle} from '../assets/style';
export const forFadeOpacity = ({current}) => {
  //progress
  return {
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
    },
  };
};

export const forFadeOpacityZero = ({current}) => {
  //progress
  return {
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  };
};

export const options = (title, show) => {
  const theme = useTheme();
  return {
    title: title,
    headerShown: show,
    headerTitleAlign: 'center',
    animationEnabled: false,
    headerLeft: props => {
      return props.canGoBack ? (
        <IconButton
          onPress={props.onPress}
          icon={'arrow-left'}
          color={theme.colors.text}
        />
      ) : null;
    },
    headerTitleStyle: {
      fontWeight: 'normal',
      ...AppStyle.style.h5,
    },
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    cardStyleInterpolator: forFadeOpacityZero,
    gestureEnabled: true,
  };
};
