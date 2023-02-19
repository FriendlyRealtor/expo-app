import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {default as Layout} from '../../components/Layout/Home';
import {default as Search} from '../../components/Elements/Search';
import {default as Product} from '../../components/Elements/Product';
import {AppStyle} from '../../assets/style';
import {data} from '../../datatest/listProduct';
import {FlatList} from 'react-native-gesture-handler';
const recents = [
  'T-shirt',
  'Women’s Sportwears Shoes',
  'Travel Luggages',
  'Men’s Stylish Handbag',
  'Jeans & Jaggings',
];
export default ({navigation, route}) => {
  const [inputSearch, setInputSearch] = React.useState('');
  const [oldSearch, setOldSearch] = React.useState(recents);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {}, [inputSearch]);
  React.useEffect(() => {
    setProducts(data);
    return () => setProducts([]);
  }, []);
  const recentSearchs = () => {
    return oldSearch.length > 0 ? (
      <>
        <Text
          style={[
            AppStyle.style.p,
            AppStyle.style.marginBottomLarge,
            {color: AppStyle.color.black},
          ]}
        >
          RECENT SEARCHS
        </Text>
        {oldSearch.map(value => (
          <TouchableOpacity
            key={`recent-search-${value}`}
            activeOpacity={0.8}
            style={[AppStyle.style.marginLeftLarge]}
          >
            <Text
              style={[
                AppStyle.style.p,
                AppStyle.style.marginBottom,
                {color: AppStyle.color.gray},
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </>
    ) : (
      <></>
    );
  };
  const renderItem = React.useCallback(
    ({item, index}) => {
      return <Product item={item} index={index} />;
    },
    [products],
  );
  return (
    <Layout>
      <Search
        containerStyle={{marginBottom: 0}}
        submit={true}
        hiddenBottom={true}
        onSubmit={value => setInputSearch(value)}
      />
      <FlatList
        ListHeaderComponent={recentSearchs}
        data={products}
        numColumns={2}
        keyExtractor={(item, index) => `search-product-${item.id}-${index}`}
        renderItem={renderItem}
        extraData={products}
        contentContainerStyle={AppStyle.style.paddingHorizontalLarge}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};
