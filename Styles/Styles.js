import {StyleSheet,Dimensions} from 'react-native';
import COLORS from '../Color/Color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const STYLES = StyleSheet.create({
//Format View//
    container:{
        flex:1,
        display: 'flex',
    },
    container1: {
        alignItems:'flex-start',
        paddingHorizontal:10,
    },
    container2:{
        alignItems: 'center',
        justifyContent:'center',
        paddingTop:10,
    },
    container3:{
        paddingHorizontal:10,
        paddingVertical:10,
        height:230,
    },
    container4:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:10,
        alignItems:'center',
    },
    container5:{
        position: "absolute",
        bottom:0,
    }, 
    container6:{
        left: 10,
        height:'100%',
        width:'100%'
    },
    container7:{
        flexDirection:'row',
        borderWidth:1,
        marginTop:5,
        alignItems:'center',
        backgroundColor:COLORS.Gray
    },
    container8: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    container9:{
        backgroundColor: COLORS.Orange,
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
    },
    container10:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    container11:{
        backgroundColor: COLORS.Lime,
        paddingHorizontal:10
    },
    container12:{
        borderWidth :1 ,
        margin : 10 ,
        justifyContent :'center',
    },
    container13:{
        flexDirection:'row' ,
        flexWrap:'wrap',
        justifyContent:'center',
    },
    container14:{
        padding:10,
        borderWidth:1,
        borderRadius:10,
        marginHorizontal:10,
        marginVertical:2,
        borderColor:COLORS.Gray,
        backgroundColor:COLORS.White,
        flexDirection:'row',
    },
    container15:{
        backgroundColor:COLORS.Lime,
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
    },
    container16:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight:10
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        padding:10,
        height: 350,
    },

//Format Text//
    text:{
        fontWeight:"bold",
        // fontStyle:"italic",
        fontSize :40 ,
        color:COLORS.White,
    },
    text1:{
        fontSize:42,
        fontWeight:'bold',
    },
    text3:{
        fontSize:26,
        fontWeight:'bold',
    },
    text4:{
        fontWeight:"bold",
        fontSize :30 ,
        textAlign:'center',
    },
    text5:{
        flex:1,
        textAlign: 'left',
        paddingLeft:10,
        borderWidth:1,
    },
    text6: {
        fontSize: 20,
        color:COLORS.Black,
    },
    text7: {
        marginLeft: 10,
        fontSize: 32
    },
    text8: {
        fontSize: 20,
        fontWeight:'bold',
    },
    text9:{
        textAlign: 'left',
        paddingLeft:10,
        borderWidth:1,
    },
    text10: {
        fontSize: 22,
        color:COLORS.RoyalBlue,
    },
    text11: {
        fontSize: 24,
        color:COLORS.Black,
    },
    text12:{
        backgroundColor:COLORS.Lime,
        color:COLORS.White,
        fontSize:20,
        borderWidth:1,
        textAlign:'center',
        width:200,
    },
    text13:{
        backgroundColor:COLORS.White,
        color:COLORS.Black,
        fontSize:20,
        borderWidth:1,
        textAlign:'center',
        width:200,
    },
    text14:{
        backgroundColor:COLORS.Lime,
        color:COLORS.White,
        fontSize:20,
        borderWidth:1,
        textAlign:'center',
        width:80,
    },
    text15:{
        backgroundColor:COLORS.White,
        color:COLORS.Black,
        fontSize:14,
        borderWidth:1,
        textAlign:'center',
        width:80,
    },
    text16:{
        backgroundColor:COLORS.Lime,
        color:COLORS.White,
        fontSize:20,
        borderWidth:1,
        textAlign:'center',
        width:200,
    },
    text17:{
        backgroundColor:COLORS.White,
        color:COLORS.Black,
        fontSize:14,
        borderWidth:1,
        textAlign:'center',
        width:200,
    },
    text18: {
        fontSize: 18,
        color:COLORS.BurningOrange,
        fontWeight:'bold',
    },
    text19:{
        fontSize:22,
        fontWeight:'bold',
        color:COLORS.White,
    },
    TxtFList:{
        textAlign:'center',
        fontSize:36,
        fontWeight:'bold',
    },

//Format Button//
    button: {
        alignItems: 'center',
    },
    button1:{
        height:height/8,
        width:width/3*2,
        backgroundColor:COLORS.Orange,
        borderWidth:2
    },
    button2:{
        height:height/8,
        width:width/2,
        backgroundColor:COLORS.LightBlue,
        borderWidth:2
    },
    button3:{
        height:height/15,
        width:width/4,
        backgroundColor:COLORS.Gray,
        borderWidth:2,
        borderRadius:20,
    },
    button4:{
        height:height/15,
        width:width/4,
        backgroundColor:COLORS.BurningOrange,
        borderWidth:2,
        borderColor:COLORS.White,
        borderRadius:20,
    },
    button5:{
        marginVertical:5,
        marginHorizontal:5,
        height:height/11+5,
        width:width/3+10,
        backgroundColor:COLORS.BurningOrange,
        borderWidth:2,
        borderColor:COLORS.Black,
    },
    buttonSave:{
        height:height/12,
        width:width/3,
        backgroundColor:COLORS.BurningOrange,
        borderWidth:2,
        borderColor:COLORS.White,
        borderRadius:20,
    },

    partCode:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal:10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#ccc',
    }, 

    button6:{
        marginVertical:5,
        marginHorizontal:5,
        height:height/14,
        width:width/2+10,
        backgroundColor:COLORS.LightBlue,
        borderWidth:2,
        borderColor:COLORS.Black,
        alignItems:'center'
    },
    btnFList:{
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        width:width/4*3,
        margin:2,
        borderWidth:2
    },

//Format Icon//
    icon:{
        left:15,
        width:50,
        justifyContent: 'center', 
        alignItems: 'center',
        
    },

//Format Image//
    Image:{
        width: 60, 
        height: 60,
        borderRadius:100,
        resizeMode:'contain' 
    },
//Format Loader//
    loader: {
        height: 70,
        backgroundColor: COLORS.White,
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        },
//Format Toast//
    toast:{ 
        height: 80, 
        width: '80%', 
        backgroundColor: COLORS.White,
        paddingHorizontal:10,
        borderLeftWidth:15,
        borderRadius:5,
        justifyContent:'center' 
    },
});

export default STYLES;