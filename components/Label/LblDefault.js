import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font';

const LblDefault = ({ fontWeight, fontStyle, children, style }) => {

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
            {fontLoaded && font !== null &&
                <Text style={[style, { fontFamily: font }]}>{children}</Text>
            }
        </>
    )
}
export default LblDefault;