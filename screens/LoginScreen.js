import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import axios from 'axios'

import AsyncStorage from '@react-native-community/async-storage';


export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    state = {
      email:'' ,
      password: ''
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  register = ()=>{
    this.props.navigation.navigate('SignUp');
  }

  login =()=>{


    const saveDetails = async (token,id) => {
      try {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userId', id.toString());

        console.log("Login Token"+token);
        console.log('User Id'+id);

      } catch (error) {
        console.log(error.message);
      }
    };

   

    axios.post('http://10.0.2.2:3333/api/v0.0.5/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(function (response) {

     saveDetails(response.data.token,response.data.id)
      
     this.props.navigation.navigate('Home');




    }.bind(this))
    .catch(function (error) {
      alert("INCORRECT ENTRY, Please try again");
    });
  
  
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.login()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.register()}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "green",
  },
  loginText: {
    color: 'white',
  }
});
 