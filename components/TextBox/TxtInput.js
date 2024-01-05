import { StyleSheet, View, TextInput } from 'react-native';
import LblDefault from '../Label/LblDefault';
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';

const TxtInput = ({ fontWeight, fontStyle, label, value, onChange, inputType, onEndEdit, innerRef, focus }) => {
    const [fontLoaded] = useFonts({
        Regular: require('../../assets/fonts/Consolas-Regular.ttf'),
        Italic: require('../../assets/fonts/Consolas-Italic.ttf'),
        Bold: require('../../assets/fonts/Consolas-Bold.ttf'),
        BoldItalic: require('../../assets/fonts/Consolas-BoldItalic.ttf'),
    });

    const [font, setFont] = useState(null);

    useEffect(() => {
        let _font = '';

        switch (fontWeight) {
            case '400': case 'normal':
                _font = 'Regular';
                break;
            case '600':
                _font = 'Bold';
                break;
        }

        if (fontStyle != null && fontStyle != undefined) {
            if (fontWeight != undefined) {
                _font = 'Italic';
            }
            else {
                _font += 'Italic';
            }
        }

        setFont(_font);

    }, []);

    return (
        <>
            {/* {fontLoaded} && */}
            <View style={styles.container}>
                <LblDefault fontWeight={fontWeight} style={{ fontSize: 20, color: '#111' }}>{label}</LblDefault>
                {fontLoaded && font !== null && <TextInput
                    type="text"
                    editable={true}
                    value={value}
                    keyboardType={inputType}
                    // onFocus = {()=> Keyboard.dismiss()}
                    //showSoftInputOnFocus={false}
                    // value={scanData}
                    onFocus={focus}
                    selectTextOnFocus={true}
                    onEndEditing={onEndEdit}
                    onChangeText={onChange}
                    style={[styles.textBox, { fontFamily: font }]}
                    ref={innerRef}
                //placeholder="Scan QR Code Part"

                />}
            </View>
        </>


    );
}

export default TxtInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        alignItems: 'center',
        // display: 'flex',
        //alignItems: 'center',
        // flexDirection: 'row',
        //backgroundColor: '#f5f7fa',
        paddingTop: 5,


    },
    textBox: {
        textAlign: 'left',
        paddingLeft: 10,
        borderWidth: 1,
        backgroundColor: "#faeeee",
        width: '68%',
        color: "#111",
        fontSize: 22,
        // fontWeight: "600",
        borderWidth: 1.5,
        borderColor: '#999',
        borderRadius: 5,
        paddingVertical: 5,
    },

});