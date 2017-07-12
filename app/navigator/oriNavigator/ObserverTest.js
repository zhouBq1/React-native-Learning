/**
 * Created by zhoubao on 2017/7/10.
 */
import React from 'react';
import {
    Text ,
    View ,
    Button ,
} from  'react-native' ;
import { observable, useStrict, action, computed } from 'mobx';
import { observer } from 'mobx-react';

class MyState {
    @observable num1 = 0;
    @observable num2 = 100;

    @action addNum1 = () => {
        this.num1 ++;
    };
    @action addNum2 = () => {
        this.num2 ++;
    };
    @computed get total() {
        return this.num1 + this.num2;
    }
}

const newState = new MyState();

const AllNum = observer((props) => <Text>num1 + num2 = {props.store.total}</Text>);

const Main = observer((props) => (
    <View>
        <Text>num1 = {props.store.num1}</Text>
        <Text>num2 = {props.store.num2}</Text>
        <View>
            <button onClick={props.store.addNum1}>num1 + 1</button>
            <button onClick={props.store.addNum2}>num2 + 1</button>
        </View>
    </View>
));

@observer
export default class App extends React.Component {

    render() {
        return (
            <View>
                <Main store={newState} />
                <AllNum store={newState} />
            </View>
        );
    }
}