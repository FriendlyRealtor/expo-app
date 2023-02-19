import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppStyle} from '../../../assets/style';
import {Style} from '../../../assets/style/home';
import {RouteName} from '../../../helper/RouteName';
const width = Dimensions.get('window').width;
export default ({data, containerStyle}) => {
  const navigation = useNavigation();
  const handleView = (item1, item2, key) => {
    let arr = [];
    if (item1 != undefined) arr.push(item1);
    if (item2 != undefined) arr.push(item2);
    return (
      <View>
        {arr.map((value, index) => (
          <View key={`trends-${key}-${index}`}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={Style.trendContainer}
              onPress={() =>
                navigation.navigate(RouteName.ProductDetail, {item: value})
              }
            >
              <View
                style={[
                  Style.imageTrendsContainer,
                  {
                    backgroundColor:
                      value.image != undefined
                        ? 'rgba(0,0,0,0)'
                        : 'rgba(0,0,0,0.8)',
                  },
                ]}
              >
                <Image
                  source={
                    value.images != undefined ? value.images[0].image : null
                  }
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={[{paddingBottom: 5, fontSize: 13}]}>
                  {value.name}
                </Text>
                <Text style={[AppStyle.style.h5, {fontWeight: 'normal'}]}>
                  ${value.price}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };
  const handleSplitProduct = () => {
    let arr = [];
    for (var i = 0; i < data.length; i += 2) {
      arr.push(
        <View
          style={{marginRight: width * 0.03, width: width * 0.6}}
          key={`container-grow-trends-${i}`}
        >
          {handleView(data[i], data[i + 1], i)}
        </View>,
      );
    }
    return arr;
  };
  return (
    <View style={{flex: 1, ...containerStyle}}>
      <Text style={[AppStyle.style.h4, {fontWeight: 'normal'}]}>
        Top Trends
      </Text>
      <ScrollView
        horizontal={true}
        style={{width: '100%', paddingVertical: width * 0.05}}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{width: '100%', flexDirection: 'row'}}>
          {handleSplitProduct()}
        </View>
      </ScrollView>
    </View>
  );
};
