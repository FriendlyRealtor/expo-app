import * as React from 'react';
import { ScrollView} from 'react-native';
import { default as Layout } from '../../components/Layout/Home';
import { default as EditProfile } from '../../components/Form/EditProfile';
//style
import { AppStyle } from '../../assets/style';
//data test
import { data } from '../../datatest/profile';
export default ({ navigation, route }) => {
    const [profile, setProfile] = React.useState(data);
    return <Layout containerStyle={[AppStyle.style.marginHorizontalLarge, AppStyle.style.marginVerticalLarge]}>
        <ScrollView
            style={[{ flex: 1 }]}
            showsVerticalScrollIndicator={false}>
            <EditProfile profile={profile} />
        </ScrollView>
    </Layout>
}
