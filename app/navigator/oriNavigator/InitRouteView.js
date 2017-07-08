/**
 * Created by zhoubao on 2017/7/5.
 */
import React ,{Component} from  'react';
import {observable,action} from  'mobx'
import {observer} from 'mobx-react/native'
import {
    View ,
    TouchableOpacity ,
    StyleSheet ,
    Text ,
    TextInput ,
} from  'react-native' ;
import {Navigator} from 'react-native-deprecated-custom-components';
import  SecondView from './SecondRouteView';

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
        justifyContent:'center' ,
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
        height:45 ,

    } ,
    add:{
        color:'#156e9a' ,
        fontSize :26 ,
        padding:20 ,
        textAlign:'center' ,
        flex:1 ,
    } ,
    space:{
        backgroundColor:'white' ,
    },
    remove:{
        color:'gray' ,
        fontSize:26 ,
        padding:20 ,
        textAlign:'center' ,
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

    constructor(props)
    {
        super(props) ;
        this.state={
            inputFolded:false ,
            text:'' ,
        }
    }

    _navigatorNext()
    {
        console.log('do the navigation push action');
        this.props.navigator.push({
            component:SecondView ,
            passProps:{
                store:this.props.store ,
            }
        });
    }

    @action
    _addListItemAction = ()=> {
        let {inputFolded} = this.state;
        inputFolded = !inputFolded;
        // this.props.store.addListItem1(this.state.text);
        this.state.text.length && this.props.store.addListItem1(this.state.text);
        this.setState({inputFolded:inputFolded});
        this.state.text = '';
    }

    _textChange(newText){
        this.state.text=newText;
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
                    <View style={styles.listItem}>
                        <Text style={styles.add}>`*${li.name}`</Text>
                    </View>
                })}
            </View>
            <Text style={styles.addListItem} onPress={this._addListItemAction.bind(this)}>add a new list item</Text>
             {/*<AddList/>*/}
            {this.state.inputFolded&&<TextInput style={styles.textInput} placeholder={'add the list name here'} autoCorrect={true} onChangeText={(text)=>{
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
    // return (list.map((li ,index)=>{
    //     <View style={styles.listItem}>
    //         <Text style={styles.add}>`*${li.name}`</Text>
    //     </View>
    // }))
}

// function addListItemAction() {
//      let {inputFolded} = this.state;
//      inputFolded = !inputFolded;
//      this.setState({inputFolded:inputFolded})
//
//     console.warn(`current the isAddNewFolded is ${isAddNewFolded}` );
// }
// const AddList = ()=>{
//
//     return (  <Text style={styles.addListItem} onPress={addListItemAction.bind(this)}>add a new list item</Text>)
// }
const InputListName = ()=>{
    return (<TextInput style={styles.textInput} placeholder={'add the list name here'} autoCorrect={true}/>)
}