import React from 'react';
import { FlatList, View } from 'react-native';
import { default as Layout } from '../../components/Layout/Home';
import { default as WishEmpty } from './component/WishEmpty';
import { default as WishItem } from './component/WishItem';
import { default as Header } from './component/Header'; 
//data test
import { data as wishData } from '../../datatest/wish';
import { AppStyle } from '../../assets/style';
import { RouteName } from '../../helper/RouteName';
export default({navigation, route}) => {
    const [data, setData] = React.useState(wishData);
    const deleteItem = (index) => setData(data => {
        var list = [...data];
        list.splice(index, 1);
        return list;
    });
    return <Layout header={() => <Header />}>
        <View style={[AppStyle.style.paddingHorizontalLarge, AppStyle.style.paddingVertical]}>
            <FlatList 
                data={data}
                renderItem={({item, index}) => <WishItem 
                    item={item} 
                    onDeleteItem={() => deleteItem(index)} 
                    onAddToBag={() => navigation.navigate(RouteName.Cart)}
                />}
                keyExtractor={(item, index) => `wish-item-${item.id}`}
                ListEmptyComponent={() => <WishEmpty onBackPress={() => navigation.goBack()} />}
            />
        </View>
    </Layout>
}