import React ,{Component} from 'react';
import {Navigator} from 'react-native-deprecated-custom-components';
import DataManagerCls from './DataStoreClass';
import ToDoList from './ToDoList';
import FristRouteView from './InitRouteView' ;
import {
    View ,
} from  'react-native';

class NavigatorOriginTest extends Component
{
    constructor(props){
        super(props);
    }

    //导航栏方法
    renderScene (route , navigator ){
        return <route.component {...route.passProps} navigator={navigator}/>;
    }

    configureScene = (route , routeStack)=>{
        if(route.type == 'Modal')
        {
            return Navigator.SceneConfigs.FloatFromRight;
        }
        return Navigator.SceneConfigs.FloatFromBottom;
    };

    render(){
        return <Navigator
            renderScene={this.renderScene.bind(this)}
            configureScene={this.configureScene.bind(this)}
            initialRoute={
                {
                    component:FristRouteView ,
                    passProps: {
                        store: ToDoList ,
                    },
                }
            }

        />
    }

}

export default NavigatorOriginTest;