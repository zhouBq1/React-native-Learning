import React ,{Component} from 'react';
import {
    AppRegistry ,
    View,
    StyleSheet ,
    Button ,
    TouchableOpacity ,



} from 'react-native';
/*
* react-native 实现了和浏览器一致的定时器设置。
* #
 setTimeout, clearTimeout
 setInterval, clearInterval
 setImmediate, clearImmediate;
 requestAnimationFrame, cancelAnimationFrame
* */

var styles=StyleSheet.create({
   container:{
       width:300 ,
       height:300 ,
       alignContent:'center' ,
       alignItems:'center' ,
       backgroundColor:'gray',
   } ,
    view:{
        width :200 ,
        height:200 ,
        backgroundColor:'green' ,
        marginTop:5 ,

    } ,
   button:{
       width : 80 ,
       height: 45 ,
       // textAlign:'center' ,
       backgroundColor:'cyan' ,
       marginTop:5 ,
   }
});

var timerID = 0;

class TimerTest extends Component
{
    constructor(){
        super();
        this.state={
            currentDate: 1 ,
            currentIndex: 0 ,

        }
    }
    _timeoutAction=()=>{
        var now = new Date();
        console.log('this is the timeout action :'+this.state.currentDate + ' at date: '+now.getTime());
        // this._clearTimer(timerID);
    }
    _buttonAction=()=>{
        var now = new Date();
        console.log('this is the button action :'+ this.state.currentDate +' at date: '+ now.getTime());
        this.state.currentDate += 1;
        // var intervalID = setInterval(this._timeoutAction ,2000);
        timerID = setTimeout(this._timeoutAction ,1000);
    }
    _clearTimer=(timerId) =>{
        timerId != 0 ? clearTimeout(timerId):{};
    }

    render(){
        return <View style={styles.container}>
            <View style={styles.view}></View>
            <TouchableOpacity activeOpacity={0.6} onPress={this._buttonAction} style={styles.button}>

            </TouchableOpacity>
        </View>
    }

    componentWillUnmount() {
       this._clearTimer(timerID);
    }
}
module.exports=TimerTest;

