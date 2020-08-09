import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import axios from 'axios'
import moment from 'moment'
export default class Chitts extends Component {

  constructor(props) {
    super(props);
    this.state = {
        chitts:[],
      
    };
  }

  componentDidMount(){

   

        axios.get('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count=20')
          .then(function (response) {
    
            this.setState({
    
              chitts: response.data
    
            })
    
    
          }.bind(this))
    
          .catch(function (error) {
            console.log(error);
          });
    
    
    
    
      
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.state.chitts}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
               
               <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.chit_content}</Text>
                    <Text style={styles.time}>{moment(item.timestamp).fromNow()}</Text>
                    <Image style={styles.cardImage} source={{uri:'http://10.0.2.2:3333/api/v0.0.5/chits/'+ item.chit_id+'/photo'}}/>

                  </View>
                </View>

              
                
              </View>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:'green'
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"green",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:25,
    height:25,
  },
  
});  