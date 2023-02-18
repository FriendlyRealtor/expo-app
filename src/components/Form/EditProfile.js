import * as React from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { default as Input } from '../Elements/Input';
import { default as Button } from '../Elements/Button';
import ChooseMonth from '../Elements/ChooseMonth';
import { getMonthLabel, getMonthLabels } from '../../helper/utils/DatetimeUtils';
//style
import { AppStyle } from '../../assets/style';
import { Style } from '../../assets/style/profile';
import { Avatar, useTheme } from 'react-native-paper';
//data test
const width = Dimensions.get('window').width;
const listMonth = getMonthLabels();
export default ({ profile = {} }) => {
    const theme = useTheme();
    const [username, setUsername] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [birthday, setBirthday] = React.useState(new Date());
    const [sex, setSex] = React.useState("");
    const [showDateModal, setShowDateModal] = React.useState(false);
    React.useEffect(() => {
        setBirthday(profile.birthday);
        setSex(profile.sex);
    }, [profile]);
    return <>
        <View style={Style.avatarContainer(theme)}>
            <Avatar.Image size={150} style={Style.avatar} source={profile.avatar} />
        </View>
        <Input
            value={username}
            changeValue={(text) => setUsername(text)}
            label="User Name*"
            containerStyle={[AppStyle.style.marginBottomLarge]}
            inputContainerStyle={{ borderColor: AppStyle.color.lightGray }}
        />
        <View style={[{ flexDirection: "row" }, AppStyle.style.marginBottomLarge]}>
            <Input
                value={firstName}
                changeValue={(text) => setFirstName(text)}
                label="First Name*"
                placeholder={profile.firstname}
                containerStyle={[{ flex: 1 }, AppStyle.style.smallMarginRight]}
                inputContainerStyle={{ borderColor: AppStyle.color.lightGray }}
            />
            <Input
                value={lastName}
                changeValue={(text) => setLastName(text)}
                label="Last Name*"
                placeholder={profile.lastname}
                containerStyle={[{ flex: 1 }, AppStyle.style.smallMarginLeft]}
                inputContainerStyle={{ borderColor: AppStyle.color.lightGray }}
            />
        </View>
        <Input
            value={email}
            changeValue={(text) => setEmail(email)}
            label="Email*"
            placeholder={profile.email}
            containerStyle={[AppStyle.style.marginBottomLarge]}
            inputContainerStyle={{ borderColor: AppStyle.color.lightGray }}
        />
        <Input
            value={phone}
            changeValue={(text) => setPhone(text)}
            label="Mobile Number*"
            placeholder={profile.phone}
            containerStyle={[AppStyle.style.marginBottomLarge]}
            inputContainerStyle={{ borderColor: AppStyle.color.lightGray }}
        />
        <View style={[{ flexDirection: "row" }, AppStyle.style.marginBottomLarge]}>
            <Input
                value={birthday.getDate().toString()}
                inputStyle={{ textAlign: "center" }}
                containerStyle={[{ flex: 1 }]}
                inputContainerStyle={{ borderColor: AppStyle.color.lightGray, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            />
            <TouchableOpacity
                activeOpacity={0.8}
                style={{ flex: 1, borderTopWidth: 1, borderBottomWidth: 1, borderColor: AppStyle.color.lightGray, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setShowDateModal(!showDateModal)}
            >
                <Text>{getMonthLabel(birthday.getMonth() + 1)}</Text>
            </TouchableOpacity>
            <Input
                value={birthday.getFullYear().toString()}
                inputStyle={{ textAlign: "center" }}
                containerStyle={[{ flex: 1 }]}
                inputContainerStyle={{ borderColor: AppStyle.color.lightGray, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            />
        </View>
        <ChooseMonth
            visible={showDateModal}
            onPress={(item) => {
                setShowDateModal(false)
            }}
            onDimiss={() => setShowDateModal(false)}
            listMonth={listMonth}
        />
        <View style={[{ flexDirection: "row" }, AppStyle.style.marginBottomLarge]}>
            <View style={[{ width: '100%', flexDirection: 'row', overflow: 'hidden', marginTop: width * 0.02 }]}>
                <TouchableOpacity style={[Style.sexButtonLeft, Style.selectedSexButton(sex, "Male")]} onPress={() => setSex("Male")}>
                    <Text >Man</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.sexButtonMiddle, Style.selectedSexButton(sex, "Female")]} onPress={() => setSex("Female")}>
                    <Text >Women</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[Style.sexButtonRight, Style.selectedSexButton(sex, "Other")]} onPress={() => setSex("Other")}>
                    <Text >Other</Text>
                </TouchableOpacity>
            </View>
        </View>

        <Button label={"Apply"} onPress={() => { }} />

    </>
}
