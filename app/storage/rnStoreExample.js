import React ,{Component} from 'react'
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
const RN_STORAGE_KEY = 'rn storage key';
const RN_STORAGE_VALUES = ['value1' ,'value2' ,'value3' ,'value4' ,'value5'];
export default class rnStoreExample extends Component {
	constructor(props){
		super(props);
		this.state={

			currentValue: RN_STORAGE_VALUES[1] ,
			currentMessage:'no message for rn storage ,waitting to start' ,
		};
	}

	componentWillMount() {
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					react-native-storage 使用实例
				</Text>
				<PickerIOS
					itemStyle={{fontSize: 25, color: 'red', textAlign: 'center', fontWeight: 'bold'}}
					selectedValue={this.state.currentValue}
					onValueChange={(selectedValue ,selectedIndex)=> {
						// this.setState({currentValue,selectedIndex});
						this._storeActionAdd(RN_STORAGE_KEY ,selectedValue);
						console.log('select current value and index is :' + selectedValue + '===' + selectedIndex);
					}}>

					{
						RN_STORAGE_VALUES.map((value) =>{
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
		this._storeActionRemove(RN_STORAGE_KEY);
	}
	//store action
	//add
	_storeActionAdd= (itemKey ,itemValue)=>{

		rnStorage._save(itemKey ,itemValue)
			.then(()=>{
				rnStorage._load(itemKey ,(ret) =>{
					console.log('ret parameter is ' + ret);
					this.setState({
						currentMessage:'now set the key-value pair succeed : '+ itemKey +'=='+ret ,
						currentValue:itemValue
					})
				})
		});
			//这里如果使用AsyncStore.getItem会没有将current设置成功。是否因为这个操作是异步执行？导致结果不能及时获取到，
	}
	//remove
	_storeActionRemove=(itemKey)=>{
		rnStorage._remove(itemKey).then(()=>{
			this.setState({
				currentMessage:'now remove the key-value pair succeed :' + itemKey +'and set the selected value at 0',
				currentValue: RN_STORAGE_VALUES[0] ,
			});
		});
	}
	//get
	_storeActionGet= async(itemKey)=>{

		let tmpValue = await rnStorage._load(itemKey ,(ret) =>{
			console.log('ret para is ' + ret);
		}).then(()=>{
			this.setState({
				currentMessage:'now get the key-value pair succeed :' + itemKey +'==' + tmpValue ,
			});
		});
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