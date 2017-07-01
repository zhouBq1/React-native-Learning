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
import MyNavigator from './StackNavigationSelfTest';
import PanGestureTestView from './PanGestureTestView';
import GestureResponderView from './GestureTestView';



AppRegistry.registerComponent('untitled2', () => PanGestureTestView);
