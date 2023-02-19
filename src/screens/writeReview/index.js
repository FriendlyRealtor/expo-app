import * as React from 'react';
import {View, Image, Dimensions, SafeAreaView} from 'react-native';
import {default as VoteStar} from '../../components/Elements/Vote';
import {default as Layout} from '../../components/Layout/Home';
import {default as AddReview} from '../../components/Form/AddReview';
import {icons} from '../../assets/icons';
//style
import {AppStyle} from '../../assets/style';
//data
const width = Dimensions.get('window').width;
export default ({navigation, route}) => {
  return (
    <Layout hiddenAreaView={true}>
      <View
        style={[
          {flex: 1, paddingVertical: width * 0.25},
          AppStyle.style.middle,
        ]}
      >
        <Image
          source={icons.labelVote}
          style={[
            {width: width * 0.5, height: width * 0.5, resizeMode: 'contain'},
            AppStyle.style.marginBottomLarge,
          ]}
        />
        <VoteStar
          vote={0}
          number={5}
          horizontal={true}
          containerStyle={[
            AppStyle.style.middle,
            AppStyle.style.marginHorizontal,
          ]}
        />
      </View>
      <SafeAreaView style={{backgroundColor: AppStyle.color.white}}>
        <View
          style={[
            AppStyle.style.marginHorizontalLarge,
            AppStyle.style.marginVerticalLarge,
          ]}
        >
          <AddReview onSubmit={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    </Layout>
  );
};
