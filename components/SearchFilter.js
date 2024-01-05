import { Text, View, TextInput, FlatList, SafeAreaView } from 'react-native';
import React from 'react';

import TextComponent from '../components/Text';
import COLORS from '../Color/Color';
import STYLES from '../Styles/Styles';

const Item = ({ title }) => (
	<View>
		<Text>{title}</Text>
	</View>
);

export default function SearchFilter(props) {
	const DATA = [{ PO_ID: '1' }, { PO_ID: '2' }, { PO_ID: '3' }, { PO_ID: '4' }, { PO_ID: '5' }, { PO_ID: '6' }];

	return (
		<View>
			<View style={[STYLES.container4, { paddingVertical: 5 }]}>
				<TextComponent
					style={STYLES.text10}
					label={'PO ID'}
				/>
				<TextInput
					//value={dataInventory.CHECK_QTY}

					// onEndEditing={poIdOnEndEditing}
					// onChangeText={poIdOnChangeText}
					// value={poId}
					editable={true}
					//ref={refCheckQty}
					autoFocus={false}
					autoCorrect={false}
					showSoftInputOnFocus={true}
					selectTextOnFocus={true}
					multiline={false}
					style={[
						STYLES.text9,
						{ backgroundColor: COLORS.PeachOrange, width: '65%', height: 30, fontSize: 20 },
					]}
				/>
			</View>
			<SafeAreaView style={{ flex: 1 }}>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <Item title={item.PO_ID} />}
					keyExtractor={(item) => item.PO_ID}
				/>
			</SafeAreaView>
		</View>
	);
}

// import React, { useState } from 'react';
// import { View, TextInput, TextComponent } from 'react-native';

// import COLORS from '../Color/Color';
// import STYLES from '../Styles/Styles';

// const SearchFilter = (props) => {
// 	// const [poId, setPoId] = useState('');

// 	// const poIdOnChangeText = (value) =>{
// 	// 	setPoId(value);
// 	// }
// 	return (
// 		<View style={[STYLES.container4, { paddingVertical: 5 }]}>
// 			<TextComponent
// 				style={STYLES.text10}
// 				label={'PO ID'}
// 			/>
// 			<TextInput
// 				//value={dataInventory.CHECK_QTY}

// 				// onEndEditing={poIdOnEndEditing}
// 				// onChangeText={poIdOnChangeText}
// 				// value={poId}
// 				editable={true}
// 				//ref={refCheckQty}
// 				autoFocus={false}
// 				autoCorrect={false}
// 				showSoftInputOnFocus={true}
// 				selectTextOnFocus={true}
// 				multiline={false}
// 				style={[STYLES.text9, { backgroundColor: COLORS.PeachOrange, width: '65%', height: 30, fontSize: 20 }]}
// 			/>
// 		</View>
// 	);
// };

// export default SearchFilter;
