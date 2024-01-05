import { TouchableOpacity, StyleSheet, View } from "react-native";
import LblDefault from "../Label/LblDefault";

const bgColor = '#ffffc0';

const BtnWorkOrder = ({ title, onHandle }) => {

    return (
        <>
            <TouchableOpacity 
                style={styles.container} 
                onPress={onHandle}>
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <Text>{title}</Text> */}
                    <LblDefault fontWeight='600' style={{fontSize: 22, color: '#111'}}>{title}</LblDefault>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default BtnWorkOrder;

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