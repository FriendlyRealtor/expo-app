import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {AppStyle} from '../../assets/style';
import {Style} from './Style/product';
import {icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/core';
import {RouteName} from '../../helper/RouteName';

export default ({
  item,
  onPress,
  onAfterPress,
  imageChild = () => null,
  index = 0,
  containerStyle,
}) => {
  const navigation = useNavigation();
  const onCardPress = () => {
    if (onPress) onPress();
    else navigation.navigate(RouteName.ProductDetail, {item: item});

    if (onAfterPress) {
      onAfterPress();
    }
  };
  return (
    <View
      style={[Style.container, AppStyle.style.marginTopLarge, containerStyle]}
    >
      <TouchableOpacity
        style={{
          width: '95%',
          alignSelf: index % 2 == 0 ? 'flex-start' : 'flex-end',
        }}
        activeOpacity={0.8}
        onPress={onCardPress}
      >
        <View
          style={{
            borderRadius: 10,
            shadowColor: '#C4C4C4',
            shadowOffset: {width: 3, height: 3},
            shadowOpacity: 0.6,
            elevation: 3,
          }}
        >
          {imageChild()}
          <Image source={item.images[0].image} style={[Style.image]} />
        </View>
        <Text style={[Style.title]}>{item.name}</Text>
        <View style={Style.bottomBar}>
          <Text style={[AppStyle.style.h5, {flex: 1}]}>$ {item.price}</Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={icons.starYellow}
              style={{width: 15, height: 15, resizeMode: 'contain'}}
            />
            <Text style={{fontSize: 12}}>{item.star}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={[Style.bottomBar, {flexDirection: 'column', paddingTop: 30}]}
      >
        <View style={[Style.borderBottomProduct, {alignSelf: 'center'}]}></View>
      </View>
    </View>
  );
};
