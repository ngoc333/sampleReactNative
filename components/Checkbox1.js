import { View, Text } from 'react-native'

import React from 'react';

import { Checkbox } from 'react-native-paper';

import TextComponent from './Text';

import COLORS from '../Color/Color.js';

import STYLES from '../Styles/Styles.js';

const CheckboxComponent1 = (props) => {

    const { onPress, status,value,label} = props;

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
        <TextComponent style={STYLES.text11} label={label}/>
        </View>
    )
};

export default CheckboxComponent1;