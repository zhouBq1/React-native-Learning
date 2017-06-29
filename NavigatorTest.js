
/**
 * Created by zhoubao on 2017/6/28.
 */
import React ,{Component} from 'react';
import {
    AppRegistry ,
    View ,
    Navigator ,

} from 'react-native';


export default class  SimpleNavigator extends Component{
    render(){
        return <Navigator
            style={{flex:1}}
            initialRoute={{Component:firstPage}}
            configureScene={this.configureScene}
            renderScene={this.renderScene}
        />;
    }
    /**
     * 配置场景动画
     * @param route 路由
     * @param routeStack 路由栈
     * @returns {*} 动画
     */
    configureScene(route, routeStack) {
        if (route.type == 'Bottom') {
            return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
        }
        return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
    }/**
 * 使用动态页面加载
 * @param route 路由
 * @param navigator 导航器
 * @returns {XML} 页面
 */
renderScene(route, navigator) {
    return <route.component navigator={navigator}  {...route.passProps} />;
}
}



// 第一页. 使用Component可以自动生成注释, 符合标准
class FirstPage extends Component {

    // ...
    /**
     * 给Navigator传递参数.
     * @param name 参数
     * @private
     */
    _navigate(name, type = 'Normal')
    {
        this.props.navigator.push({
            component: SecondPage,
            passProps: {
                name: name
            },
            type: type
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headText}>
                        {'第一页'}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this._navigate('你好! (来源第一页:右出)')}>
                    <Text style={styles.buttonText}>
                        {'跳转至第二页(右出)'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this._navigate('你好! (来源第一页:底出)', 'Bottom')}>
                    <Text style={styles.buttonText}>
                        {'跳转至第二页(底部)'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// 第二页, 点击跳出返回第一页
class SecondPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headText}>
                        第二页: {this.props.name}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.props.navigator.pop()}>
                    <Text style={styles.buttonText}>
                        返回上一页
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}