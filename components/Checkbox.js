import { View, Text } from 'react-native'

import React from 'react';

import { Checkbox } from 'react-native-paper';

import TextComponent from '../components/Text';

import COLORS from '../Color/Color.js';

import STYLES from '../Styles/Styles.js';

const CheckboxComponent = (props) => {

    const { onPress, status,value} = props;

    return (
        <View style={STYLES.container10}>
        <Checkbox
            status={status}
            value ={value}
            size={150}
            onPress={onPress}
            color={COLORS.Lime}
            uncheckedColor ={COLORS.Black}
        />
        <TextComponent style={STYLES.text11} label="Auto Save"/>
        </View>
    )
};

export default CheckboxComponent;