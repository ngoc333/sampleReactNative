import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import LblDefault from "../Label/LblDefault";

const AlertNotify = ({ modalVisible, handleVisible, error, text }) => {


    //Fade effects with Timeout 
    useEffect(() => {

        var timeOut = '';

        if (modalVisible) {
            timeOut = setTimeout(() => {
                handleVisible();
            }, 5000);
        }

        return () => {
            if (timeOut) clearTimeout(timeOut);
        }
    }, [modalVisible])


    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.container}>
                    <View style={[styles.modalView, styles.shadow_1]}>
                        <View style={[styles.modalIcon, styles.shadow_2]}>
                            <View style={[styles.modalIconView, { backgroundColor: error ? '#ff0000' : '#ffff00' }]}>
                                <Ionicons
                                    name={'ios-warning'}
                                    size={55}
                                    color="white" />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.shadow_2]}
                            onPress={() => handleVisible()}
                        >
                            <View style={styles.modalButtonView}>
                                <Ionicons
                                    name="ios-close"
                                    size={28}
                                    color="white" />
                            </View>
                        </TouchableOpacity>

                        <LblDefault fontWeight='400' style={styles.modalText}>{text}</LblDefault>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default AlertNotify;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,.6)',
    },
    shadow_1: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    shadow_2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 30,
        paddingVertical: 20,
        alignItems: "center",
    },
    modalIcon: {
        width: 90,
        height: 90,
        backgroundColor: '#fff',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: - 70,
        marginBottom: 5,
    },
    modalIconView: {
        width: 80,
        height: 80,
        padding: 10,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        right: -10,
        top: -10,
    },
    modalButtonView: {
        width: 28,
        height: 28,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    modalTitle: {
        textAlign: "center",
        fontSize: 22,
        marginBottom: 5,
    },
    modalText: {
        textAlign: "center",
        fontSize: 18,
        color: '#555'
    },
});