import * as React from 'react';
import {View} from 'react-native';
import {default as Input} from '../../components/Elements/Input';
import {default as Button} from '../../components/Elements/Button';
import {default as Layout} from '../../components/Layout/Home';
//style
import {AppStyle} from '../../assets/style';
import {Style} from '../../assets/style/profile';
//data test
import {data} from '../../datatest/profile';
import {Avatar, useTheme} from 'react-native-paper';
export default ({navigation, route}) => {
  const theme = useTheme();
  const [profile, setProfile] = React.useState(data);
  const [password, setPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  return (
    <Layout
      containerStyle={[
        AppStyle.style.marginHorizontalLarge,
        AppStyle.style.paddingVerticalLarge,
      ]}
    >
      <View
        style={[{flex: 1}, AppStyle.style.paddingTopLarge]}
        showsVerticalScrollIndicator={false}
      >
        <View style={Style.avatarContainer(theme)}>
          <Avatar.Image
            size={150}
            style={Style.avatar}
            source={profile.avatar}
          />
        </View>
        <Input
          value={password}
          changeValue={text => setPassword(text)}
          label="Old password*"
          secureTextEntry={true}
          containerStyle={[AppStyle.style.marginBottomLarge]}
          inputContainerStyle={{borderColor: AppStyle.color.lightGray}}
        />
        <Input
          value={oldPassword}
          changeValue={text => setOldPassword(text)}
          label="New password*"
          secureTextEntry={true}
          containerStyle={[AppStyle.style.marginBottomLarge]}
          inputContainerStyle={{borderColor: AppStyle.color.lightGray}}
        />
        <Input
          value={confirmPassword}
          changeValue={text => setConfirmPassword(text)}
          label="Confirm password*"
          secureTextEntry={true}
          containerStyle={[AppStyle.style.marginBottomLarge]}
          inputContainerStyle={{borderColor: AppStyle.color.lightGray}}
        />
      </View>
      <Button label={'Apply'} onPress={() => {}} />
    </Layout>
  );
};
