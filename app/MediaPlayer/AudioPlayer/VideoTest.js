import React ,{Component} from 'react';
import {
	StyleSheet ,
	View ,
	Text ,
	TouchableOpacity ,
	AsyncStorage,

} from 'react-native'
import Video from  'react-native-video' ;
import {observable ,computed ,action ,} from 'mobx';
import {observer} from 'mobx-react/native'

const resizeModeName = {
	cover:Symbol.for('cover') ,
	contain:Symbol.for('contain') ,
	stretch:Symbol.for('stretch') ,
}
const styles = StyleSheet.create({
	container:{
		flex: 1 ,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
		// width:375 ,
	},
	fullScreen: {
		position: 'absolute',
		top: 0 ,
		left: 0 ,
		bottom: 0 ,
		right: 0 ,
		borderColor:'red' ,
		borderWidth:5.0 ,

	},

	controlPanl:{
		position:'absolute' ,
		left: 10 ,
		right: 10 ,
		bottom:70 ,
		alignContent:'center' ,
		alignItems:'center' ,
		justifyContent:'center' ,
		flex:1 ,
	} ,
	generalControl:{
		flexDirection:'row' ,
		justifyContent:'center' ,
		flex:1 ,
		alignSelf:'center' ,
	} ,
	pace:{
		height: 20,
		flexDirection:'row' ,
		alignItems:'center' ,
		justifyContent:'flex-start' ,
		flex: 1,
	},
	columnControl:{
		height: 20,
		flexDirection: 'row' ,
		alignItems:'center' ,
		justifyContent:'flex-start' ,
		flex:1 ,
	} ,
	progress:{
		flexDirection:'row' ,
		alignItems:'center' ,
		justifyContent:'center' ,
		flex:1 ,
	} ,
	resizeMode:{
		height: 20,
		flexDirection:'row' ,
		alignItems:'center' ,
		justifyContent:'flex-start' ,
		flex:1 ,
	},
	controlOptions:{
		flexDirection:'row' ,
		alignItems:'center' ,
		justifyContent:'center' ,
		flex:1 ,
		alignSelf:'center' ,
	} ,

	textButton :{
		fontSize:15 ,
		color:'white' ,
		fontWeight:'normal' ,
		alignSelf:'center',
	},
})



export default class VideoTest extends Component
{
	video:Video ;
	@observable
		pause = false ;
	@observable
		muted = false ;
	@observable
		repeat = true ;
	@observable
		resizeMode = resizeModeName.contain;
	@observable
		column = 1.0;
	@observable
		rate = 1.0 ;


	_onload = ()=>{
		console.log('视频加载完毕回调');
	}
	_onloadStart= ()=>{
		console.log('视频开始加载');
	}
	_onProgress=(pre)=>{
		// console.log('进度控制: '+ pre);
	}

	_onEnd = ()=>{
		console.log('视频播放完毕');
	}
	_onError = (err)=>{
		console.log('视频播放出现错误：'+ err) ;
	}

	_onAudioBecomingNoisy = ()=>{
		console.log('视频boceoming noisy');
	}

	_onAudioFocusChange = ()=>{
		console.log('视频focus change');
	}

	_pauseStatusChange= ()=>{
		this.pause = !this.pause;
	}

	constructor(props){
		super(props);
	}


	@observer
	async  _test (){
		let value;
		try {
			value = await AsyncStorage.getItem('store key');
			if (value != null)
			{
				console.log('value is ' +  value);
			}
			else{

				console.log('存储中无数据,初始化为空数据');

			}
		}catch (error){
			console.log('error is :' + error);
		}


	}
	render(){
		console.log('the local key-value is ' );

		this._test().done();

		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this._pauseStatusChange} style={styles.fullScreen}>
				<Video
					ref={(ref: Video) => { this.video = ref }}
					source={require('./testMV.mp4')}
					style={styles.fullScreen}
					rate={this.rate}
					paused={this.pause}
					volume={this.column}
					muted={this.muted}
					resizeMode={Symbol.keyFor(this.resizeMode)}
					onload={this._onload}
					onloadstart={this._onloadStart}
					onProgress={this._onProgress}
					onEnd={this._onEnd}
					onError={this._onError}
					onAudioBecomingNoisy={this._onAudioBecomingNoisy}
					onAudioFocusChanged={this._onAudioFocusChange}
					repeat={this.repeat}
				 />
				</TouchableOpacity>
				<View style={styles.controlPanl}>
					<View style={styles.generalControl}>
						<View style={styles.pace}>
							{this._paceButtonGenerator(0.5)}
							{this._paceButtonGenerator(1.0)}
							{this._paceButtonGenerator(1.5)}
						</View>
						<View style={styles.columnControl}>
							{this._columnButtonGenerator(0.5)}
							{this._columnButtonGenerator(1.0)}
							{this._columnButtonGenerator(1.5)}
						</View>
						<View style={styles.resizeMode}>
							{this._resizeModeButtonGenerator(resizeModeName.cover)}
							{this._resizeModeButtonGenerator(resizeModeName.contain)}
							{this._resizeModeButtonGenerator(resizeModeName.stretch)}
						</View>
					</View>
				</View>
			</View>
		)
	}

	_paceButtonGenerator(paraRate ){
		const isSelect = !(this.rate==paraRate);
		return (<TouchableOpacity onPress={()=>{
			isSelect?(this.rate=paraRate):null;
		}}>
			<Text style={[styles.textButton ,{fontWeight:isSelect?'normal':'bold'}]}>
				{paraRate}x
			</Text>
		</TouchableOpacity>);
	}
	_columnButtonGenerator(columnValue) {
		const isSelect = !(columnValue == this.column);
		return (<TouchableOpacity onPress={()=>{
			isSelect?(this.column=columnValue):null;
		}}>
			<Text style={[styles.textButton ,{fontWeight:isSelect?'normal':'bold'}]}>
				{columnValue}x
			</Text>
		</TouchableOpacity>)
	}

	_resizeModeButtonGenerator(modeName){
		const isSelect = !(Symbol.keyFor(modeName) == Symbol.keyFor(this.resizeMode));
		console.log(Symbol.keyFor(modeName));
		return (<TouchableOpacity onPress={()=>{
			isSelect?this.resizeMode=modeName:null;
		}}>
			<Text style={[styles.textButton ,{fontWeight:isSelect?'normal':'bold'}]}>{Symbol.keyFor(modeName)}</Text>
		</TouchableOpacity>)
	}
}