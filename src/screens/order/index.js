import * as React from 'react';
import {View, FlatList, Dimensions, StatusBar} from 'react-native';
import {default as EmptyOrder} from './component/EmptyOrder';
import {default as OrderItem} from './component/OrderItem';
import {default as Layout} from '../../components/Layout/Home';
//style
import {AppStyle} from '../../assets/style';
//data
import {data as dataTest} from '../../datatest/order';
const width = Dimensions.get('window').width;
export default ({navigation, route}) => {
  const [data, setData] = React.useState(dataTest);
  return (
    <Layout containerStyle={AppStyle.style.marginHorizontalLarge}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `order-${index}`}
        renderItem={({item, index}) => <OrderItem item={item} index={index} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyOrder onBackPress={() => navigation.goBack()} />
        )}
      />
    </Layout>
  );
};
