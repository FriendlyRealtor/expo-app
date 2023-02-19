import * as React from 'react';
import {View, Dimensions} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AppStyle} from '../../../assets/style';
import {Style} from '../../../assets/style/product_detail';
const width = Dimensions.get('window').width;
export default ({item}) => {
  const theme = useTheme();
  const moreDetailValue = [
    Style.moreDetailValue,
    {color: theme.colors.placeholder},
  ];
  return (
    <View style={{paddingVertical: width * 0.05}}>
      <Text style={[AppStyle.style.h5, {fontWeight: 'normal'}]}>
        PRODUCT DETAILS
      </Text>
      {item.dimiessions != undefined ? (
        <View style={Style.moreDetailContainer}>
          <Text style={[Style.moreDetailTitle]}>Product Dimiessions:</Text>
          <Text style={moreDetailValue}>{item.dimiessions}</Text>
        </View>
      ) : null}
      {item.manufacture != undefined ? (
        <View style={Style.moreDetailContainer}>
          <Text style={Style.moreDetailTitle}>Manufacture:</Text>
          <Text style={moreDetailValue}>{item.manufacture}</Text>
        </View>
      ) : null}
      {item.countryOrigin != undefined ? (
        <View style={Style.moreDetailContainer}>
          <Text style={Style.moreDetailTitle}>Country of Origin:</Text>
          <Text style={moreDetailValue}>{item.countryOrigin}</Text>
        </View>
      ) : null}
      {item.weight != undefined ? (
        <View style={Style.moreDetailContainer}>
          <Text style={Style.moreDetailTitle}>Item Weight:</Text>
          <Text style={moreDetailValue}>{item.weight}</Text>
        </View>
      ) : null}
      {item.fabric != undefined ? (
        <View style={Style.moreDetailContainer}>
          <Text style={Style.moreDetailTitle}>Fabric:</Text>
          <Text style={moreDetailValue}>{item.fabric}</Text>
        </View>
      ) : null}
      {item.style != undefined ? (
        <View style={Style.moreDetailContainer}>
          <Text style={Style.moreDetailTitle}>Style:</Text>
          <Text style={moreDetailValue}>{item.style}</Text>
        </View>
      ) : null}
      {item.neckStyle != undefined ? (
        <View style={Style.moreDetailContainer}>
          <Text style={Style.moreDetailTitle}>Neck Style:</Text>
          <Text style={moreDetailValue}>{item.neckStyle}</Text>
        </View>
      ) : null}
      {item.pattern != undefined ? (
        <View style={Style.moreDetailContainer}>
          <Text style={Style.moreDetailTitle}>Pattern:</Text>
          <Text style={moreDetailValue}>{item.pattern}</Text>
        </View>
      ) : null}
    </View>
  );
};
