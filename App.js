
import React, {useEffect} from 'react';

import { NavigationContainer} from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import * as SQLite from 'expo-sqlite'

// Components 
import Saved from './Components/Saved';
import RandomJoke from './Components/RandomJoke';
import CreateJoke from './Components/CreateJoke';
import SelectedJoke from "./Components/SelectedJoke"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  
  const db = SQLite.openDatabase('jokes.db')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists jokes (id integer primary key not null, joke text, category text, type text, imageid integer);');
    });
    console.log("Create database on Start")
  }, []);

  const TabNav = () => { return ( <Tab.Navigator
  
    screenOptions={{
      tabBarShowLabel:false,
      tabBarInactiveBackgroundColor:`whitesmoke`,
      tabBarActiveBackgroundColor:`#b8860b`,
      inactiveTintColor: "grey",
      headerStyle: {
        backgroundColor: `#b8860b`,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
  <Tab.Screen name="RandomJoke" component={RandomJoke}/>
  <Tab.Screen name="Your jokes" component={Saved} />
  <Tab.Screen name="Create" component={CreateJoke} />
  </Tab.Navigator>
  )
  }
 
  return (
    <NavigationContainer>
     
      <Stack.Navigator screenOptions={{
         
        headerStyle: {
          backgroundColor: `#b8860b`,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen
          name="tabNav"
          component={TabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Selected" component={SelectedJoke} />
      </Stack.Navigator>
    </NavigationContainer>
  )};





