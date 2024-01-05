import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IncomingScreen from './IncomingScreen';
import OutgoingScreen from './OutgoingScreen';
import SearchScreen from './SearchScreen';


const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Incoming"
        component={IncomingScreen}
        options={{
          tabBarLabel: 'Incoming',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Outgoing"
        component={OutgoingScreen}
        options={{
          tabBarLabel: 'Outgoing',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
}
