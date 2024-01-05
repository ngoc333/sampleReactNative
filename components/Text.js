import React from 'react';

import { Text } from 'react-native';

import STYLES from '../Styles/Styles';

export default function TextComponent(props) {

    return (
        <Text style={props.style ? props.style : STYLES.text6}>{props.label}</Text>
    )
};
