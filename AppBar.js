import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const MyComponent = () => (
  <NavigationContainer>
 <Appbar style={styles.bottom}>
   <Appbar.Action
     icon="archive"
     onPress={() => console.log('Random Joke')}
    />
    <Appbar.Action icon="mail" onPress={() => console.log('Create Joke')} />
    <Appbar.Action icon="label" onPress={() => console.log('Saved jokes')} />
  </Appbar>
  </NavigationContainer>
 
 );

export default MyComponent

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    justifyContent:"space-around",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
