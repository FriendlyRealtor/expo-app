import * as React from 'react';
import {TouchableOpacity, FlatList, Text, View} from 'react-native';
import {default as Button} from '../../components/Elements/Button';
import {default as FormAddDelivery} from '../../components/Form/AddNewDelivery';
import {default as SelectCard} from '../../components/Elements/CheckBoxCardItem';
import {default as Layout} from '../../components/Layout/Home';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {AppStyle} from '../../assets/style';
//data test
import {data} from '../../datatest/address';
import {Modalize} from 'react-native-modalize';
export default () => {
  const animatedHeader = useSharedValue(0);
  const modalizeRef = React.useRef(null);
  const [delivery, setDelivery] = React.useState(data[0]);
  const [listAddress, setListAddress] = React.useState(data);
  const [selectAddress, setSelectAddress] = React.useState(-1);
  const [mode, setMode] = React.useState(0);
  const [listSelection, setListSelection] = React.useState([]);
  const findIndex = () => {
    let index = listAddress.indexOf(delivery);
    setSelectAddress(index);
  };

  const headerStyle = useAnimatedStyle(() => {
    'worklet';
    return {height: animatedHeader.value};
  });

  React.useEffect(() => {
    if (!mode) {
      let list = listAddress.map(value => false);
      setListSelection(list);
    }
    animatedHeader.value = withTiming(mode ? 20 : 0, {duration: 300});
  }, [mode, listAddress]);

  React.useEffect(() => {
    findIndex();
    setMode(0);
  }, [listAddress, delivery]);

  const renderItem = ({item, index}) => {
    return (
      <SelectCard
        title={item.name}
        mode={mode}
        visible={selectAddress == index}
        onChecked={state => {
          setListSelection(listSelection => {
            listSelection[index] = state ? true : false;
            return listSelection;
          });
        }}
        subTitles={[item.email, item.phone, item.address]}
        onLongPress={() => setMode(1)}
        onChange={status => setSelectAddress(status ? index : -1)}
      />
    );
  };

  const deleteDelivery = () => {
    let list = [];
    for (var i = 0; i < listAddress.length; i++)
      if (!listSelection[i]) {
        list.push(listAddress[i]);
      }
    setListAddress(list);
  };

  return (
    <Layout hiddenAreaView={true}>
      <View style={AppStyle.style.container}>
        <Animated.View
          style={[
            AppStyle.style.paddingHorizontalLarge,
            AppStyle.style.marginBottom,
            {flexDirection: 'row', alignSelf: 'flex-end'},
            headerStyle,
          ]}
        >
          <TouchableOpacity
            style={[AppStyle.style.marginRightLarge]}
            activeOpacity={0.8}
            onPress={deleteDelivery}
          >
            <Text style={[{color: AppStyle.color.red, fontSize: 13}]}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setMode(0)}>
            <Text style={[{color: AppStyle.color.red, fontSize: 13}]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listAddress}
          keyExtractor={(item, index) => `delivery-${index}`}
          renderItem={renderItem}
          extraData={listAddress.length}
        />

        <Button label={'New'} onPress={() => modalizeRef.current?.open()} />
        <Modalize adjustToContentHeight={true} ref={modalizeRef}>
          <FormAddDelivery
            onSubmit={result => {
              modalizeRef.current?.close();
              setListAddress(listAddress => {
                listAddress.push(result);
                return listAddress;
              });
            }}
          />
        </Modalize>
      </View>
    </Layout>
  );
};
