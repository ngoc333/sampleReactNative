import { View, Text,TouchableOpacity } from 'react-native';

import React from 'react';

import STYLES from '../Styles/Styles';

function ButtonComponent(props){
    return (
        <TouchableOpacity 
            style={props.btnStyle} 
            onPress={props.onPress}
        >
            <View style={STYLES.button}>
                <Text style={props.txtStyle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonComponent;