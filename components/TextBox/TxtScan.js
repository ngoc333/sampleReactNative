import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const TxtScan = ({ scanData, onChange, innerRef, onBlur }) => {
    return (
        <View style={styles.fContainer}>

            <View style={styles.container}>
                <Ionicons
                    name="qr-code"
                    size={25}
                    color="grey" />
                <TextInput
                    type="text"
                    autoFocus={true}
                   // onFocus = {()=> Keyboard.dismiss()}
                    showSoftInputOnFocus={false}
                    value=''
                    onChangeText={onChange}
                    style={styles.searchInput}
                    placeholder="Scan QR Code Part"
                    ref={innerRef}
                    onBlur = {onBlur}
                    // onBlur={ e =>{
                    //      console.log(e.relatedTarget);
                    //     e.target.focus()
                    // }}
                />
            </View>
        </View>
    );
}

export default TxtScan;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems:
            'center',
        flexDirection: 'row',
        backgroundColor: '#faeeee',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1.5,
        marginBottom: 5,
        borderRadius: 5,
        borderColor: '#999'
       // backgroundColor: "#faeeee",
    },
    fContainer: {
        display: 'flex',
        marginTop: 10,
        marginHorizontal: 15,
    },
    searchInput: {
        width: 290,
        fontSize: 19,       
        color: '#000',
        marginLeft: 5,
    },
    label: {
        fontSize: 21,
        lineHeight: 25,
        textShadowColor: 'rgba(9, 133, 140, 0.3)',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 10,
    },
});