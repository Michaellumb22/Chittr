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
import axios from'axios'
import AsyncStorage from '@react-native-community/async-storage';

export default class UpdateProfileScreen extends Component {

  constructor(props) {
    super(props);
    state = {
      firstName: '',
      lastName:'',
      email   : '',
      password:''
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  componentDidMount(){

         
    AsyncStorage.getItem('userToken').then((value) => {
        console.log("TOKEN AFTER LOGIN " +value)
      this.setState({ 'token': value });
      AsyncStorage.getItem('userId').then((value) => {
          console.log("USER ID AFTER LOGIN " +value)

        this.setState({ 'id': value },);

       
        this.getDetails();


      
      
      });


     
    
               }
      
                       );
      
  
  }

  getDetails(){
    axios.get('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id)
    .then(function (response) {
        console.log(response);

      this.setState({
        firstName: response.data.given_name,
        lastName:response.data.last_name,
        email   : response.data.email,
          

      })
      
      
    }.bind(this))
    
    .catch(function (error) {
    });
  }

  onUpdateProfile =()=>{
    const { firstName, lastName, email,password} = this.state;
      axios.patch('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id, {
        given_name: firstName,
        family_name: lastName,
        email:email,
        password:password
      },{
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.token
        }
      })
      .then(function (response) {
       

        this.props.navigation.navigate('Login');
        

      }.bind(this))
      .catch(function (error) {
        Alert.alert("Failure Updating Please try again");
      });
  }

  render() {


    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Change First Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(firstName) => this.setState({firstName})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Change Last Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(lastName) => this.setState({lastName})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder=" Change Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
      
        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onUpdateProfile()}>
          <Text style={styles.signUpText}>Update</Text>
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
    backgroundColor: '#d1e231',
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
  signupButton: {
    backgroundColor: "green",
  },
  signUpText: {
    color: 'white',
  }
});
 