import React from 'react';

import { useWindowDimensions, View, Text, ActivityIndicator} from 'react-native';
import COLORS from '../Color/Color';
import STYLES from '../Styles/Styles';

const Loader = ({visible = false}) => {

  const {width, height} = useWindowDimensions();

  return (
    visible && (
      <View style={[STYLES.container8, {height, width}]}>
        {/* <View style={STYLES.loader}> */}
          <ActivityIndicator size="large" color={COLORS.Yellow} />
          {/* <Text style={STYLES.text7}>Loading...</Text> */}
        {/* </View> */}
      </View>
    )
  );
};

export default Loader;