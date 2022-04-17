
import React from 'react';
import { StyleSheet, Text, } from 'react-native';
import { NavigationContainer, TabActions, } from '@react-navigation/native';

import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { Appbar } from 'react-native-paper';
import Saved from './Components/Saved';
import RandomJoke from './Components/RandomJoke';
import CreateJoke from './Components/CreateJoke';
import CheckBoxes from './Components/CheckBoxes';

const Tab = createBottomTabNavigator();

export default function App() {

const topBar = ({route}) => { 
  return(
  <Appbar.Header style={styles.appBar}>
     <Text style={{color:"whitesmoke", fontSize:20}}>
      {route.name}
     </Text>
    <Appbar.Action
    />
  </Appbar.Header>
  )}

  return (
    <NavigationContainer>
    <Tab.Navigator
    initialRouteName='RandomJoke'
    screenOptions={{
      tabBarInactiveBackgroundColor:"#e6e6fa",
      header: topBar
    }}>
    <Tab.Screen name="RandomJoke" component={RandomJoke} />
    <Tab.Screen name="Your jokes" component={Saved} />
    <Tab.Screen name="New Joke" component={CreateJoke} />
   
    </Tab.Navigator>
  </NavigationContainer>
  )};

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
    },
    appBar: {
      backgroundColor:"#9932cc",
      alignSelf:"center"
    },
    sheetContainer: {
      flex: 1,
      backgroundColor: "whitesmoke",
      alignItems: "center",
      justifyContent: "center",
    },
  
  })



