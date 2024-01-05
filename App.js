import React from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import MainScreen from "./Screens/MainScreen";
// import LoginScreens from './Screens/LoginScreens';
// import HomeScreens from "./Screens/HomeScreens";
// import Outgoing from "./Screens/OutgoingScreens";
// import Incoming from "./Screens/IncomingScreens";
// import Lend from "./Screens/LendScreens";
// import Return from "./Screens/ReturnScreens";
// import Inventory from "./Screens/InventoryScreens";
// import Machine from "./Screens/CheckingScreens";
// import PMScan from "./Screens/PMMachineScreens";
// import PMIssue from"./Screens/PMIssueScreens";
// import History from "./Screens/HistoryScreens";
// import InventoryWh from "./Screens/InventoryWhScreens";
// import InventoryWh2 from "./Screens/InventoryWhScreens2";
// import IncomingWh from "./Screens/IncomingWhScreens";
// import OutgoingWh from "./Screens/OutgoingWhScreens";
// import OutgoingMove from "./Screens/OutgoingMove";

// Call Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle = "dark-content" backgroundColor = "#fff" animated = {true}/>
      <Stack.Navigator screenOptions={{ header:()=>null}}>
        <Stack.Screen name="MainScreen" component={MainScreen}/>
        {/* <Stack.Screen name="LoginScreens" component={LoginScreens}/>
        <Stack.Screen name="HomeScreens" component={HomeScreens}/>
        <Stack.Screen name="Outgoing" component={Outgoing}/>
        <Stack.Screen name="Incoming" component={Incoming}/>
        <Stack.Screen name="Lend" component={Lend}/>
        <Stack.Screen name="Return" component={Return}/>
        <Stack.Screen name="Inventory" component={Inventory}/>
        <Stack.Screen name="IncomingWh" component={IncomingWh}/>
        <Stack.Screen name="OutgoingWh" component={OutgoingWh}/>
        <Stack.Screen name="OutgoingMove" component={OutgoingMove}/>
        <Stack.Screen name="InventoryWh" component={InventoryWh}/>
        <Stack.Screen name="InventoryWh2" component={InventoryWh2}/>
        <Stack.Screen name="Machine" component={Machine}/>
        <Stack.Screen name="PM Scan" component={PMScan}/>
        <Stack.Screen name="PM Issue" component={PMIssue}/>
        <Stack.Screen name="History" component={History}/> */}
      </Stack.Navigator>
  </NavigationContainer>
  );
}

