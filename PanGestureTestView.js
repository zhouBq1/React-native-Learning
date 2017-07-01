/**
 * Created by zhoubao on 2017/6/30.
 */
import React ,{Component} from  'react';
import {
    AppRegistry ,
    StyleSheet ,
    View ,
    PanResponder ,
    ScrollView ,
} from  'react-native' ;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rect:{
        width:200,
        height:200,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#223344',
        alignSelf:'flex-end',
    }
});

class  ScaleScrollView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<ScrollView style={styles.container}
            maximumZoomScale={2.0}
    minimumZoomScale={0.5}
        >
            <View style={styles.rect}></View>
        </ScrollView>)
    }
}

export default class PanGestureTestView extends Component{
    constructor(props){
        super(props);
        this.state={
            //一些自定义的状态值
            left:0 ,
            top :0 ,
            bg:'gray' ,
        }
    }

    componentDidMount(){};

    componentWillMount(){
        //组件即将挂载
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder:()=>true ,
            onMoveShouldSetPanResponder:()=>true ,
            onPanResponderGrant:()=>{
                this._top = this.state.top ;
                this._left = this.state.left ;
                this.setState({bg:'red'}) ;
            } ,
            onPanResponderMove: (evt,gs)=>{
                // console.log(gs.dx+' '+gs.dy)
                console.log(`current location is x:${evt.locationX} ,y:${evt.locationY}`);
                this.setState({
                    top: this._top+gs.dy,
                    left: this._left+gs.dx
                })
            },
            onPanResponderRelease:(evt ,gs) =>  {
                this.setState({
                    bg:'white' ,
                    top:this._top+gs.dy ,
                    left:this._left+gs.dx
                })
            } ,

        });
        this._panResponder2 = {
            onStartShouldSetResponder:()=> true ,
            onMoveShouldSetResponder:()=> {console.log('responder2 --- move should set respnder no'); return false;} ,
            onResponderGrant:()=>{
                console.log('responder grant');
                this.setState({bg:'red'});
            },
            onResponderRelease:()=>{
                console.log('responder release');
              this.setState({bg:'gray'});
            } ,
            onResponderMove:(evt)=>{
                console.log(`sss x:${evt.locationX} ,y:${evt.locationY}`) ;

            }
        }
    }

    render(){

        return (<View style={styles.container}>
            <View
                {...this._panResponder.panHandlers}
                {...this._panResponder2}
                style={
                    [styles.rect ,{'top':this.state.top ,'left':this.state.left ,backgroundColor:this.state.bg}]}
            ></View>
        </View>)
    }
}

module.exports = ScaleScrollView;
