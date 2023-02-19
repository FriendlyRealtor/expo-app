import React from 'react';
import {Text, Button} from 'react-native';

import {Style} from './Style/button';
export default ({
  label,
  labelStyle,
  containerStyle,
  onPress = () => {},
  style,
}) => {
  return (
    <Button
      title={label != undefined ? label : ''}
      labelStyle={[
        {fontWeight: 'normal', fontSize: 16, letterSpacing: 0.1},
        labelStyle,
      ]}
      onPress={onPress}
      style={[{borderRadius: 30}, style]}
    />
  );
};
