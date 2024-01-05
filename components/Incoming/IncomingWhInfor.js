import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import Loader from '../Loader';
import STYLES from '../../Styles/Styles';
import COLORS from '../../Color/Color';
import TextComponent from '../Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostData } from '../../api/PostData';
import { GetIncomingPoInfor, GetIncomingPartInfor } from '../../api/incomingWhUrl';
import BtnWorkOrder from '../Button/BtnWorkOrder';
import TxtInput from '../TextBox/TxtInput';
import LblDefault from '../Label/LblDefault';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{item}</Text>
    </TouchableOpacity>
);

const PartItem = ({ item, onPress, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.itemPart]}>
        <View style={[STYLES.partCode, { backgroundColor }]}>
            <LblDefault
                fontWeight='600'
                style={{ fontSize: 20, color: '#111' }}
            >
                {item.PART_CD}
            </LblDefault>
            <LblDefault
                fontWeight='600'
                style={{ fontSize: 20, color: '#111' }}
            >
                {item.LOC_WH === "__" ? "" : item.LOC_WH}
            </LblDefault>
        </View>
    </TouchableOpacity>
);

const isEmpty = (value) => {
    return (value === undefined || value === null || value === '')
}

const IncomingWhInfor = ({ route, show }) => {
    const [woSearch, setWoSearch] = useState('');
    const [dataWo, setDataWo] = useState(null);
    const [dataPart, setDataPart] = useState(null);
    const [selectedWo, setSelectedWo] = useState();
    const [selectedPart, setSelectedPart] = useState();
    const [loading, setLoading] = useState(false);
    const [showPartList, setShowPartList] = useState(false);

    const handleEndEditWorkOrder = async () => {
        if (isEmpty(woSearch)) return;
        setLoading(true);
        const dataConfig = {
            ARG_QTYPE: 'Q_INFOR',
            ARG_COMPANY_CD: route.params.COMPANY_CD,
            ARG_USER: route.params.USER_ID,
            ARG_IP: route.params.IP,
            ARG_PO_ID: woSearch,
            OUT_CURSOR: '',
        };
        const result = await PostData(GetIncomingPoInfor, dataConfig);

        await AsyncStorage.setItem('DataPo', JSON.stringify(result));
        AsyncStorage.setItem('PoId', '');
        setShowPartList(false);
        setLoading(false);
        setSelectedWo('');
        setDataWo(result);
    }

    useEffect(() => {
        if (!show) return;
        setDefaultData();

    }, []);

    useEffect(() => {
        if (!show) return;
        if (isEmpty(selectedWo)) return;

        handleClickWorkOrder(selectedWo);
        setWoSearch(selectedWo);
    }, [selectedWo]);

    const setDefaultData = async () => {
        const woId = await AsyncStorage.getItem('PoId');
        if (!isEmpty(woId)) {
            const dataPartStore = await AsyncStorage.getItem('DataPart');
            const dataPart = JSON.parse(dataPartStore);
            setWoSearch(woId);
            setDataPart(dataPart);
            setShowPartList(true);
            return;
        }

        const dataWoStore = await AsyncStorage.getItem('DataPo');
        if (isEmpty(dataWoStore)) return;
        const dataWo = JSON.parse(dataWoStore);
        setShowPartList(false);
        setDataWo(dataWo);
    }

    const handleClickWorkOrder = async (woId) => {
        setLoading(true);
        await AsyncStorage.setItem('PoId', woId);
        const dataConfig = {
            ARG_QTYPE: 'Q',
            ARG_COMPANY_CD: route.params.COMPANY_CD,
            ARG_USER: route.params.USER_ID,
            ARG_IP: route.params.IP,
            ARG_BARCODE: '',
            ARG_PO_ID: woId,
            OUT_CURSOR: '',
        };
        const result = await PostData(GetIncomingPartInfor, dataConfig);
        await AsyncStorage.setItem('DataPart', JSON.stringify(result));
        setLoading(false);
        setDataPart(result);
        setShowPartList(true);
    }

    const handleWorkOrderClick = (woId) => {
        setSelectedWo(woId)
    }

    const renderWorkOrder = ({ item }) => {
        const backgroundColor = item.PO_ID === selectedWo ? '#6e3b6e' : '#f9c2ff';
        const color = item.PO_ID === selectedWo ? 'white' : 'black';

        return (
            <BtnWorkOrder
                title={item.PO_ID}
                onHandle={() => setSelectedWo(item.PO_ID)}
            />
        );
    };

    const renderPartList = ({ item }) => {
        return (
            <PartItem
                item={item}
                onPress={() => setSelectedPart(item.PART_CD)}
                backgroundColor={COLORS.LightBlue}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Loader
                visible={loading}
                text='Saving...'
            />
            <TxtInput
                label='PO'
                fontWeight='600'
                inputType='numeric'
                value={woSearch}
                onChange={setWoSearch}
                onEndEdit={handleEndEditWorkOrder}
            />
            {!showPartList &&
                <FlatList
                    data={dataWo}
                    renderItem={renderWorkOrder}
                    keyExtractor={item => item.PO_ID}
                    extraData={selectedWo}
                />
            }
            {showPartList &&
                <>
                    <View style={[STYLES.container4, { height: 30 }]}>
                        <LblDefault
                            fontWeight='600'
                            style={{ fontSize: 24, color: '#4169e1' }}
                        >
                            {'Part Code'}
                        </LblDefault>
                        <LblDefault
                            fontWeight='600'
                            style={{ fontSize: 24, color: '#4169e1' }}
                        >
                            {'Location'}
                        </LblDefault>
                    </View>
                    <FlatList
                        data={dataPart}
                        renderItem={renderPartList}
                        keyExtractor={item => item.PART_CD}
                        extraData={selectedPart}
                    />
                </>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
    },
    item: {
        marginVertical: 1,
        marginHorizontal: 16,
        alignItems: 'center',

    },
    title: {
        fontSize: 26,
    },
    partList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    itemPart: {
        // padding: 1,
        marginVertical: 1,
        marginHorizontal: 10,
    },
});

export default IncomingWhInfor;