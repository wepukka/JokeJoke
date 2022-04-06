import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet , Text} from 'react-native';

export default function TopBar () {
  return (
   <Appbar.Header style={styles.container}>
     <Text style={{color:"whitesmoke", fontSize:20}}>
       JokeJoke
     </Text>
    <Appbar.Action
     icon="menu"
     onPress={() => console.log("test")}
    />
  </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#9932cc",
    justifyContent:"space-around",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
