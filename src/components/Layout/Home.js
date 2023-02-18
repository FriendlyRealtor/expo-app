import * as React from 'react';
import { View, StatusBar, SafeAreaView} from 'react-native';
import { useTheme } from 'react-native-paper';
//style
import { AppStyle } from '../../assets/style';
export default ({containerStyle, header = () => null, hiddenAreaView=false, children=()=><></>, footer=() => <></> }) => {
    const theme = useTheme();
    return <View style={[AppStyle.style.container, AppStyle.style.nonePadding]}>
        <StatusBar
            translucent={false}
            backgroundColor={theme.colors.primary}
            barStyle={'dark-content'} />
        {
            header? header() : <></>
        }
        {
            hiddenAreaView? <View style={[{ flex: 1 }, containerStyle]}>
            {
                children? children : <></>
            }
            </View> : <SafeAreaView style={[{ flex: 1 }, containerStyle]}>
            {
                children? children : <></>
            }
        </SafeAreaView>
        }
        {
            footer? footer() : <></>
        }
        
    </View>
}