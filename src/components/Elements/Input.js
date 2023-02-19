import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Style} from './Style/input';
export default React.forwardRef(
  (
    {
      onPress,
      multiline = false,
      editable = true,
      value,
      error,
      errorStyle,
      label,
      changeValue = text => {},
      labelStyle,
      inputContainerStyle,
      containerStyle,
      inputStyle,
      secureTextEntry,
      max,
      keyboardType,
      placeholder = '',
    },
    ref,
  ) => {
    return (
      <View style={[Style.container, containerStyle]}>
        {label ? <Text style={[Style.label, labelStyle]}>{label}</Text> : null}
        <View style={[Style.inputContainer, inputContainerStyle]}>
          <TextInput
            multiline={multiline}
            editable={editable}
            placeholder={placeholder}
            keyboardType={keyboardType != undefined ? keyboardType : 'default'}
            secureTextEntry={
              secureTextEntry != undefined ? secureTextEntry : false
            }
            value={value}
            onChangeText={changeValue}
            style={[Style.input, inputStyle]}
            maxLength={max != undefined ? max : 255}
          />
        </View>
        {error ? <Text style={[Style.error, errorStyle]}>{error}</Text> : null}
      </View>
    );
  },
);
