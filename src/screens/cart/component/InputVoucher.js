import * as React from 'react';
import {View, Dimensions, TextInput, StyleSheet} from 'react-native';
import {AppStyle} from '../../../assets/style';
import {default as Button} from '../../../components/Elements/Button';
const width = Dimensions.get('window').width;
export default ({value, onChangeVoucher, onApplyVoucher}) => {
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: width * 0.05}}>
      <TextInput
        value={value}
        onChangeText={onChangeVoucher}
        style={styles.input}
      />
      <Button
        label={'Apply'}
        containerStyle={{width: width * 0.25}}
        labelStyle={[AppStyle.style.h5]}
        onPress={onApplyVoucher}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginRight: width * 0.03,
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: width * 0.045,
    paddingHorizontal: width * 0.05,
    elevation: 2,
    shadowColor: '#c4c4c4',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    borderRadius: 30,
  },
});
