/**
 * Created by zhoubao on 2017/6/23.
 */
/**
 * Created by zhoubao on 2017/6/23.
 */
import React, { Component ,PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import HelloComponent,{name ,age ,sum} from './HelloComponent'

export default class setup extends Component {
    constructor(props){
        super(props);
        /*设置默认传递属性
        * 设置默认属性的类类型
        * */

        /*
        为组件设置ref属性 ，用来便于从其他地方获取到改组件的引用。
         */
        this.states=({
            remove:false,
            result:'',
        })
    }

    static  defaultProps={
        name1:'小强',
        age1 :'10',
    }

    static propTypes={
        name1:PropTypes.string,
        age1:PropTypes.number,
    }

    render() {
        return (
            <View style={styles.container}>
                <HelloComponent
                    ref="refTest"
                    name={name}
                    age={age}
                    sum={sum(1 ,2)}
                />
                <Text>name1 is {this.props.name1} /n age1 is {this.props.age1} /nreftest is </Text>
                <Text
                    onPress={()=>{
                        var tmpName = this.refs['refTest'].name;
                        this.states.result=tmpName;
                    }}
                >获取refs中name{this.states.result}</Text>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1 ,
        backgroundColor:'#f5fcff',
    },
    welcome:{
        fontSize:20,
        textAlign:'center',
        margin:10,
    },
    instructions:{
        textAlign:'center',
        color:'#333333',
        marginBottom:5,
    },
})