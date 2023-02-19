import * as React from 'react';
import {View, StatusBar, Dimensions, SafeAreaView} from 'react-native';
import {default as Layout} from '../../components/Layout/Home';
import {default as Delivery} from './component/Delivery';
import {default as Vote} from './component/Vote';
import {default as TrackOrder} from './component/Track';
import {AppStyle} from '../../assets/style';

//data test
import {dataTest as deliveryTest} from '../../datatest/address';
import {dataTest as trackOrderTest} from '../../datatest/trackOrder';
const width = Dimensions.get('window').width;

export default ({navigation, route}) => {
  const [delivery, setDelivery] = React.useState(deliveryTest[0]);
  const [voteStar, setVoteStar] = React.useState(trackOrderTest);
  const [trackOrder, setTrackOrder] = React.useState(trackOrderTest);

  return (
    <Layout>
      <TrackOrder
        trackOrder={trackOrder}
        ListFooterComponent={() => (
          <View style={[AppStyle.style.marginHorizontalLarge]}>
            <Delivery delivery={delivery} />
            <Vote
              vote={voteStar}
              onChangeStar={number => setVoteStar(number)}
            />
          </View>
        )}
      />
    </Layout>
  );
};
