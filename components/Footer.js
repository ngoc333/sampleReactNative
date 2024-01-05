import { View } from 'react-native';

import React from 'react';

import TextComponent from './Text';

import STYLES from '../Styles/Styles';


export default function Footer(props) {
  return (
    <View style={STYLES.container11}>
      <TextComponent style={STYLES.text3} label={props.label}/>
    </View>
  )
};
