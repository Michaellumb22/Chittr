import React from 'react'
import {View,Stylesheet,Text} from 'react-native'
import { useBackHandler } from '@react-native-community/hooks'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Chitts from './Chitts'
import SearchScreen from './SearchScreen'
import FriendsScreen from './FriendsScreen'
import PostScreen from './PostScreen'
import ProfileScreen from './ProfileScreen'
import UpdateProfileScreen from './UpdateProfileScreen'
import FriendsProfile from './FriendsProfile'

import Icon from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator()


const ChittsStack = createStackNavigator()
const SearchStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const FriendsStack = createStackNavigator()
const PostStack = createStackNavigator()


function  ChittsStackScreen() {
    return (
        <ChittsStack.Navigator>
            <ChittsStack.Screen name='Chitts' component={Chitts} options={({ navigation, route }) => ({
                title: 'Chitts',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
                headerLeft: null,
                gestureEnabled: false
            })} />
          
            
        </ChittsStack.Navigator>
    )
}


function  SearchStackScreen() {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name='Search' component={SearchScreen} options={({ navigation, route }) => ({
                title: 'Search',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
                headerLeft: null,
                gestureEnabled: false
            })} />
          
            
        </SearchStack.Navigator>
    )
}


function  FriendsStackScreen() {
    return (
        <FriendsStack.Navigator>
            <FriendsStack.Screen name='Friends' component={FriendsScreen} options={({ navigation, route }) => ({
                title: 'Friends',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
                headerLeft: null,
                gestureEnabled: false
            })} />

<FriendsStack.Screen name='FriendsProfile' component={FriendsProfile} options={({ navigation, route }) => ({
                title: 'FriendsProfile',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
                headerLeft: null,
                gestureEnabled: false
            })} />

            
          
            
        </FriendsStack.Navigator>
    )
}


function  ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name='Profile' component={ProfileScreen} options={({ navigation, route }) => ({
                title: 'Profile',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
                headerLeft: null,
                gestureEnabled: false
            })} />
             <ProfileStack.Screen name='UpdateProfile' component={UpdateProfileScreen} options={({ navigation, route }) => ({
                title: 'UpdateProfile',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
                headerLeft: null,
                gestureEnabled: false
            })} />
          
            
        </ProfileStack.Navigator>
    )
}


function  PostStackScreen() {
    return (
        <PostStack.Navigator>
            <PostStack.Screen name='Post' component={PostScreen} options={({ navigation, route }) => ({
                title: 'Post',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
                headerLeft: null,
                gestureEnabled: false
            })} />

<PostStack.Screen name='Chitts' component={Chitts} options={({ navigation, route }) => ({
                title: 'Chitts',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'green' },
                headerLeft: null,
                gestureEnabled: false
            })} />
          
            
        </PostStack.Navigator>
    )
}





export default class HomeScreen extends React.Component {
    // disable the hardware back button
    render(){


    return (


        <Tab.Navigator
            
        >
            
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
            <Tab.Screen name="Post" component={PostStackScreen} />
            <Tab.Screen name="Friends" component={FriendsStackScreen} />
            <Tab.Screen name="Chitts" component={ChittsStackScreen} />

        </Tab.Navigator>

    )
        }
}


