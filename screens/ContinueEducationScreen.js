import React, { useState } from 'react';
import {
  View,
	TextInput,
} from 'react-native';

export const ContinueEducationScreen = () => {
	const [text, setText] = useState('');
  return (
    <View style={{ flex: 1, marginTop: 50, padding: 10 }}>
			<TextInput
				style={{height: 40}}
				placeholder="Type here to continue education renewal date."
				onChangeText={newText => setText(newText)}
				defaultValue={text}
			/>
    </View>
  );
};
