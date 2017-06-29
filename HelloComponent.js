
/**
 * Created by zhoubao on 2017/6/24.
 */
import React ,{Component} from 'react';
import {
    StyleSheet,
    Text ,
    View ,
} from 'react-native';

//导出变量 ，常量
var name='小明';
var age ='22';
export {name ,age};

//导出方法
export function sum(a, b) {
    return a+b;
}

/*
es6方式生成组件
 */
export default class HelloComponent extends Component{
    constructor(props){
        super(props);
        console.log('constructor方法执行');
    }


    render(){
        return (<Text style={{fontSize:20 ,backgroundColor:'red' ,marginTop:50}}>hello+++{this.props.name} /nage is {this.props.age}  /nsum is {this.props.sum}</Text>);
    };
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
}

/*
es5方式生成组件
 */
// var HelloComponent = React.createClass({
//     render(){
//         return (<Text style={{fontSize:20 ,backgroundColor:'red' ,marginTop:50}}>hello</Text>);
//     }
// });
// module.exports=HelloComponent;

/*
函数式方式生成组件
无状态 ，不能使用this
 */
// function HelloComponent(props) {
//     return <Text style={{fontSize:20 ,backgroundColor:'red' ,marginTop:50}}>hello .{props.name}</Text>;
// }
// module.exports= HelloComponent;