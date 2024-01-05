import {  Text, View } from 'react-native';

import React from 'react';

import STYLES from '../Styles/Styles';

import TextComponent from '../components/Text';

export default function Header(props) {
    return (
        <View style={STYLES.container9}>
            <TextComponent style={STYLES.text} label={props.label} />
        </View>
    )
};