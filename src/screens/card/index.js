import * as React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AppStyle } from '../../assets/style';
import { default as Button } from '../../components/Elements/Button';
import { default as FormAddDCard } from '../../components/Form/AddNewCard';
import { default as SelectCard } from '../../components/Elements/CheckBoxCardItem';
import { default as Layout } from '../../components/Layout/Home';
//utils
import { cardNo as convertCardNo } from '../../helper/utils/FormatUtils';
//data test
import { data } from '../../datatest/payment';
import { Modalize } from 'react-native-modalize';
export default () => {
    const animatedHeader = useSharedValue(0);
    const modalizeRef = React.useRef(null);
    const [cards, setCards] = React.useState(data);
    const [card, setCard] = React.useState(data[0]);
    const [selectCard, setSelectCard] = React.useState(-1);
    const [mode, setMode] = React.useState(0);
    const [listSelection, setListSelection] = React.useState([]);

    const headerStyle = useAnimatedStyle(() => {
        'worklet';
        return { height: animatedHeader.value };
    });

    React.useEffect(() => {
        if (!mode) {
            let list = cards.map(value => false);
            setListSelection(list);
        }
        animatedHeader.value = withTiming(mode ? 20 : 0, { duration: 300 });
    }, [mode, cards]);


    React.useEffect(() => {
        setSelectCard(selectCard => {
            return cards.indexOf(card);
        });
        setMode(0);
    }, [card, cards]);

    const deleteCard = () => {
        let list = [];
        for (var i = 0; i < cards.length; i++)
            if (!listSelection[i]) {
                list.push(cards[i]);
            }
        setCards(list);
    }

    const renderItem = ({ item, index }) => <SelectCard
        item={item}
        index={index}
        mode={mode}
        onLongPress={() => setMode(1)}
        visible={selectCard == index}
        subTitles={[item.email, item.phone, item.address]}
        onChange={(state) => setCard(state ? item : null)}
        onChecked={(state) => {
            setListSelection(listSelection => {
                listSelection[index] = state ? true : false;
                return listSelection;
            })
        }}
        checkBoxVisible={listSelection[index]}
        title={item.holder}>
        <View style={[]}>
            <View style={[{ flexDirection: "row" }, AppStyle.style.marginBottom]}>
                <Text style={{ flex: 1 }}>Card No</Text>
                <Text>:</Text>
                <Text style={[{ flex: 2, textAlign: "right" }, { opacity: 0.5 }]}>{convertCardNo(item.cardNo)}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 }}>Exp.Date</Text>
                <Text>:</Text>
                <Text style={[{ flex: 2, textAlign: "right" }, { opacity: 0.5 }]}>{item.expire}</Text>
            </View>
        </View>
    </SelectCard>


    return <Layout hiddenAreaView={true}>
        <View style={[AppStyle.style.container]}>
            <Animated.View style={[AppStyle.style.paddingHorizontalLarge, AppStyle.style.marginBottom, { flexDirection: "row", alignSelf: "flex-end" }, headerStyle]}>
                <TouchableOpacity style={[AppStyle.style.marginRightLarge]} activeOpacity={0.8} onPress={deleteCard} >
                    <Text style={[{ color: AppStyle.color.red, fontSize: 13 }]}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setMode(0)}>
                    <Text style={[{ color: AppStyle.color.red, fontSize: 13 }]}>Cancel</Text>
                </TouchableOpacity>
            </Animated.View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={cards}
                keyExtractor={(item, index) => `cards-${index}`}
                renderItem={renderItem}
                extraData={cards}
            />
            <Button label={"New"} onPress={() => {
                modalizeRef.current?.open();
            }} />
            <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                <FormAddDCard onSubmit={(data) => {
                        setCards(cards => {
                            var list = [...cards];
                            list.push(data);
                            return list;
                        });
                        modalizeRef.current?.close();
                    }} />
            </Modalize>
        </View>
    </Layout>;
}
