import React from 'react';

import {TextInput, View } from 'react-native';

import STYLES from '../Styles/Styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TextInputComponent(props) {

    return (
        <View style={STYLES.container7}>
            <FontAwesome  
                name={props.iconName} 
                size={props.iconSize} 
                color={props.iconColor}
                style={STYLES.icon}
            />
            <TextInput
                onChangeText={props.onChangeText}
                editable={props.editable?props.editable:false}
                autoFocus={props.autoFocus?props.autoFocus:false}
                autoCorrect={props.autoCorrect?props.autoCorrect:false}
                selectTextOnFocus={props.selectTextOnFocus?props.selectTextOnFocus:false}
                showSoftInputOnFocus={props.showSoftInputOnFocus?props.showSoftInputOnFocus:false}
                ref={props.ref}
                multiline={props.multiline?props.multiline:false}
                placeholder={props.placeholder}
                style={[STYLES.text5,{backgroundColor:props.backgroundColor,height:props.height,color:props.color,fontWeight:props.fontWeight,fontSize:props.fontSize}]}
                value={props.value}
                onEndEditing={props.onEndEditing}
                secureTextEntry={props.secureTextEntry}
                onSubmitEditing={props.onSubmitEditing}
                onPressOut={props.onPressOut}
            />
        </View>
    )
};
