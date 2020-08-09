
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios'

import AsyncStorage from '@react-native-community/async-storage';


export default class FriendsProfile extends Component {

    constructor(props){
        super(props);
        this.state={
            userId:'',
            data:'',
            token:'',
            id:props.route.params.user_id,
            followingCount:0,
            followersCount:0
        }
    }


follow = async ()=>{


    
    
    axios.post('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id+'/follow', {},{
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.token,
        }
      }
     )
        .then(function (response) {
          
           this.getFollowersCount();
           alert('done') ;

          
  
        }.bind(this))
        .catch(function (error) {
          alert(error);
        });
}

unfollow = async ()=>{

    

      axios.delete('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id+'/follow',{
        headers: {
            'X-Authorization': this.state.token,
        }
      }
   )
      .then(function (response) {
        this.getFollowersCount(); 
        alert('done') ;
       }.bind(this))
      .catch(function (error) {
        alert(error);
      });
}

getFollowersCount= async ()=>{

   
  
        
        axios.get('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id+'/following')
        .then(function (response) {


            console.log("raw response"+response);
            console.log("following response"+response.data.length);
          this.setState({
              
              followingCount:response.data.length,
              

          })
          
          
        }.bind(this))
        
        .catch(function (error) {
          console.log(error);
        });

         
        axios.get('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id+'/followers')
        .then(function (response) {

            console.log("raw response"+response);
            console.log("followers length"+response.data.length);
          this.setState({
              
              followersCount:response.data.length,
              

          });
          
          
        }.bind(this))
        
        .catch(function (error) {
          console.log(error);
        });



    
}


 




getDetails = async ()=>{


    
    


    axios.get('http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id)
    .then(function (response) {
        console.log(response);


      this.setState({
          
          data: response.data,


      })
      
      
    }.bind(this))
    
    .catch(function (error) {
      console.log(error);
    });

}
    componentDidMount(){

        

      AsyncStorage.getItem('userToken').then((value) => {
          console.log("TOKEN AFTER LOGIN " +value)
        this.setState({ 'token': value });
        AsyncStorage.getItem('userId').then((value) => {
            console.log("USER ID AFTER LOGIN " +value)

            this.setState({userId:value})
         
          this.getDetails();
          this.getFollowersCount();


        
        
        });


       
      
                 }
        
                         );
        
    
    }

  render() {


    
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
            <Image source={{uri:'http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id+'/photo'}} style={styles.avatar}></Image>
                <Text style={styles.name}>
                  {this.state.data.given_name+' '+this.state.data.family_name}
                </Text>
            </View>
          </View>

          <View style={styles.profileDetail}>
            
            <View style={styles.detailContent}>
              <Text style={styles.title}>Followers</Text>
    <Text style={styles.count}>{this.state.followersCount}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Following</Text>
              <Text style={styles.count}>{this.state.followingCount}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.follow()}>
                <Text>Follow</Text>  
              </TouchableOpacity> 
              <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.unfollow()}>
                <Text>Unfollow</Text>  
              </TouchableOpacity> 
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "green",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:200,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    margin:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "green"
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:40
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "green",
  },
  description:{
    fontSize:20,
    color: "green",
    marginTop:10,
    textAlign: 'center'
  },
});
 