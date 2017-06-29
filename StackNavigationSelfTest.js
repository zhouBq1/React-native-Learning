import React ,{Component} from 'react';
import {
    AppRegistry ,
    Button ,
    View ,
    Text ,
    Image ,
    TouchableHighlight ,
    StyleSheet ,

} from 'react-native';
import {
    StackNavigator ,
} from 'react-navigation';

var  styles=StyleSheet.create({
    touchStyle:{
        backgroundColor:'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rect: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'black'
    }
})

class MyButton extends React.Component{
    _onPressButton(){
        console.log('did press the button');
    }
    _onLongPressButton(){
        console.log('did long press the button');
    }
    render(){
        return (<TouchableHighlight
            onPress={this._onPressButton()}
            onLongPress={this._onLongPressButton()}
        >
            <Text>Button</Text>
        </TouchableHighlight>)
    }

}

class GestureResponderView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bg:'gray',
        }
    }
    //挂载组件开始
    componentWillMount(){
        this._gestureHandlers={
            //s是否激活responder
            onStartShouldSetResponder:()=>true ,
        //
            onMoveShouldSetPanResponder:()=> true,
        //    responder 被激活
            onResponderGrant:()=>{
                console.log('the grant function');
                // this.states.bg='red';
                this.setState({
                    bg:'red',
                });
            },
            onResponderMove:()=>{
                console.log(123);
            },
            onResponderRelease:()=>{
                console.log('do the release function');
                // this.states.bg= 'green';
                this.setState({
                bg:'green',
            });
            },
        }
    }
    render(){
        console.log(`current color is ${this.state.bg}`);
        return <View style={styles.container}>
            <View
            {...this._gestureHandlers}
            style={
                [styles.rect ,{backgroundColor:this.state.bg}]
            }
        ></View>
        </View>
    }
}

class  HomeView extends React.Component{

    _longClick(){
        console.log('this is the long press action ,+++++');
    }
    render(){
        const { navigate } = this.props.navigation;
        return (<View>
            <Button
                title='this is the first View ,press to next + '
                onPress={() => navigate('SecondView', {index: '1'})} //Passing params
                onLongPress={()=>{
                    console.log('this is the long press action');
                }}
            />
            <Image
                source={{uri:'reflectImg' ,}}
                style={{width:400 ,height:400 ,alignItems:'center' ,alignSelf:'center'}}

            />

            <TouchableHighlight
                activeOpacity ={0.8}
                underlayColor='#eee'
                onLongPress={this._longClick.bind(this)}
                style={styles.touchStyle}>
                <Text>长按事件</Text>
            </TouchableHighlight>
        </View>)
    };
}

class SecondView extends React.Component{
    static navigationOptions=({navigation}) => ({
       title:`this is view index ->${navigation.state.params.index}`
    });
    render(){
        const { navigate } = this.props.navigation;
        return (<View>
            <Button title="this is the second View ,press to previous"
                    onPress={() => navigate('Home', {index: '2'})}
            />
            <Image
                source={
                {
                    uri:'https://facebook.github.io/react/img/logo_og.png',
                    method:'post' ,
                    body:'your body goes here' ,
                    header:{
                        Pragma:'no-chche' ,
                    } ,
                    cache:'only-if-cached',
                }
    }
                style={{width: 400, height: 400}}
            />
        </View>)
    }
}

HomeView.navigationOptions = {
    title:`view with index -> 0`,
    header:<Text>
        this is the header
    </Text>,
    headerTitle:'headerTitleStringOrElement',
    headerBackTitle:'go back title' ,
    headerTruncatedBackTitle:'headerBackTitle ',
    headerRight:<Text>rightElement</Text> ,
    headerLeft:<Text>left element</Text> ,
    // headerStyle:
    // headerTitleStyle:
    headerTintColor:'red',
    gesturesEnabled:true,
}
const MyNavigator= StackNavigator({
    Home:{screen:HomeView},
    SecondView:{screen:SecondView},
});
module.exports=GestureResponderView;