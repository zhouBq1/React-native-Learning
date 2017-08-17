import React ,{Component} from 'react';
import {
    AppRegistry ,
    Button ,
    View ,
    Text ,
    Image ,
    TouchableHighlight ,
    StyleSheet ,

} from 'react-native';

var  styles=StyleSheet.create({
    touchStyle:{
        backgroundColor:'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rect: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'black' ,
        justifyContent:'center' ,
        alignItems:'center',

    },
    rect_inner: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: 'white' ,
        alignSelf:'center' ,

    },
});

export default class GestureResponderView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bg:'gray',
        }
    }
    //挂载组件开始
    componentWillMount(){
        this._gestureHandlers={
            //s是否激活responder
            onStartShouldSetResponder:()=>true ,
        //
            onMoveShouldSetResponder:()=> true,
        //    responder 被激活
            onResponderGrant:()=>{
                console.log('the grant function');
                // this.states.bg='red';
                this.setState({
                    bg:'red',
                    bg2:'gray',
                });
            },
            onResponderMove:(evt)=>{
                console.log(`current lcoation is x:${evt.locationX} ,y:${evt.locationY}`);
                this.setState({
                    bg:'yellow' ,
                })
            },
            onResponderRelease:()=>{
                console.log('do the release function');
                // this.states.bg= 'green';
                this.setState({
                bg:'blue',
            });
            },
            onResponderTerminationRequest:()=>{
                console.log('do the terminate function');
            },
            onResponderReject:()=>{
                console.log('do the reject function');
            },

        };
        this._gestureHandlers2 = {
            onStartShouldSetResponder:() =>true ,
            onMoveShouldSetPanResponder:() =>true ,
            onResponderTerminationRequest:() =>true ,
            onResponderGrant:()=>{
                console.log('children onResponder grant');
                this.setState({
                    bg2:'cyan' ,
                })
            } ,
            onResponderMove:()=>{
                console.log('children on Responder Move');
            } ,
            onResponderRelease:()=>{
                console.log('children on Responder Release');
                this.setState({
                    bg2:'green' ,
                })
            }
        }
    }
    render(){
        console.log(`current color is ${this.state.bg}`);
        return <View style={styles.container}>
            <View
            {...this._gestureHandlers}
            style={
                [styles.rect ,{backgroundColor:this.state.bg}]
            }>
                <View
                    {...this._gestureHandlers2}
                    style={[styles.rect_inner ,{backgroundColor:this.state.bg2}]}
                ></View>
            </View>
        </View>
    }
}

