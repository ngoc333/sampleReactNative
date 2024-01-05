import React, { useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import {View,Text,TouchableNativeFeedback} from "react-native";

import Moment from 'moment';

import { AntDesign  } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';

import COLORS from '../Color/Color';

import TextComponent from "./Text";
import STYLES from "../Styles/Styles";

const DatePicker =({onHandle})=>{
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [date, setDate] = useState(Moment(new Date()).format('YYYY-MM-DD'));
        const showDatePicker = () => {
            setDatePickerVisibility(true);
        };
        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };
        const handleConfirm = date => {
            setDate(Moment(date).format('YYYY-MM-DD'));
            onHandle(Moment(date).format('YYYY-MM-DD'));
            hideDatePicker();
        };
    return(
            <View style={{flex:1,paddingLeft:5}}>
                <TouchableNativeFeedback
                    activeOpacity={0}
                    onPress={showDatePicker}
                >
                    <View style={{width: '100%',backgroundColor:COLORS.white,height: 60,justifyContent: 'center',borderWidth:.4,borderColor:COLORS.Black,paddingHorizontal:5}}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal:5}}>
                            <FontAwesome name="calendar" size={24} color={COLORS.Red} />
                            <TextComponent style={STYLES.text11} label={date}/>
                            <AntDesign  name={isDatePickerVisible ? 'caretup' : 'caretdown'}  size={15} color={COLORS.Black} />
                        </View>
                        <DateTimePickerModal   
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    </View>
                </TouchableNativeFeedback>
            </View>
    )
};
export default DatePicker;