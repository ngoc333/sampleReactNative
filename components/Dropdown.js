import { View, StyleSheet, Text, Modal, Dimensions, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState, useRef,useEffect } from "react";

const width = Dimensions.get('window').width;

const actWidth = width * 0.62

import COLORS from '../Color/Color';

import ApiConfig from "./ApiLink";

export default function DropdownComponent({onHandle}) {

    const DropdownButton = useRef();

    const [visible, setVisible] = useState(false);

    const [selected, setSelected] = useState(undefined);

    const [DataPMIssue, setDataPMIssue] = useState(undefined);

    const [dropdownTop, setDropdownTop] = useState(0);

    useEffect(() => {
    var date = new Date().getDate(); //Current Date
    if (date < 10) 
    {
        date = '0' + date;
    }
    var month = new Date().getMonth() + 1; //Current Month
    if (month < 10) 
    {
        month = '0' + month;
    }
    var year = new Date().getFullYear(); //Current Year

    var date = year +'/'+ month +'/'+ date ;

    GetDataPMIssue({"Qtype": "MACHINE_PM_REASON","Barcode": " ", "Date":date});
    
     }, []);

    /* ...Get Data  */

    const GetDataPMIssue = async (data) => {
        await fetch(ApiConfig.urlServer).then((response) => {
        if (response.status == 200) 
        {
            fetch(ApiConfig.urlBarcode, {
                method: 'POST',
                mode: 'cors',
                dataType: "json",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((response) => {
            if (response.status == 200) {
                response.json().then((responseData) => 
                    {
                    if(responseData.length > 0)
                    {
                        setDataPMIssue(responseData);
                        setSelected(responseData[0]);
                        onHandle(responseData[0]);
                    }
                    else
                    {
                        Toast.show({
                        type: 'WarningToast',
                        props: { text2: 'Không có lý do .Vui lòng kiểm tra lại!',color:COLORS.Red },
                        });
                    }
                    });
            }
            })
        }
        else {
            Toast.show({
            type: 'WarningToast',
            props: { text2: ' Có lỗi trong quá trình kết nối Internet ',color:COLORS.Red },
            });
        }
        })
    };
    
    const handleVisible = () => {
        setVisible(!visible);
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + 20);
        });
    }
    const handleChange = (value) => {
        setSelected(value);
        setVisible(!visible);
        onHandle(value);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.item,
                {
                    backgroundColor: (!!selected && selected.CODE) == item.CODE ? COLORS.Lime : COLORS.White,
                }]}
            onPress={() => handleChange(item)}>
            <Text style={[styles.selectText, { color: (!!selected && selected.CODE) == item.CODE ? COLORS.White : COLORS.Black }]}>{item.NAME}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = () => {
        return (
            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => handleVisible()}
                >
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
                        <FlatList
                            data={DataPMIssue}
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
            <TouchableOpacity ref={DropdownButton} style={styles.container} onPress={() => handleVisible()}>
                {renderDropdown()}
                <Text style={styles.modalText}>{(!!selected && selected.NAME)}</Text>
                <AntDesign style={[styles.icon, { top: visible ? 35 : 30 }]} name={visible ? 'caretup' : 'caretdown'} size={15} color="black" />
            </TouchableOpacity>
        </>
    )
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
        height:80,
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
        textAlign:'center',
    }
});