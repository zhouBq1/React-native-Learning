/**
 * Created by zhoubao on 2017/7/5.
 */
import React ,{Component} from "react"
import TodoList from './App';
import ListStore from './mobxTest';
//由于navigator已经弃用 ，重新使用需要作为组件导入。
import {
    Navigator ,
} from  'react-native-deprecated-custom-components';

class ReactNativeMobX extends Component {
    renderScene (route, navigator) {
        return <route.component {...route.passProps} navigator={navigator} />
    }
    configureScene (route, routeStack) {
        if (route.type === 'Modal') {
            return Navigator.SceneConfigs.FloatFromBottom
        }
        return Navigator.SceneConfigs.PushFromRight
    }
    render () {
        return (
            <Navigator
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                initialRoute={{
                    component: TodoList,
                    passProps: {
                        store: ListStore
                    }
                }} />
        )
    }
}
export default ReactNativeMobX;