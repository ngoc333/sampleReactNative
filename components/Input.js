import React, { useRef } from 'react';

import { View, TextInput } from 'react-native';

import TextComponent from '../components/Text';

import STYLES from '../Styles/Styles.js';

export default function InputComponent(props) {
	const inputElement = useRef(null);

	const {
		style,
		label,
		onChangeText,
		editable,
		placeholder,
		value,
		onSubmitEditing,
		autoFocus,
		autoCorrect,
		backgroundColor,
		width,
		height,
		color,
		fontWeight,
		fontSize,
		multiline,
		selectTextOnFocus,
	} = props;

	return (
		<View style={[style ? style : STYLES.container4, { paddingVertical: 1 }]}>
			<TextComponent
				style={STYLES.text10}
				label={label}
			/>
			<TextInput
				onChangeText={onChangeText}
				editable={editable}
				autoFocus={autoFocus}
				autoCorrect={autoCorrect}
				selectTextOnFocus={selectTextOnFocus}
				showSoftInputOnFocus={false}
                multiline={multiline}
				placeholder={placeholder}
                value={value}
				onSubmitEditing={onSubmitEditing}
				ref={(inputElement) => {
					if (inputElement) {
						inputElement.focus();
					}
				}}				
				style={[
					STYLES.text9,
					{
						backgroundColor: backgroundColor,
						width: width ? width : '65%',
						height: height,
						color: color,
						fontWeight: fontWeight,
						fontSize: fontSize,
					},
				]}				
			/>
		</View>
	);
	const styles = StyleSheet.create({
		container: {
			paddingVertical: 2,
			// paddingHorizontal: 10,
			backgroundColor: bgColor,
			borderRadius: 30,
			position: 'relative',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 1,
			borderWidth: 2,
			borderColor: '#ccc',
			//width: 300,
		},
	});
}
