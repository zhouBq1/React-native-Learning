/**
 * Created by zhoubao on 2017/7/5.
 */
import React ,{Component} from  'react';
import VideoTest from '../../MediaPlayer/AudioPlayer/VideoTest'
import {
    View ,
    TouchableOpacity ,
    StyleSheet ,

} from  'react-native' ;
import {Navigator} from 'react-native-deprecated-custom-components';
import Video from "react-native-video";

let styles = StyleSheet.create({
    container:{
        flex:1 ,
        backgroundColor:'black' ,
        // alignItems:'center' ,
        // alignContent:'center' ,
        //这里不能设置alignContent ，否则，子组件的款第不能梓摄影，导致不能铺满整个屏幕，可以在子组件中重新设置alignContent来解决。
    },
})


export default class FirstView extends Component{
    _navigatorBack()
    {
        //方法的执行需要添加括号 ，而在onPress等的属性定义时候不需要进行函数的显式调用，只需传递方法对象进去，会自动进行调用。
        this.props.navigator.pop();
        console.log('do the navigation pop action');
    }
    render (){
        return <View style={styles.container}>
            <VideoTest />

        </View>;
    }
}