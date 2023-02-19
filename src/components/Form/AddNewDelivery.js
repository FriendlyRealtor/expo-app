import React from 'react';
import {Text, ScrollView} from 'react-native';
import {default as Button} from '../Elements/Button';
import {default as Input} from '../Elements/Input';
import {AppStyle} from '../../assets/style';
import {sendDeliveryAddress} from '../../helper/utils/FormSubmitUtils';
export default ({onSubmit = () => {}}) => {
  const [location, setLocation] = React.useState('');
  const [username, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [houseNo, setHouseNo] = React.useState('');
  const [error, setError] = React.useState(null);
  const submit = async () => {
    let sendSubmit = sendDeliveryAddress(
      email,
      username,
      phone,
      location,
      houseNo,
    );
    sendSubmit((isSubmit, error) => {
      if (isSubmit) {
        onSubmit({
          email: email,
          name: username,
          phone: phone,
          address: `${location}, ${houseNo}`,
        });
      }
      setError(error);
    });
  };

  return (
    <ScrollView
      style={[AppStyle.style.groupContainer, AppStyle.style.paddingLarge]}
    >
      <Text style={[AppStyle.style.p, AppStyle.style.marginBottomLarge]}>
        ADD NEW ADDRESS
      </Text>
      <Input
        label="Your location*"
        labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]}
        inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]}
        inputContainerStyle={AppStyle.style.inputContainer}
        containerStyle={[AppStyle.style.marginBottom]}
        value={location}
        changeValue={text => setLocation(text)}
        error={error && error.location ? error.location : ''}
      />
      <Input
        label="User Name*"
        labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]}
        inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]}
        inputContainerStyle={AppStyle.style.inputContainer}
        containerStyle={[AppStyle.style.marginBottom]}
        value={username}
        changeValue={text => setUserName(text)}
        error={error && error.username ? error.username : ''}
      />
      <Input
        label="Email Address*"
        labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]}
        inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]}
        inputContainerStyle={AppStyle.style.inputContainer}
        containerStyle={[AppStyle.style.marginBottom]}
        value={email}
        changeValue={text => setEmail(text)}
        keyboardType={'email-address'}
        error={error && error.email ? error.email : ''}
      />
      <Input
        label="Mobile Phone*"
        labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]}
        inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]}
        inputContainerStyle={AppStyle.style.inputContainer}
        containerStyle={[AppStyle.style.marginBottom]}
        value={phone}
        changeValue={text => setPhone(text)}
        keyboardType={'phone-pad'}
        error={error && error.phone ? error.phone : ''}
      />
      <Input
        label="House No / Flat No / Floor*"
        labelStyle={[AppStyle.style.p, AppStyle.style.noneMargin]}
        inputStyle={[AppStyle.style.nonePadding, AppStyle.style.input]}
        inputContainerStyle={AppStyle.style.inputContainer}
        containerStyle={[AppStyle.style.marginBottomLarge]}
        value={houseNo}
        changeValue={text => setHouseNo(text)}
        error={error && error.houseNo ? error.houseNo : ''}
      />
      <Button label={'Save Address'} onPress={submit} />
    </ScrollView>
  );
};
