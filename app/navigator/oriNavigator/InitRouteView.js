/**
 * Created by zhoubao on 2017/7/5.
 */
import React ,{Component} from  'react';
import {observable,action} from  'mobx';
import {observer} from 'mobx-react/native'
import {
    View ,
    TouchableOpacity ,
    StyleSheet ,
    Text ,
    TextInput ,
    Alert ,
    Button ,
} from  'react-native' ;
import {Navigator} from 'react-native-deprecated-custom-components';
import  VideoView from './SecondRouteView';
import StoreView from '../../storage/AsyncStorageExample';
import rnStoreExample from  '../../storage/rnStoreExample';
import RNStorage from '../../storage/RNStorage' ;
import SoundTest from '../../MediaPlayer/SoundPlayer/SoundTest';
import NativeParaSendTest from '../../Native2JS/NativeParaSendTest'


let styles = StyleSheet.create({
    container:{
        marginTop:20 ,
        width:375 ,
        height:647 ,
        backgroundColor:'white' ,
        alignItems:'center' ,
        alignContent:'center' ,
    },
    button:{
        backgroundColor:'#4f33aa' ,
        width :260 ,
        height:180 ,
        borderColor:'#000' ,
        borderWidth:2.0 ,
    } ,
    header:{
        height: 50 ,
    } ,
    headerText:{
        color:'#156e9a' ,
        textAlign:'center' ,
        fontSize: 20 ,
        height:60 ,
        paddingTop:26 ,
        flex:1 ,
    },

    listContainer:{
        width:375 ,
        borderTopColor:'#156e9a',
        borderBottomColor:'#156e9a' ,
        borderWidth:StyleSheet.hairlineWidth,
        backgroundColor:'white',
        alignItems:'center' ,
        // justifyContent:'center' ,
        flex:1 ,
    } ,
    noList:{
        alignSelf:'center' ,
        marginTop:50 ,
        color:'#156e9a' ,
        fontSize: 24 ,
    } ,

    listItem:{
        borderBottomWidth:StyleSheet.hairlineWidth ,
        borderBottomColor:'#968e9a' ,
        backgroundColor: 'white' ,
        flexDirection:'row' ,
        justifyContent: 'center' ,
        // height:45 ,

    } ,
    add:{
        color:'#156e9a' ,
        fontSize :26 ,
        padding:15 ,
        // height: 44 ,
        textAlign:'left' ,
        flex: 2,
        flexWrap:'wrap' ,
        alignSelf:'center' ,
    } ,
    space:{
        backgroundColor:'white' ,
    },
    remove:{
        color:'gray' ,
        fontSize:22 ,
        padding:15 ,
        // height: 44,
        textAlign:'right' ,
        flex:1 ,
        alignSelf:'center' ,
    } ,

    addListItem:{
        textAlign:'center' ,
        color:'#156e9a' ,
        height: 50 ,
        padding:15 ,
    } ,
    textInput:{
        backgroundColor:'#dcd9c5' ,
        height: 50 ,
        padding: 15 ,
    }
});


//显示底部输入框状态：是否折叠
@observer
export default class FirstView extends Component{

    //需要观察的对象位于组件之内： （注意不能再render方法中对观察对象进行更改，），能正常触发componentWillReact，
    //需要观察的对象位于组件外 ，同样
    //之前一直没有出现结果，在于 list.map函数没有将View作为返回值return ，而是将View作为了函数中的方法进行执行，没有返回内容。
    @observable
    testValue = 1 ;

    constructor(props)
    {
        super(props) ;
        this.state={
            inputFolded:false ,
            text:'' ,
        }
    }

    @action
    _addListItemAction = ()=> {
        this.testValue = this.testValue + 1;
        let {inputFolded} = this.state;
        inputFolded = !inputFolded;
        // this.props.store.addListItem1(this.state.text);
        this.state.text.length && this.props.store.addListItem1(this.state.text);
        this.setState({inputFolded:inputFolded});
        this.state.text = '';
    }

    @action
    _removeListItem = (rmListI)=>{
        Alert.alert('remove title' ,'ready to remove ?' ,[{text:'yes(to remove!)' ,onPress:()=>{this.props.store.removeListItem(rmListI)} } ,{text:'no(not to remove)' ,onPress:onpress=()=>{}}],null ,'login-password');
    }


    _navigatorNext = (indx)=>
    {
        console.log('do the navigation push action');
        let nextPage =  null;
        global.rnStorage = null;
        console.log('the rnStorage is ' + RNStorage);
	    RNStorage._getStorage();
	    rnStorage = RNStorage ;
        switch (indx){
            case 0:
                nextPage = VideoView;
                break;
            case 1:
                nextPage = StoreView;
                break;
            case 2:
                nextPage  = rnStoreExample ;
                break;
            case 3:
                nextPage = SoundTest;
                break;
            case 4:
                nextPage = NativeParaSendTest;
                break ;
            default:
                console.warn('input index is wrong');
                break;
        }
        this.props.navigator.push({
            component:nextPage ,
            passProps:{
                store:this.props.store ,
            }
        });
    }

    _textChange(newText){
        this.state.text=newText;
    }

    componentWillReact(){
        console.log('component will react' + this.testValue);
    }
    componentDidMount() {
        console.log('the component did mount');
    }

    render (){

        const {store} = this.props;
        const {list} = this.props.store;
        //从store中获取到list属性。
        return(<View style={styles.container}>
            <View style={styles.header}>
                <HeaderText />
            </View>
            <View style={styles.listContainer}>
                {list.length <= 0?<NoList/>:list.map((li ,index)=>{
                    console.log('item index :' + index + ' ---li : '+ li );
                   return <View key ={index} style={styles.listItem}>
                        <Text style={styles.add} onPress={this._navigatorNext.bind(this ,index)}>*{li.name}</Text>
                       <Text style={styles.remove} onPress={this._removeListItem.bind(this,li)}>REMOVE</Text>
                    </View>
                })}
            </View>
            <Text style={styles.addListItem} onPress={this._addListItemAction.bind(this)}>add a new list item {this.testValue}</Text>
             {/*<AddList/>*/}
            {this.state.inputFolded&&<TextInput style={styles.textInput} placeholder={'add the list name here'} autoCorrect={false} onChangeText={(text)=>{
                this._textChange(text);
            }
            }/>}
        </View>);
    }
}

const HeaderText = ()=>{
    return <Text style={styles.headerText}>My List App</Text>;
}

const NoList = () => {
    return <Text style={styles.noList}>No List ,Add List To Get Started</Text>
}

const ListItem = () => {
    let {list} = this.props.store;
}

const InputListName = ()=>{
    return (<TextInput style={styles.textInput} placeholder={'add the list name here'} autoCorrect={true}/>)
}