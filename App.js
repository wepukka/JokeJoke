
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, Button } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';

import Saved from './Components/Saved';
import RandomJoke from './Components/RandomJoke';
import TopBar from './Components/AppBar';
import CreateJoke from './Components/CreateJoke';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
    initialRouteName='Random'
    screenOptions={{
      tabBarInactiveBackgroundColor:"#e6e6fa",
      header: TopBar 
    }}>
    <Tab.Screen name="Random" component={RandomJoke} />
    <Tab.Screen name="Saved" component={Saved} />
    <Tab.Screen name="Create" component={CreateJoke} />
    </Tab.Navigator>
  </NavigationContainer>
  ) };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "whitesmoke",
      alignItems: "center",
      justifyContent: "center",
    },
    bottom: {
      position: 'absolute',
      justifyContent:"space-around",
      left: 0,
      right: 0,
      bottom: 0,
    },})



