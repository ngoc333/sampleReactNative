// SearchScreen.js
import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { PostData } from '../api/PostData';
import { ToolingMaster } from '../api/apiUrl';

const SearchScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('load SearchScreen');
  }, [navigation]);

  const fetchDataTooling = async () => {
    const param = {
      ARG_QTYPE: '',
      OUT_CURSOR: '',
    };
    const result = await PostData(ToolingMaster, param);
    alert(JSON.stringify(result));
  };


  return (
    <View>
      <Text>Search Screen Content</Text>
      {console.log(isFocused ? 'search focused1' : ' search unfocused')}
      <Text>{isFocused ? 'focused' : 'unfocused'}</Text>
      <TouchableOpacity onPress={fetchDataTooling}><Text>Click 1</Text></TouchableOpacity>
    </View>
  );
}

export default SearchScreen;