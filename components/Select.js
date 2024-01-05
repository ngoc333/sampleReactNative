import { View, StyleSheet, Text, Modal, Dimensions, TouchableOpacity, FlatList } from "react-native";

import { AntDesign } from '@expo/vector-icons';

import { useState, useRef,useEffect } from "react";

import Toast from 'react-native-toast-message';

const width = Dimensions.get('window').width;

const actWidth = width * 0.62

import COLORS from '../Color/Color';

import STYLES from '../Styles/Styles';

import ApiConfig from "./ApiLink";

import TextComponent from '../components/Text';

/*
  1. Create the config
*/
const toastConfig = {
    WarningToast: ({props }) => (
        <View style={[STYLES.toast,{borderLeftColor:props.color}]}>
        <TextComponent label={props.text2}/>
        <TextComponent style={STYLES.text18} label={props.text1}/>
    </View>
  )
};

export default function SelectComponent({onHandle,Barcode}) {

    const DropdownButton = useRef();

    const [visible, setVisible] = useState(false);

    const [selected, setSelected] = useState(undefined);

    const [DataTask, setDataTask] = useState(undefined);

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

    if(Barcode.length > 0)
    {
        GetDataPMIssue({"Qtype": "PM_TASK_SELECT","Barcode": Barcode, "Date":date});
    }
    
    
    
     }, [Barcode]);

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
                        setDataTask(responseData);
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
                    backgroundColor: (!!selected && selected.GRP_CD) == item.GRP_CD ? COLORS.Lime : COLORS.White,
                }]}
            onPress={() => handleChange(item)}>
            <Text style={[styles.selectText, { color: (!!selected && selected.GRP_CD) == item.GRP_CD ? COLORS.White : COLORS.Black }]}>{item.GRP_NM}</Text>
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
                            data={DataTask}
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
                <Text style={styles.modalText}>{(!!selected && selected.GRP_NM)}</Text>
                <AntDesign style={[styles.icon, { top: visible ? 20 : 15 }]} name={visible ? 'caretup' : 'caretdown'} size={15} color="black" />
            </TouchableOpacity>
            <>
            {/* ... */}
             <Toast config={toastConfig} />
         </> 
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
        height:50,
        // textAlign:'center',
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