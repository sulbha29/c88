
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loginscreen from './screens/loginscreen';
import {AppTabNavigator} from './components/apptabnavigator'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
export default function App() {
  return (
    <View style={styles.container}>
      <Appcontainer/>
    </View>
  );
}
const switchNavigator= createSwitchNavigator({
  Loginscreen:{screen:Loginscreen},
  bottomtab:{screen:AppTabNavigator}
})
const Appcontainer = createAppContainer(switchNavigator)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
