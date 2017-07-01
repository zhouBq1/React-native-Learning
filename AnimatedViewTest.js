import React ,{Component} from 'react';
import {
    AppRegistry ,
    View ,
    Animated ,
    StyleSheet ,

} from 'react-native';

var styles= StyleSheet.create({
    container:{
        justifyContent:'center' ,
        alignContent:'center',
        // flex:1,
        backgroundColor:'green' ,
        width:300 ,
        height:300 ,
    } ,
    animated:{
        backgroundColor:'red' ,
        width:200 ,
        height:200 ,
        alignSelf:'center' ,

    }
})


class AnimatedView extends Component{
    constructor(props){
        super(props);
        this.state={
            fadeAnim:new  Animated.Value(0) ,//设置初始动画属性值为0
            originWidth:new Animated.Value(0) ,
        }
    }

    componentDidMount() {
        console.log('this is the component did mount function');
        Animated.timing(this.state.fadeAnim,{//随时间变化的动画  动画中变化的值
            toValue:1 ,//动画变化量最终的值
            duration:3000 ,

        }).start();//动画开始执行
        Animated.spring(this.state.originWidth,{
            toValue:300 ,
            duration:3000,
        }).start();
    }

    render(){
        return (
            <View style={styles.container}>
            <Animated.View style={{
                width:this.state.originWidth , height:200, backgroundColor:'red' ,
                  }}>{this.props.children}</Animated.View>
            </View>
                )
    }
}

module.exports = AnimatedView;