import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Vibration,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Button,
    Text,
    Keyboard,
    ScrollView,
    TextInput,
    useWindowDimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostData } from '../../api/PostData';
import { GetIncomingPoInfor, GetIncomingPartInfor, SaveIncomingWh } from '../../api/incomingWhUrl';
import STYLES from '../../Styles/Styles';
import COLORS from '../../Color/Color';
import TextComponent from '../Text';
import ButtonComponent from '../Button';
import Loader from '../Loader';
import TxtScan from '../TextBox/TxtScan';
import TxtDisplay from '../TextBox/TxtDisplay';
import TxtInput from '../TextBox/TxtInput';
import TxtDisplaySize from '../TextBox/TxtDisplaySize';
import LblDefault from '../Label/LblDefault';
import AlertNotify from '../Alert/AlertNotify';

const toastConfig = {
    WarningToast: ({ props }) => (
         <View style={[STYLES.toast, { borderLeftColor: props.color }]}>
            <TextComponent label={props.text2} />
            <TextComponent label={props.text1} />
        </View>
    ),
};

const isEmpty = (value) => {
    return (value === undefined || value === null || value === '')
}

const IncomingWhScan = ({ route, show, navigation }) => {
    const refBarcode = useRef();
    const refIncomingQty = useRef();
    //const refPoId = useRef();
    const [loading, setLoading] = useState(false);
    const [countScan, setCountScan] = useState(0);
    const [onFocusQty, setOnFocusQty] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');

    const defaultData = async () => {
        const woId = await AsyncStorage.getItem("PoId");
        return {
            WO_ID: isEmpty(woId) ? '' : woId,
            OG_ID: '',
            OG_QTY: '',
            PART_CD: '',
            PART_NM: '',
            SPEC: '',
            REMAIN_QTY: '',
            STOCK_QTY: '',
            WO_ROW_NO: '',
            ORDER_PRICE: '',
            ORDER_USD: '',
        }
    };

    const [dataOutgoing, setDataOugoing] = useState(defaultData);

    useEffect(() => {
        if (!show) return;
        getWoId();
    }, []);

    const getWoId = async () => {
        const woId = await AsyncStorage.getItem("PoId");
        if (isEmpty(woId)) return;
        setDataOugoing((prevState) => ({
            ...prevState,
            WO_ID: woId,
        }));
        await WorkOrderData(woId);
        if(refBarcode !== null) refBarcode.current.focus();
    }

    const WorkOrderData = async (woId = null) => {
        const dataConfig = {
            ARG_QTYPE: 'Q',
            ARG_COMPANY_CD: route.params.COMPANY_CD,
            ARG_USER: route.params.USER_ID,
            ARG_IP: route.params.IP,
            ARG_PO_ID: woId ?? dataOutgoing.WO_ID,
            OUT_CURSOR: '',
        };

        const result = await PostData(GetIncomingPoInfor, dataConfig);

        let incomingId;
        if (result === null || result.length === 0) {
            incomingId = '';
        } else {
            incomingId = result[0].INCOMING_ID;
        }
        setDataOugoing((prevState) => ({
            ...prevState,
            OG_ID: incomingId,
        }));
    };

    const PartData = async (partCd) => {
        if (isEmpty(dataOutgoing.WO_ID)) {
           // console.log("WO ID Empty")
            return;
        }
        const dataConfig = {
            ARG_QTYPE: 'Q',
            ARG_COMPANY_CD: route.params.COMPANY_CD,
            ARG_USER: route.params.USER_ID,
            ARG_IP: route.params.IP,
            ARG_BARCODE: partCd,
            ARG_PO_ID: dataOutgoing.WO_ID,
            OUT_CURSOR: '',
        };

        const result = await PostData(GetIncomingPartInfor, dataConfig);

        let partCode;
        let partName;
        let spec;
        let remainQty;
        let woRowNo;
        let stockQty;
        let orderPrice;
        let orderUSD;

        if (result === null || result.length === 0) {
            partCode = '';
            partName = '';
            spec = '';
            remainQty = '';
            woRowNo = '';
            stockQty = '';
            orderPrice = '';
            orderUSD = '';
        } else {
            partCode = partCd;
            partName = result[0].PART_NM;
            spec = result[0].SPEC;
            remainQty = result[0].REMAIN_QTY.toString();
            stockQty = result[0].STOCK_QTY.toString();
            woRowNo = result[0].PO_ROW_NO;
            orderPrice = result[0].ORDER_PRICE;
            orderUSD = result[0].ORDER_USD;
        }

        setDataOugoing((prevState) => ({
            ...prevState,
            PART_CD: partCode,
            PART_NM: partName,
            SPEC: spec,
            REMAIN_QTY: remainQty,
            STOCK_QTY: stockQty,
            WO_ROW_NO: woRowNo,
            ORDER_PRICE: orderPrice,
            ORDER_USD: orderUSD,
        }));
    };

    const handleOgQtyOnChange = (qty) => {
    //     this.setState({ 
    //         myNumber: qty.replace(/[^0-9]/g, '') 
    //    });
        setDataOugoing((prevState) => ({
            ...prevState,
            OG_QTY: qty,
        }));
    };

    const handleOgQtyChangeFinished = () => {
        if (Number(dataOutgoing.OG_QTY) > Number(dataOutgoing.STOCK_QTY)) {
            // Toast.show({
            //     type: 'WarningToast',
            //     props: { text2: 'Vượt quá số lượng tồn', color: COLORS.Red },
            // });
            showAlert('Vượt quá số lượng tồn');
            setDataOugoing((prevState) => ({
                ...prevState,
                OG_QTY: '',
            }));
        }
        setOnFocusQty(false);
        if(refBarcode) refBarcode.current.focus();
    }

    const handleHideAlert = () =>{
        setAlertVisible(prev => !prev)
        if(refBarcode !== null) refBarcode.current.focus();
    }

    const handleBarcodeOnChange = async (barcode) => {
        await PartData(barcode);
        refIncomingQty.current.focus();
    };

    const Clear = () => {
        setDataOugoing((prevState) => ({
            ...prevState,
            OG_QTY: '',
            PART_CD: '',
            PART_NM: '',
            SPEC: '',
            REMAIN_QTY: '',
            STOCK_QTY: '',
            WO_ROW_NO: '',
            ORDER_PRICE: '',
            ORDER_USD: '',
        }));
        if(refBarcode !== null) refBarcode.current.focus();
    };

    const SaveClick = async () => {
        if (dataOutgoing.CHECK_QTY === null || dataOutgoing.CHECK_QTY === '') return;
        setLoading(true);
        const dataConfig = {
            ARG_QTYPE: 'Q',
            ARG_COMPANY_CD: route.params.COMPANY_CD,
            ARG_USER: route.params.USER_ID,
            ARG_IP: route.params.IP,
            ARG_PART_CD: dataOutgoing.PART_CD,
            ARG_PO_ROW_NO: dataOutgoing.WO_ROW_NO,
            ARG_PO_ID: dataOutgoing.WO_ID,
            ARG_IC_ID: dataOutgoing.OG_ID,
            ARG_IC_QTY: dataOutgoing.OG_QTY,
            ARG_IC_PRICE: dataOutgoing.ORDER_PRICE,
            ARG_IC_USD: dataOutgoing.ORDER_USD.toFixed(2),
            OUT_CURSOR: '',
        };

        const result = await PostData(SaveIncomingWh, dataConfig);
        if(refBarcode !== null) refBarcode.current.focus();
        setLoading(false);
        if (result === null || result.length === 0) {
            showAlert('Lưu thất bại');
            Vibration.vibrate();
            return;
        }
        setCountScan(result[0].CNT);
        setDataOugoing((prevState) => ({
            ...prevState,
            OG_QTY: '',
            PART_CD: '',
            PART_NM: '',
            SPEC: '',
            REMAIN_QTY: '',
            STOCK_QTY: '',
            WO_ROW_NO: '',
            ORDER_PRICE: '',
            ORDER_USD: '',
        }));
    };

    const showAlert = (alertText) =>{
        setAlertText(alertText);
        setAlertVisible(true);
    }

    const handleOnBlur = (e) => {
       // console.log("onBlur", onFocusQty)
      //  if(!onFocusQty) e.target.focus();
        // Keyboard.dismiss()
    }

    const handleOnFocus = () =>{
        setOnFocusQty(prev =>!prev);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 100}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <Loader
                        visible={loading}
                        text='Saving...'
                    />
                    <TxtScan
                        //scanData={scanData} 
                        onChange={(barcode) => handleBarcodeOnChange(barcode)}
                        innerRef={refBarcode}
                        onBlur={(e) => handleOnBlur(e)}
                    />
                    <TxtDisplay
                        label='In No'
                        fontWeight='400'
                        value={dataOutgoing.OG_ID}
                    />
                    <TxtDisplay
                        label='Part Code'
                        fontWeight='400'
                        value={dataOutgoing.PART_CD}
                    />
                    <TxtDisplaySize
                        label='Part Name'
                        fontWeight='400'
                        widthSize={'68%'}
                        heightSize={60}
                        multiline={true}
                        value={dataOutgoing.PART_NM}
                    />
                    <TxtDisplay
                        label='Spec'
                        fontWeight='400'
                        value={dataOutgoing.SPEC}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TxtDisplaySize
                            label='Remain'
                            fontWeight='400'
                            widthSize={80}
                            labelWidth={113}
                            value={dataOutgoing.REMAIN_QTY}
                        />

                        <TxtDisplaySize
                            label='Stock'
                            fontWeight='400'
                            widthSize={80}
                            labelWidth={58}
                            value={dataOutgoing.STOCK_QTY}
                        />
                    </View>
                    <TxtInput
                        label='Quantity'
                        fontWeight='600'
                        inputType='numeric'
                        value={dataOutgoing.OG_QTY}
                        onChange={handleOgQtyOnChange}
                        onEndEdit={handleOgQtyChangeFinished}
                        focus={handleOnFocus}
                        innerRef={refIncomingQty}
                    />
                    <View style={[STYLES.container4, { backgroundColor: COLORS.Lime, marginTop: 1 }]}>
                        <LblDefault
                            fontWeight='600'
                            style={{ fontSize: 24, color: '#111' }}
                        >
                            {`Total Scan: ${countScan}`}
                        </LblDefault>
                    </View>
                    <View style={[STYLES.container4, { height: 60 }]}>
                        <ButtonComponent
                            title='Clear'
                            btnStyle={[STYLES.buttonSave, { backgroundColor: COLORS.Gray }]}
                            txtStyle={STYLES.text4}
                            onPress={() => Clear()}
                        />
                        <ButtonComponent
                            title='Save'
                            btnStyle={[STYLES.buttonSave, { backgroundColor: COLORS.LightBlue }]}
                            txtStyle={STYLES.text4}
                            onPress={() => SaveClick()}
                        />
                    </View>
                    <AlertNotify 
                        modalVisible={alertVisible} 
                        handleVisible={handleHideAlert} 
                        error={'error'}
                        text= {alertText}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default IncomingWhScan;