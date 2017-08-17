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
        borderColor: 'black' ,
        justifyContent:'center' ,
        alignItems:'center',

    },
    rect_inner: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: 'white' ,
        alignSelf:'center' ,

    },
});

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

            <GestureResponderView></GestureResponderView>
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
};
const MyNavigator= StackNavigator({
    Home:{screen:HomeView},
    SecondView:{screen:SecondView},
});
module.exports=MyNavigator;