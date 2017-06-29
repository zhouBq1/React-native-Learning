/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React ,{Component} from "react"
import {
  AppRegistry,
} from 'react-native';
import setup from './setup';
import FlexBoxTest from  './FlexBoxTest';
import SimpleNavigator from './NavigatorTest';
import SimpleAppReactNavigation from './StackNavigationTest';
import GestureResponderView from './StackNavigationSelfTest'

/**
 * Created by YiBing on 2017/5/4.
 */

// import React from 'react';
// import {
//     AppRegistry,
//     Text,
//     Button,
//     View,
// } from 'react-native';
//
// import { StackNavigator } from 'react-navigation';
// import { TabNavigator } from "react-navigation";
//
// class ChatScreen extends React.Component {
//     // Nav options can be defined as a function of the screen's props:
//     static navigationOptions = ({ navigation }) => ({
//         title: `Chat with ${navigation.state.params.user}`,
//     });
//     render() {
//         // The screen's current route is passed in to `props.navigation.state`:
//         const { params } = this.props.navigation.state;
//         return (
//             <View>
//               <Text>Chat with {params.user}</Text>
//             </View>
//         );
//     }
// }
//
// class RecentChatsScreen extends React.Component {
//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <View>
//               <Text>List of recent chats</Text>
//               <Button
//                   onPress={() => navigate('Chat', {user: 'Lucy'})} //Passing params
//                   title="Chat with Lucy"
//               />
//             </View>
//         );
//     }
// }
//
// class AllContactsScreen extends React.Component {
//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <View>
//               <Text>List of all contacts</Text>
//               <Button
//                   onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
//                   title="Chat with Jane"
//               />
//             </View>
//         );
//     }
// }
//
// const MainScreenNavigator = TabNavigator({
//     Recent: { screen: RecentChatsScreen },
//     All: { screen: AllContactsScreen },
// });
//
// MainScreenNavigator.navigationOptions = {
//     title: 'My Chats',
// };
//
// const SimpleAppReactNavigation = StackNavigator({
//     Home: { screen: MainScreenNavigator },
//     Chat: { screen: ChatScreen },
// });


//组件的导出与使用 ，
/*
组件导出的 方式
 1 es6 : export default class YourClass extents YourSuperClass{}
 2 es5 : 定义var 或const变量 ,module.exports=YourVar,
 使用导出变量时候，需要使用module.exports方式。否则，不能正常使用compomnent，
 */
AppRegistry.registerComponent('untitled2', () => GestureResponderView);
