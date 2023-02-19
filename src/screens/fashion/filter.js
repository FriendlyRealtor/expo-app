import React from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet} from 'react-native';
import {default as Layout} from '../../components/Layout/Home';
import {default as Dropdown} from '../../components/Elements/Dropdown';
import {default as Button} from '../../components/Elements/Button';
import {default as CheckBox} from '../../components/Elements/CheckBox';
import {default as CheckBoxColor} from '../../components/Elements/CheckBoxColor';
import {default as Vote} from '../../components/Elements/Vote';
import {AppStyle} from '../../assets/style';
//data test
import {size as dataSize} from '../../datatest/size';
import {color as dataColor} from '../../datatest/color';
const Style = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    height: '100%',
    borderRadius: 5,
    backgroundColor: AppStyle.color.white,
    borderColor: AppStyle.color.lightGray,
    ...AppStyle.style.smallMarginRight,
    ...AppStyle.style.paddingHorizontal,
    ...AppStyle.style.h5,
  },
});
export default ({navigation, route}) => {
  const [fromPrice, setFromPrice] = React.useState('');
  const [toPrice, setToPrice] = React.useState('');
  const [sizes, setSizes] = React.useState(dataSize);
  const [colors, setColors] = React.useState(dataColor);
  const [size, setSize] = React.useState('');
  const [color, setColor] = React.useState('');
  return (
    <Layout containerStyle={[AppStyle.style.marginTopLarge]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Dropdown
          containerStyle={[AppStyle.style.marginBottomLarge]}
          title="Categorys"
          items={[
            {title: 'category 1'},
            {title: 'category 2'},
            {title: 'category 3'},
            {title: 'category 4'},
          ]}
          createdMode={1}
        />
        <Dropdown
          containerStyle={[AppStyle.style.marginBottomLarge]}
          title="Brands"
          items={[
            {title: 'brand 1'},
            {title: 'brand 2'},
            {title: 'brand 3'},
            {title: 'brand 4'},
          ]}
          createdMode={1}
        />
        <Dropdown
          containerStyle={[AppStyle.style.marginBottomLarge]}
          title="Ratings"
          footer={() => (
            <Vote
              number={5}
              containerStyle={{marginHorizontal: 5}}
              rootContainerStyle={AppStyle.style.marginTop}
            />
          )}
        />
        <Dropdown
          containerStyle={[AppStyle.style.marginBottomLarge]}
          title="Sizes"
          footer={() => (
            <ScrollView
              style={AppStyle.style.marginTop}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {sizes &&
                sizes.map((item, index) => {
                  return (
                    <View key={`sizes-${item}-${index}`}>
                      <CheckBox
                        label={item}
                        visible={size == item}
                        onPress={() => {
                          setSize(item);
                        }}
                        containerStyle={AppStyle.style.marginRightLarge}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          )}
        />
        <Dropdown
          containerStyle={[AppStyle.style.marginBottomLarge]}
          title="Price"
          footer={() => {
            return (
              <View
                style={[{flexDirection: 'row'}, AppStyle.style.marginTopLarge]}
              >
                <View style={{flexDirection: 'row', flex: 1}}>
                  <TextInput
                    value={fromPrice}
                    onChangeText={text => setFromPrice(text)}
                    style={Style.input}
                    placeholder={'$0'}
                    placeholderTextColor={AppStyle.color.lightGray}
                  />
                  <TextInput
                    value={toPrice}
                    onChangeText={text => setToPrice(text)}
                    style={Style.input}
                    placeholder={'$0'}
                    placeholderTextColor={AppStyle.color.lightGray}
                  />
                  <View style={{flex: 1}}>
                    <Button label="Go" />
                  </View>
                </View>
              </View>
            );
          }}
        />
        <Dropdown
          title="Colors"
          footer={() => (
            <ScrollView
              style={AppStyle.style.marginTop}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {colors &&
                colors.map((item, index) => {
                  return (
                    <View key={`colors-${item}-${index}`}>
                      <CheckBoxColor
                        color={item}
                        visible={color == item}
                        onPress={() => {
                          setColor(item);
                        }}
                        containerStyle={AppStyle.style.marginRightLarge}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          )}
        />
      </ScrollView>
    </Layout>
  );
};
