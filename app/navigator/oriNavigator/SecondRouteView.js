/**
 * Created by zhoubao on 2017/7/5.
 */
import React ,{Component} from  'react';
import {
    View ,
    TouchableOpacity ,
    StyleSheet ,

} from  'react-native' ;
import {Navigator} from 'react-native-deprecated-custom-components';

let styles = StyleSheet.create({
    container:{
        width:375 ,
        height:667 ,
        backgroundColor:'#000' ,
        alignItems:'center' ,
        alignContent:'center' ,
    },
    button:{
        backgroundColor:'#4f33aa' ,
        width :260 ,
        height:180 ,
        borderColor:'#000' ,
        borderWidth:2.0 ,
    }
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
            <TouchableOpacity
                style={styles.button}
                onPress={this._navigatorBack.bind(this)}
            />
        </View>;
    }
}