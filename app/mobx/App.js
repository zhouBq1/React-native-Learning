/**
 * Created by zhoubao on 2017/7/5.
 */
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import {action ,} from  'mobx'
import {observer} from 'mobx-react/native';
import NewItem from './NewItem';

import Icon from 'react-native-vector-icons/FontAwesome';
//不使用setState时候，如果去除observer则试图停止更新 ，
@observer
class TodoList extends Component {
    constructor () {
        super();
        this.state = {
            text: '',
            showInput: false
        }
    }
    @action
    toggleInput () {
         this.setState({ showInput: !this.state.showInput });
        // this.state.showInput = !this.state.showInput;
        console.warn(this.state.showInput);
    }
    @action
    addListItem () {
        this.props.store.addListItem(this.state.text);
        // this.setState({
        //     text: '',
        //     showInput: !this.state.showInput
        // })
        this.state.text='';
        this.state.showInput = !this.state.showInput;
        console.warn(this.props.store.listCount());
    }
    @action
    removeListItem (item) {
        this.props.store.removeListItem(item)
    }
    @action
    updateText (text) {
        //this.setState({text})
        this.state.text=text;
        console.warn(this.state.text);
    }
    @action
    addItemToList (item) {
        this.props.navigator.push({
            component: NewItem,
            type: 'Modal',
            passProps: {
                item,
                store: this.props.store
            }
        })
    }
    render() {
        const { showInput } = this.state;
        const { list } = this.props.store;
        return (
            <View style={{flex:1}}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>My List App</Text>
                </View>
                {!list.length ? <NoList /> : null}
                <View style={{flex:1}}>
                    {list.map((l, i) => {
                                return <View key={i} style={styles.itemContainer}>
                                <Text
                                    style={styles.item}
                                    onPress={this.addItemToList.bind(this, l)}>{l.name.toUpperCase()}</Text>
                                <Text
                                style={styles.deleteItem}
                                onPress={this.removeListItem.bind(this, l)}>Remove</Text>
                        </View>
                    })}
                </View>
                <TouchableHighlight
                    underlayColor='transparent'
                    onPress={
                        this.state.text === '' ? this.toggleInput.bind(this)
                            : this.addListItem.bind(this, this.state.text)
                    }
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        {this.state.text === '' && '+ New List'}
                        {this.state.text !== '' && '+ Add New List Item'}
                    </Text>
                </TouchableHighlight>
                {showInput && <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.updateText(text)} />}
            </View>
        );
    }
}

const NoList = () => (
    <View style={styles.noList}>
        <Icon name="window-close" size={30} color="#900" />
        <Text style={styles.noListText}>No List, Add List To Get Started</Text>
    </View>
);

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        flexDirection: 'row'
    },
    item: {
        color: '#156e9a',
        fontSize: 18,
        flex: 3,
        padding: 20
    },
    deleteItem: {
        flex: 1,
        padding: 20,
        color: '#a3a3a3',
        fontWeight: 'bold',
        marginTop: 3
    },
    button: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#156e9a'
    },
    buttonText: {
        color: '#156e9a',
        fontWeight: 'bold'
    },
    heading: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#156e9a'
    },
    headingText: {
        color: '#156e9a',
        fontWeight: 'bold'
    },
    input: {
        height: 70,
        backgroundColor: '#f2f2f2',
        padding: 20,
        color: '#156e9a'
    },
    icon:{
        height : 45 ,
        width : 45 ,
        alignSelf:'center' ,

    } ,
    noList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noListText: {
        fontSize: 22,
        color: '#156e9a'
    },
});

export default TodoList