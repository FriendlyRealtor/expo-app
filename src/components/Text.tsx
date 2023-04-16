import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from '@ui-kitten/components';

export default React.forwardRef(({ style, children, ...rest }: TextProps, ref) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: 'Ubuntu',
      style,
    },
  });

  return (
    <Text {...rest} ref={ref as any} style={styles.text}>
      {children}
    </Text>
  );
});
