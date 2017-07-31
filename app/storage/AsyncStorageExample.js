/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React ,{Component } from 'react'
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	PickerIOS,
	AsyncStorage ,
	TouchableOpacity,

} from 'react-native';




var PickerItemIOS = PickerIOS.Item;
var COURSE_ITEMS=['C++','Java','Android','iOS','React Native','Swift','.Net'];
const STORE_KEY = 'store key'
export default class PickerIOSDemo extends Component {
	constructor(props){
		super(props);
		this.state={
			// selectedCourse:'Java',
			// selectedIndex:1,
			currentValue: COURSE_ITEMS[1] ,
			currentMessage:'no message ,waitting to start' ,
		};
	}

	render() {

		return (

			<View style={styles.container}>
				<Text style={styles.welcome}>
				 asyncStorage 使用实例
				</Text>
				<PickerIOS
				itemStyle={{fontSize: 25, color: 'red', textAlign: 'center', fontWeight: 'bold'}}
				selectedValue={this.state.currentValue}
				onValueChange={(selectedValue ,selectedIndex)=> {
					// this.setState({currentValue,selectedIndex});
					this._storeActionAdd(STORE_KEY ,selectedValue);
					console.log('select current value and index is :' + selectedValue + '===' + selectedIndex);
				}}>

				{
					COURSE_ITEMS.map((value) =>{
						return <PickerItemIOS key={value} value={value} label={value}/>
					})
				}

				</PickerIOS>
				<TouchableOpacity onPress={this._removePressAction}>
					<Text style={styles.removeText}>
						remove the stored value {this.state.currentValue} from local
					</Text>
				</TouchableOpacity>
				<Text style={styles.resultText}>
					{this.state.currentMessage}
				</Text>
			</View>
		);
	}
	//compomnent actions
	_removePressAction=()=>{
		this._storeActionRemove(STORE_KEY);
	}
	//store action
	//add
	_storeActionAdd= (itemKey ,itemValue)=>{
		AsyncStorage.setItem(itemKey ,itemValue ,(error ,result)=>{
			this.setState({
				currentMessage:'now set the key-value pair succeed : '+ itemKey +'=='+AsyncStorage.getItem(itemKey) ,
				//这里如果使用AsyncStore.getItem会没有将current设置成功。是否因为这个操作是异步执行？导致结果不能及时获取到，
				currentValue:itemValue
			});
			console.log('set error and result :' + error+', '+result) ;
		});
	}
	//remove
	_storeActionRemove=async(itemKey)=>{
		AsyncStorage.removeItem(itemKey , (error ,resutl)=>{
			this.setState({
				currentMessage:'now remove the key-value pair succeed :' + itemKey ,
				currentValue: ''
			});
			console.log('remove the item with eror and result :' + error+ ' ,'+ resutl);
		} )
	}
	//get
	 _storeActionGet= async (itemKey)=>{
		let tmpValue = await AsyncStorage.getItem(itemKey ,(error ,result) => {

		}).done(this.setState({
			currentMessage:'now get the key-value pair succeed :' + itemKey +'==' + tmpValue ,
		}));

		return tmpValue;
	}


}

const styles = StyleSheet.create({
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		marginTop: 20,
	},
	container:{
		flex :1 ,
		top: 0 ,
		right:0 ,
		bottom: 0 ,
		left: 0,
		marginTop:30 ,
	} ,

	removeText:{
		borderTopColor: 'gray',
		borderTopWidth: 5.0 ,
		marginTop:20 ,
		color:'red' ,
		fontSize:20 ,
	} ,
	resultText:{
		borderWidth: 2.0 ,
		borderColor:'gray' ,
		backgroundColor:'cyan' ,
		fontSize:25 ,
		color:'green' ,
	}
});
