import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Style} from './Style/vote';
import {icons} from '../../assets/icons';
export default ({
  number = 5,
  vote = 0,
  starStyle,
  containerStyle,
  buttonStyle,
  onChangeStar = number => {},
  horizontal = true,
  rootContainerStyle,
}) => {
  const [star, setStar] = React.useState(Array.from(Array(number).keys()));
  const [status, setStatus] = React.useState(vote);
  React.useEffect(() => {
    onChangeStar(status);
  }, [status]);
  React.useEffect(() => {
    setStatus(vote);
  }, []);
  const renderItem = (item, index) => {
    return (
      <View style={[containerStyle]} key={`star-${index}`}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={buttonStyle}
          onPress={() => setStatus(index + 1)}
        >
          <Image
            source={index < status ? icons.starYellow : icons.star}
            style={[Style.star, starStyle]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        flexDirection: horizontal ? 'row' : 'column',
        ...rootContainerStyle,
      }}
    >
      {star.map(renderItem)}
    </View>
  );
};
