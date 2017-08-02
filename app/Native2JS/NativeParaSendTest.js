/**
 * Created by zhoubao on 2017/7/29.
 */
import React ,{Component} from 'react';
import {
	//native module
	NativeModules ,
	NativeEventEmitter ,
	//native component

	StyleSheet ,
	View ,
	TouchableOpacity ,
	Text ,

} from 'react-native';
import MapViewTest from './MapViewN2J';

const styles = StyleSheet.create({
	container:{
		alignItems:'center' ,
		alignContent:'center' ,
		top:20 ,
		left:10 ,
		right:10 ,
		bottom:65 ,
		backgroundColor:'#afa' ,
		borderColor:'gray' ,
		borderWidth: 2,
	} ,

	title:{
		fontSize:27 ,
		color:'black' ,
	} ,
	button:{
		color:'red' ,
		fontSize:25 ,
	},
	map :{
		width:300 ,
		height:300 ,
		borderColor:'red' ,
		borderWidth:2.5 ,
	}

})

var native_module = NativeModules.TestManager;
var native_module_event = NativeModules.EventEmitterManager;
var eventEmitter_module  = new NativeEventEmitter(native_module_event);

export default  class NativeModuleTest extends Component{
	//方法类型的变量可以在class中进行定义 ，而一般的let var 命令却不能声明变量。？
	/*native=>javascript*/
	/*
	* 测试addEvent方法
	* */
	testFun1 = ()=>{
		native_module.addEvent("this is a test name" ,{location:'longhua' ,property:1 });

	}
	/*
	*  测试block 参数
	* */
	testFunc2 = ()=>{
		native_module.addBlockEvent((err ,events)=>{
			if(err){
				console.log("the err is reachable :" + err.message);
			}
			else {
				console.log('the events is as follow : '+ events);
			}
		})

	}
	/*
	* 测试promise类型的参数传递
	* */
	testFunc3 = async()=>{

		try {
			var events = await native_module.addPromiseFun();
			console.log('the await result event is ' + events+',the test exported constant is '+ native_module.testExportedConstant);
		}catch (e){
			console.log('the error occur :' + e);
		}
	}
	/*
	*  测试通过eventEmitter来进行事件的发送
	* */
	testFunc4 = ()=>{
	//	通过订阅def方式来进行特定方法的消息传递
		var subscribe = eventEmitter_module.addListener('subscrib_func',(testDic)=>{
			console.log('the testDic  is ' + testDic.testKey );
		}) ;
	//	由于采取的订阅方式因此需要在组件或者其他时候对listener进行取消订阅的操作。
	// 	subscribe.remove();
	}
	/*javascript=>native*/

	/*
	* 本地组件转化为js
	* */
	testNativeComponent = () =>{
		let {mapShow} = this.state;
		this.setState({
			mapShow:!mapShow ,
		})
	}

	constructor(props){
		super(props);
		this.state = {
			showMap:false ,
		}
	}
	render(){
		return <View style={styles.container}>
			<Text style={styles.title}>测试demo ，进行native与javaScript之间的通信</Text>
			<TouchableOpacity onPress={this.testFun1}>
				<Text style={styles.button}>点击测试addEvent方法</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={this.testFunc2}>
				<Text style={styles.button}>点击测试addEvent方法_block</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={this.testFunc3}>
				<Text style={styles.button}>点击测试addEvent方法_promise</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={this.testFunc4}>
				<Text style={styles.button}>点击测试eventEmitter方法</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={this.testNativeComponent}>
				<Text style={styles.button}>点击测试本地组件转化js组件</Text>
			</TouchableOpacity>
			{this._mapView()}
		</View>;
	}
	_mapView = ()=>{
		let {mapShow} = this.state;
		if (mapShow){
			return <MapViewTest style={styles.map}></MapViewTest>
		}
		return null;
	}


}