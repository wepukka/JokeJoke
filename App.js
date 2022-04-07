
import React,  {useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { Appbar } from 'react-native-paper';
import Saved from './Components/Saved';
import RandomJoke from './Components/RandomJoke';
import CreateJoke from './Components/CreateJoke';

const Tab = createBottomTabNavigator();

export default function App() {

const bottomSheet = useRef();

const sheet= () => { 

  return(
  <Appbar.Header style={styles.appBar}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600} >
        <View style= {styles.sheetContainer}>
          <Text>
            asd
          </Text>
        </View>
      </BottomSheet>
     <Text style={{color:"whitesmoke", fontSize:20}}>
       JokeJoke
     </Text>
    <Appbar.Action
     icon="menu"
     onPress={() => bottomSheet.current.show()}
    />
  </Appbar.Header>
  )}

  return (
    <NavigationContainer>
    <Tab.Navigator
    initialRouteName='RandomJoke'
    screenOptions={{
      tabBarInactiveBackgroundColor:"#e6e6fa",
      header: sheet
    }}>
    <Tab.Screen name="RandomJoke" component={RandomJoke} />
    <Tab.Screen name="Saved" component={Saved} />
    <Tab.Screen name="Create" component={CreateJoke} />
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
      justifyContent:"space-around",
      left: 0,
      right: 0,
      bottom: 0,
    },
    sheetContainer: {
      flex: 1,
      backgroundColor: "whitesmoke",
      alignItems: "center",
      justifyContent: "center",
    },
  
  })



