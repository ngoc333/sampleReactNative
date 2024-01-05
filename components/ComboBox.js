import { View, StyleSheet, Text, Modal, Dimensions, TouchableOpacity,  FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';

const width = Dimensions.get('window').width;
const actWidth = width * 0.62;
import COLORS from '../Color/Color';
import { PostData } from '../api/PostData';
import { GetWarehouse } from '../api/inventoryWhUrl';

export default function ComboBox({ onHandle, company, orgnCd, user }) {
	const DropdownButton = useRef();
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState('');
	const [dataSource, setDataSource] = useState([]);
	const [dropdownTop, setDropdownTop] = useState(0);

	useEffect(() => {
		const dataSource = async () =>{
			const dataConfig = {
				ARG_QTYPE: 'Q',
				ARG_USER: user,
				ARG_COMPANY_CD: company,
				ARG_ORGN_CD: orgnCd,
				OUT_CURSOR: '',
			};

			const dataWh = await PostData(GetWarehouse, dataConfig);
			setDataSource(dataWh);
			setSelected(dataWh[0]);
			onHandle(dataWh[0])
		}
		dataSource();
		
	}, []);

	

	const handleVisible = () => {
		setVisible(!visible);
		DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
			setDropdownTop(py + 20);
		});
	};
	const handleChange = (value) => {
		setSelected(value);
		setVisible(!visible);
		onHandle(value);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={[
				styles.item,
				{
					backgroundColor: (!!selected && selected.CODE) == item.CODE ? COLORS.Lime : COLORS.White,
				},
			]}
			onPress={() => handleChange(item)}
		>
			<Text
				style={[
					styles.selectText,
					{ color: (!!selected && selected.CODE) == item.CODE ? COLORS.White : COLORS.Black },
				]}
			>
				{item.NAME}
			</Text>
		</TouchableOpacity>
	);

	const renderDropdown = () => {
		return (
			<Modal
				visible={visible}
				transparent
				animationType='fade'
			>
				<TouchableOpacity
					style={styles.overlay}
					onPress={() => handleVisible()}
				>
					<View style={[styles.dropdown, { top: dropdownTop }]}>
						<FlatList
							data={dataSource}
							renderItem={renderItem}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	};

	return (
		<>
			<TouchableOpacity
				ref={DropdownButton}
				style={styles.container}
				onPress={() => handleVisible()}
			>
				{renderDropdown()}
				<Text style={styles.modalText}>{!!selected && selected.NAME}</Text>
				<AntDesign
					style={[styles.icon, { top: visible ? 25 : 16 }]}
					name={visible ? 'caretup' : 'caretdown'}
					size={15}
					color='black'
				/>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	modalText: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderWidth: 1.5,
		borderColor: '#999',
		width: actWidth,
		fontSize: 20,
		height: 50,
	},
	icon: {
		position: 'absolute',
		right: 10,
	},
	overlay: {
		width: '100%',
		height: '100%',
	},
	dropdown: {
		position: 'absolute',
		backgroundColor: '#fff',
		width: actWidth,
		shadowColor: '#000000',
		borderColor: '#999',
		borderWidth: 1,
		shadowRadius: 4,
		shadowOffset: { height: 4, width: 0 },
		shadowOpacity: 0.5,
		top: 0,
		right: width * 0.027,
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	selectText: {
		fontSize: 18,
		textAlign: 'center',
	},
});
