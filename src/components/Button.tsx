import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import { Colors } from '../config';

export type ButtonProps = {
  children?: React.ReactNode;
  onPress?: any;
  activeOpacity?: number;
  borderless?: boolean;
  title?: string;
  style?: React.CSSProperties;
};

export const Button = ({
  children,
  onPress,
  activeOpacity = 0.3,
  borderless = false,
  title,
  style,
}: ButtonProps) => {
  const _style = useCallback(({ pressed }) => [
    style,
    { opacity: pressed ? activeOpacity : 1, fontFamily: 'Ubuntu' },
  ]);

  if (borderless) {
    return (
      <Pressable onPress={onPress} style={_style}>
        <Text style={styles.borderlessButtonText}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={_style}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  borderlessButtonText: {
    fontSize: 16,
    color: Colors.blue,
  },
});
