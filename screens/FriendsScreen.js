import React from 'react'
import {View,FlatList} from 'react-native'

import axios from 'axios'
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem,Left,Right,Body,Thumbnail } from 'native-base';



export default class FriendsScreen extends React.Component{


  constructor(props) {
    super(props);

    this.state = {
      data:[],
      searchQuery:''
      
    };




  }

  componentDidMount(){
    this.searchForFriends('');
  }


  searchForFriends =  (searchQuery)=>{
    axios.get('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+searchQuery)
        .then(function (response) {

          this.setState({
              
              data: response.data,

          })
          
          
        }.bind(this))
        
        .catch(function (error) {
          console.log(error);
        });
  }


  renderFunction =  ({item,index})=>{
return(
<ListItem avatar onPress={()=> this.props.navigation.navigate('FriendsProfile',{
              user_id:item.user_id
              
            }
          
            )}>
  <Left>
    <Thumbnail source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+item.user_id+''+'/photo?'+ new Date() }} />
  </Left>
  <Body>
    <Text>{item.given_name}</Text>
        <Text note>{item.family_name}</Text>
  </Body>

  
  
</ListItem>
);
  }
    render(){
        return(
            <Container >
            <Header searchBar rounded style={{backgroundColor:'green'}}>
              <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" onChangeText={text => this.searchForFriends(text)}/>
                <Icon name="ios-people" />
              </Item>
              <Button transparent onPress={text => this.searchForFriends(text)}>
                <Text>Search</Text>
              </Button>
            </Header>
            <List>

            <FlatList
              data={this.state.data}
              renderItem = {this.renderFunction}
              keyExtractor = {(item,i)=>i.toString()}/>



        </List>
          </Container>
        )
    }
}