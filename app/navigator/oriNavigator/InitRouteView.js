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
import  SecondView from './SecondRouteView';
import DataManagerCls from './DataStoreClass';

let styles = StyleSheet.create({
    container:{
        width:375 ,
        height:667 ,
        backgroundColor:'gray' ,
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
        console.log('do the navigation push action');
        this.props.navigator.push({
            component:SecondView ,
            passProps:{
                store:DataManagerCls ,
            }
        });
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