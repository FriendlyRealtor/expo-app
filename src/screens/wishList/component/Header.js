import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AppStyle} from '../../../assets/style';
const width = Dimensions.get('window').width;
export default ({}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: AppStyle.color.backgroundColor,
      }}
    >
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[
            {flexDirection: 'row', justifyContent: 'center'},
            AppStyle.style.paddingVertical,
          ]}
        >
          <Text
            style={[AppStyle.style.h5, {fontWeight: 'normal', color: 'black'}]}
          >
            Wishlist
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};
