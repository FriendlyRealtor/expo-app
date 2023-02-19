import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {icons} from '../../assets/icons';
import {AppStyle} from '../../assets/style';
const Style = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    borderRadius: 40,
    position: 'absolute',
    bottom: 45,
    right: 15,
    elevation: 15,
    shadowColor: AppStyle.color.orange,
    shadowOpacity: 0.5,
  },
});
export default ({
  backgroundColor = AppStyle.color.orange,
  icon = icons.filter,
  onPress = () => {},
}) => {
  return (
    <View style={[Style.container, {backgroundColor: backgroundColor}]}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[{width: '100%', height: '100%'}, AppStyle.style.contentMiddle]}
        onPress={onPress}
      >
        <Image
          source={icon}
          style={{width: 25, height: 25, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  );
};
