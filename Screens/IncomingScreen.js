// IncomingScreen.js
import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const IncomingScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('load IncomingScreen');
  }, [navigation]);

  return (
    <View>
      <Text>Incoming Screen Content</Text>
      {console.log(isFocused ? 'incoming focused' : ' incoming unfocused')}
      <Text>{isFocused ? 'focused' : 'unfocused'}</Text>
    </View>
  );
}

export default IncomingScreen;