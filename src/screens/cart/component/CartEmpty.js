import * as React from 'react';
import {View, Dimensions, Image} from 'react-native';
import {default as Button} from '../../../components/Elements/Button';
import {Text} from 'react-native-paper';
import {AppStyle} from '../../../assets/style';
import {icons} from '../../../assets/icons';
const width = Dimensions.get('window').width;
export default ({onBackPress}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.05,
      }}
    >
      <Image source={icons.cartEmpty} style={AppStyle.style.imageEmpty} />
      <Text
        style={[
          AppStyle.style.h5,
          {
            fontWeight: 'normal',
            alignSelf: 'center',
            marginBottom: width * 0.05,
          },
        ]}
      >
        {'There’s Nothing Here'.toUpperCase()}
      </Text>
      <Text
        style={[
          {
            textAlign: 'center',
            marginBottom: width * 0.05,
            color: 'rgba(0,0,0,0.8)',
          },
          AppStyle.style.p,
        ]}
      >
        {
          'Discover what’s appealing to you from thousands products and by it easlies.'
        }
      </Text>
      <Button
        onPress={onBackPress}
        label={'Explore Menu'}
        style={{width: '100%'}}
      />
    </View>
  );
};
