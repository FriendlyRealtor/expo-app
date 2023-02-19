import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {Text, useTheme, Searchbar} from 'react-native-paper';
import {AppStyle} from '../../assets/style';
import {icons} from '../../assets/icons';
import {Style} from '../../assets/style/home';
//
import {data} from '../../datatest/topic';
import {useNavigation} from '@react-navigation/core';
import {RouteName} from '../../helper/RouteName';
const width = Dimensions.get('window').width;
export default ({
  submit = false,
  containerStyle,
  topicPress = title => {},
  onSubmit = search => {},
  chooseTopic,
  hiddenBottom = false,
}) => {
  const [search, setSearch] = React.useState('');
  const [topics, setTopics] = React.useState(data);
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View
      style={[
        AppStyle.style.paddingHorizontalLarge,
        AppStyle.style.marginBottom,
        containerStyle,
      ]}
    >
      <View
        style={[{flexDirection: 'row'}, AppStyle.style.marginVerticalLarge]}
      >
        <Searchbar
          placeholder="Search..."
          onChangeText={setSearch}
          value={search}
          style={[
            AppStyle.style.groupContainer,
            Style.searchContainer,
            Style.searchInput,
          ]}
          onIconPress={
            submit
              ? () => onSubmit(search)
              : () => navigation.navigate(RouteName.Search)
          }
        />
        <View
          style={[
            AppStyle.style.groupContainer,
            AppStyle.style.nonePadding,
            AppStyle.style.contentMiddle,
            {height: 48, width: 48},
          ]}
        >
          <TouchableOpacity style={[AppStyle.style.headerButton]}>
            <Image source={icons.mic} style={AppStyle.style.iconHeaderButton} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
