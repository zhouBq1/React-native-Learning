import React ,{Component} from 'react';
import {
    AppRegistry ,
    View ,
    Animated ,
    StyleSheet ,
    Button ,
    LayoutAnimation ,
    TouchableOpacity ,
    NativeModules ,


} from 'react-native';

// const  {UIManager } = NativeModules ;
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

var styles= StyleSheet.create({
    container:{
        justifyContent:'center' ,
        alignContent:'center',
        // flex:1,
        backgroundColor:'green' ,
        // width:300 ,
        // height:300 ,
    } ,
    animated:{
        backgroundColor:'red' ,
        width:200 ,
        height:200 ,
        alignSelf:'center' ,

    }
});


class AnimatedView extends Component{
    constructor(props){
        super(props);
        this.state={
            fadeAnim:new  Animated.Value(0.2) ,//设置初始动画属性值为0
            originWidth:new Animated.Value(100) ,
            height: new Animated.Value(0) ,
            twirl: new Animated.Value(0) ,

            containerWidthPl:1,
            containerHEightPl:1 ,
            containerWidth:300 ,
            containerHeight:300 ,

        }
    }

    componentDidMount() {
        console.log('this is the component did mount function');
        Animated.sequence([
            Animated.timing(this.state.height, {
                toValue:200 ,
                duration: 500 ,
            } )
            ,
            Animated.parallel([
                Animated.timing(this.state.fadeAnim,{//随时间变化的动画  动画中变化的值
                    toValue:1 ,//动画变化量最终的值
                    duration:2000 ,
                    // useNativeDriver: true,//添加了这一句之后，该控件使用原生动画进行展示，因此该组件下的所有动画都需要支持元生动化，而layout属性不支持原生动画，会失败，
                }),//动画开始执行
                Animated.spring(this.state.originWidth,{
                    toValue:300 ,
                    duration:2000,
                })
            ]),
            Animated.timing( this.state.twirl, {
                toValue:1 ,
                duration:1500 ,
            })
            ])
        .start();
    }
    _onPress=()=>{

        this.setState({
            containerWidthPl:this.state.containerWidth<375&&(this.state.containerWidthPl==1)|| this.state.containerWidth <100? 1:-1,
            containerHEightPl:this.state.containerHeight<667&&(this.state.containerHEightPl==1)||this.state.containerHeight <100?1:-1,
            containerWidth:this.state.containerWidth+(this.state.containerWidthPl)*20,
            containerHeight:this.state.containerHeight+(this.state.containerHEightPl)*20,
        });
        LayoutAnimation.spring();
        console.log('the containerWidth is' + this.state.containerWidth + ' ,height is '+ this.state.containerHeight);
    };
    _onLongPress=()=>{
        console.log('do the long press');
    };
    render(){
        return (
            <TouchableOpacity onPress={this._onPress} onLongPress={this._onLongPress} onPressIn={()=>{console.log('press in at date:'+Date.now(
                ))}} onPressOut = {()=>{console.log('press out at date:'+Date.now())}}>
            <View style={[styles.container ,{width:this.state.containerWidth ,height:this.state.containerHeight}]}>
                    <Animated.View style={{
                        width:this.state.width , height:this.state.height, backgroundColor:'red' ,opacity:this.state.fadeAnim ,
                        transform:[{
                            rotateZ:this.state.twirl.interpolate({
                                inputRange :[0 ,1] ,
                                outputRange: ['0deg' ,'360deg'],
                            })

                         }]
                    }}>{this.props.children}</Animated.View>
            </View>
            </TouchableOpacity>
                )
    }
}

module.exports = AnimatedView;