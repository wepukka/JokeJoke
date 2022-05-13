
import React, {useEffect} from 'react';
import Ionicons from "@expo/vector-icons/Ionicons"
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import * as SQLite from 'expo-sqlite'

// Components 

import JokePage from './Components/Pages/JokePage';
import CreateJokePage from './Components/Pages/CreateJokePage';
import SelectedJoke from "./Components/Pages/SelectedJoke"
import SavedPage from './Components/Pages/SavedPage';

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
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'RandomJoke') {
          iconName = focused
            ? 'happy'
            : 'happy-outline';
        } if (route.name === 'Saved') {
          iconName = focused ? 'save' : 'save-outline';
        }
        if (route.name === 'Create') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
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
    })}
  >
  <Tab.Screen name="RandomJoke" component={JokePage}/>
  <Tab.Screen name="Saved" component={SavedPage} />
  <Tab.Screen name="Create" component={CreateJokePage} />
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





