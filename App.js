

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen'
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      loggedIn:null

    }
  }


componentDidMount(){

  //this.setState({loggedIn: AsyncStorage.getItem('userToken')});
}


render(){

  const Stack = createStackNavigator();

let isLoggedIn = AsyncStorage.getItem('userToken');

console.log(isLoggedIn)

return(
  <NavigationContainer>
<Stack.Navigator>
 
      <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ header: () => null }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => null }} />

    
  
</Stack.Navigator>
</NavigationContainer>
)




}
}

