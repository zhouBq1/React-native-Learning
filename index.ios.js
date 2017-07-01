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
//布局
import FlexBoxTest from  './FlexBoxTest';
//导航栏
import SimpleNavigator from './NavigatorTest';
import SimpleAppReactNavigation from './StackNavigationTest';
import MyNavigator from './StackNavigationSelfTest';
// 手势系统
import PanGestureTestView from './PanGestureTestView';
import GestureResponderView from './GestureTestView';
import ScaleScrollView from './PanGestureTestView'

//动画
import AnimatedView from './AnimatedViewTest'

AppRegistry.registerComponent('untitled2', () => AnimatedView);
