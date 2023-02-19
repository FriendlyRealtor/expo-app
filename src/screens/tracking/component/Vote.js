import * as React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {AppStyle} from '../../../assets/style';
import {default as VoteStar} from '../../../components/Elements/Vote';
export default ({onChangeStar = number => {}, vote = 0}) => {
  return (
    <View
      style={[
        AppStyle.style.groupContainer,
        AppStyle.style.paddingLarge,
        AppStyle.style.marginBottomLarge,
      ]}
    >
      <Text
        style={[
          AppStyle.style.p,
          AppStyle.style.marginBottomLarge,
          {fontWeight: 'normal', flex: 1},
        ]}
      >
        DON’T FORGOT TO RATE
      </Text>
      <Text
        style={[
          AppStyle.style.marginBottomLarge,
          {color: 'gray', fontSize: 13},
        ]}
      >
        Oh Lehman.! Fashion to help your Fellow Stylorium.
      </Text>
      <View style={{flexDirection: 'row'}}>
        <VoteStar
          vote={vote}
          number={5}
          containerStyle={[AppStyle.style.marginRight]}
          onChangeStar={onChangeStar}
          horizontal={true}
        />
      </View>
    </View>
  );
};
