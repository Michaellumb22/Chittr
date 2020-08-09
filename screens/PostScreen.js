import React from 'react'
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,Image,TextInput,Permission,PermissionsAndroid} from 'react-native'

import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


export default class PostScreen extends React.Component{

    constructor(props){
        super(props)

        this.state={
            id:'',
            token:'',
            image:'',
            content:'',
        }
    }

    post= async ()=>{

        let time = new Date();
        let inLong = time.getTime();

        axios.post('http://10.0.2.2:3333/api/v0.0.5/chits', {
            chit_id: 0,
            timestamp: inLong,
            chit_content: this.state.content.trim(),
            location:{ latitude:0,longitude:0},
            user:{
                user_id:0,
                given_name:"",
                family_name:"",
                email:""
            }
          },{
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.token,
            }
          }
        )
           .then(function (response) {
               console.log("RESPONSEEEE"+response.data.chit_id);

 
             if(this.state.image){
 
              this.sendImage(response.data.chit_id);


   
             }
             else{
               this.props.navigation.navigate('Chitts');
 
             }
 
 
     
           }.bind(this))
           .catch(function (error) {
             console.log('error'+error);
           });
 



    }

    /*
    sendImage(id){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/'+id+'/photo',{
            method :'POST',
            headers:{
              'X-Authorization':this.state.token,
              'Content-Type':'image/jpeg'
            },
            body: this.state.image
          })
          .then((response)=>{
            console.log("image posted");
            this.props.navigation.navigate('Chitts');
    
          })
          .catch(function (error) {
            console.log('error'+error);
          });
     
    }

    */

    sendImage(id){
        axios.post('http://10.0.2.2:3333/api/v0.0.5/chits/'+id+'/photo', this.state.image,{
            headers: {
                'Content-Type': 'image/jpeg',
                'X-Authorization': this.state.token,
            }
          }
        )
           .then(function (response) {
               console.log("RESPONSEEEE"+response.data.chit_id);


 
 
     
           }.bind(this))
           .catch(function (error) {
             console.log('error'+error);
           });
 
    }

    uploadImage = async () => {

        const options = {
          title: 'Choose Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          
          
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            this.setState({
              image: response,
            });

            console.log("SUCESSFULLLL");
          }
        });
      };



    componentDidMount(){

     
            
    
                
                PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                  {
                    title: ' Camera Permission',
                    message:
                      'Need to access your camera ' ,
                      
                    buttonNeutral: 'Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  },
                );
                
              
        

        AsyncStorage.getItem('userToken').then((value) => {
            console.log("TOKEN AFTER LOGIN " +value)
          this.setState({ 'token': value });
          AsyncStorage.getItem('userId').then((value) => {
              console.log("USER ID AFTER LOGIN " +value)
  
            this.setState({ 'id': value },);
  
          
  
          
          
          });
  
  
         
        
                   }
          
                           );
          

    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>

               

            
                    <TouchableOpacity  style ={ {paddingLeft:310}}onPress={()=>this.post()}>

                        <Text >Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={{uri:'http://10.0.2.2:3333/api/v0.0.5/user/'+this.state.id+'/photo'}} style={styles.avatar}></Image>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={6}
                        style={{ flex: 1 }}
                        placeholder="Write your post here ?"
                        onChangeText={content => this.setState({ content })}
                        value={this.state.content}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.photo} onPress={()=>this.uploadImage()}>
                    <Text>Choose an Image</Text>
                </TouchableOpacity>
                </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32
    }
   
  
});