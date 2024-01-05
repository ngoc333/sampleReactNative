import { StyleSheet, View, TextInput } from 'react-native';
import LblDefault from '../Label/LblDefault';
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';

const TxtDisplay = ({ fontWeight, fontStyle, label, value, multiline }) => {
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
                <LblDefault fontWeight='600' style={{ fontSize: 20, color: '#111' }}>{label}</LblDefault>
                {fontLoaded && font !== null && <TextInput
                    type="text"
                    editable={false}
                    value={value}
                    style={[styles.textBox, { fontFamily: font }]}
                    multiline={multiline}
                />}
            </View>
        </>


    );
}

export default TxtDisplay;

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
        paddingTop: 1,


    },
    textBox: {
        textAlign: 'left',
        paddingLeft: 5,
        borderWidth: 1,
        //backgroundColor: "#faeeee",
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