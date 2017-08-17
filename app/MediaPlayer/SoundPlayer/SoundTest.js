/**
 * Created by zhoubao on 2017/7/19.
 */
import React ,{Component} from 'react' ;
import {
	View ,
	StyleSheet ,
	ProgressViewIOS ,
	Text ,
	Image ,
	TouchableOpacity ,
	Animated ,
	Easing ,

} from  'react-native' ;
import Sound from 'react-native-sound';

const lyric = 'this is a lyric \nthis is two lyric \n this is three lyric \nthis is four lyric \nthis is five lyric \n';
var musicList= ['WilliamJoseph-Radioactive.mp3' ,'testMP3.mp3'];
var	musicIndex = 0 ;
const  styles = StyleSheet.create({
	container:{
		alignItems: 'center' ,
		justifyContent:'center' ,
		backgroundColor:'green' ,
		top: 0 ,
		left: 0 ,
		bottom: 0 ,
		right: 0 ,
		//这里需要使用绝对定位，否则子组件会自动进行适配，而不是依据预想的比例进行分配，
		position:'absolute',
		flexDirection:'column' ,
	},

	cdPan:{
		flex:4 ,
		alignItems:'center' ,
		justifyContent:'center' ,
		backgroundColor:'gray' ,
		margin : 5 ,
	} ,
	musicImage:{
		width:260 ,
		height: 260 ,
		borderRadius:130 ,
		borderColor:'blue' ,
		borderWidth: 1.5 ,
	},
	lyricContainer:{
		backgroundColor:'white' ,
		width: 260 ,
		height: 260 ,
		padding: 20 ,
		alignItems:'center' ,
	} ,
	lyricText:{
		color:'black' ,
		fontSize:20 ,
	},

	ctrContainer:{
		padding: 10 ,
		flex:1 ,
		flexDirection:'row' ,
		alignItems:'center' ,
		justifyContent:'flex-start' ,
		backgroundColor:'white' ,
		borderWidth: 1.0 ,
		borderColor:'red' ,

	} ,
	ctrItemContainer:{
		alignItems:'center' ,
		justifyContent:'center' ,
		padding:5 ,
		flex:1 ,
		borderRightWidth:2.0 ,
		borderColor:'gray' ,

	} ,
	musicCtrBtn:{
		padding:5 ,
		backgroundColor:'transparent' ,
		fontSize:16 ,
	},
	columnCtr:{
		padding :15 ,
		backgroundColor:'transparent' ,
		flex:5 ,
	} ,

	musicList:{
		backgroundColor:'white' ,
		margin:20 ,
		borderColor:'red' ,
		borderWidth: 1.0 ,
		alignItems:'center' ,
		// justifyContent:'center' ,
		flex:5,
	},
	listItemContainer:{
		flexDirection:'row' ,
		justifyContent:'center' ,
		alignItems:'center' ,
		height:45 ,
		borderWidth : 2.0 ,
		borderColor:'red' ,
	},
	listItemtext:{
		alignSelf:'center' ,
		fontSize:20 ,

	} ,

});


export default class SoundTestView extends Component{

	constructor(props) {
		super(props);
		this._initState();
	}

	componentDidMount() {
		console.log('compoent did mount');
		this._animFunc();
		if (this.state.currentSound){
			this._playSound();
		}
	}

	_animFunc = ()=> {
		this.state.anim.setValue(0);
		Animated.timing(this.state.anim,{
			toValue: 1,
			duration:10000 ,
			easing:Easing.linear,
			// easing:Easing.bounce ,
		}).start(()=>{this._animFunc()})
	};

	componentDidUpdate() {
		console.log('component did update ,anim.value is');
		if(this.state.currentSound){
			this._playSound();
		}
	}
	_playSound = () => {
		this.state.currentSound.play((finish)=>{
			if(finish)
			{
				console.log('the music goes to the end ');
				this.state.currentSound.release();
			}

		})
	};
	_pauseSound = ()=>{
		this.state.currentSound.pause(()=>{
			console.log('the music now pause');
		})
	};
	_musicVolumn(value:number){
		console.log('the current Volumn is at ' + value);
		this.state.currentSound.setVolume(value);
	}

	_playPreviousMusic(){
		console.log('play the previous music');
		this._initState();
		if (musicIndex > 0){
			musicIndex -- ;
		}else {
			musicIndex = musicList.length - 1 ;
		}
		this.setState({
			currentSound:new Sound(musicList[musicIndex] ,Sound.MAIN_BUNDLE ,(err)=>{
				if (err){
					throw 'get file err :' + err.message;
				}
			}) ,

		})
	}
	_playNextMusic(){
		this._initState();
		if (musicIndex > musicList.length - 1)
		{
			musicIndex = 0 ;
		}
		else {
			musicIndex= musicIndex + 1;
		}
		this.setState({
			currentSound:new Sound(musicList[musicIndex] ,'' ,(err) =>{
				if (err){
					throw 'get file err :' + err.message;
				}
			})

		});
		console.log('play the next music');
	}
	_showMusicList(){
		console.log('show the list');
	}


	render(){
		const {currentSound} = this.state;
		const {musicPause} = this.state ;
		const  {musicVolumn} =  this.state;
		const {musicMuted} = this.state;
		const {listShow} = this.state;

		return <View style={styles.container}>

			<View style={styles.cdPan}>
				<TouchableOpacity onPress={()=>
				{
					this.setState({
						musicPictureShow: !this.state.musicPictureShow,
						// anim: this.state.musicPictureShow ? (new Animated.Value(0)) : this.state.anim,
					});
				}
				}>
				{this.state.musicPictureShow?this._pictureView():this._lyricView()}
				</TouchableOpacity>
			</View>
			<View style={styles.ctrContainer}>
				<TouchableOpacity onPress={this._playPreviousMusic.bind(this)}>
					<View style={styles.ctrItemContainer}>
						<Text style={styles.musicCtrBtn}> previous </Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{
					musicPause?this._playSound():this._pauseSound();
					this.setState({
						musicPause:!musicPause ,
					})
				}
				}>
					<View style={styles.ctrItemContainer}>
						<Text style={styles.musicCtrBtn}> {musicPause?'pausing':'playing'} </Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this._playNextMusic.bind(this)}>
					<View style={styles.ctrItemContainer}>
						<Text style={styles.musicCtrBtn}> next </Text>
					</View>

				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{
					if (musicMuted){
						this.setState({
							musicMuted:!musicMuted ,
							musicVolumn:1 ,
						}) ;
					}
					else {
						this.setState({
							musicMuted:!musicMuted ,
							musicVolumn: 0 ,
						});
					}
					this._musicVolumn(musicVolumn);
				}}>
					<View style={styles.ctrItemContainer}>
						<Text style={styles.musicCtrBtn}> {musicMuted?'voice muted':'voice'} </Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{
					listShow? this.setState({
							listShow:!listShow ,
						}) : this.setState({
						listShow:!listShow ,
					})
				}}>
					<View style={styles.ctrItemContainer}>
						<Text style={styles.musicCtrBtn}> {listShow?'list show':'list hide'} </Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.musicList}>
				{musicList.map((value)=>{
					return (<View style={styles.listItemContainer}>
						<Text style={styles.listItemtext}>{value}</Text>
					</View>);
				})}
			</View>
		</View>
	}
	_pictureView = ()=>{
		return (<Animated.Image source={require('../resource/images/William Joseph - Radioactive.png')} style={
			[styles.musicImage ,
				{
					transform:[
						{
							rotate:this.state.anim.interpolate({
								inputRange:[0 ,1],outputRange:['0deg','360deg']
							})
						}]
				}
			]
		} resizeMode='cover' ></Animated.Image>)
	};
	_lyricView = ()=>{
		return(<View style={styles.lyricContainer}>
			{lyric.split('\n').map((value)=>{
				return <Text style={styles.lyricText}>
					{value}
				</Text>
			})}
		</View>)
	};

	_initState = ()=> {
		this.state = {
			musicPictureShow:true ,
			anim:new Animated.Value(0) ,
			currentSound:new Sound(require('../resource/musics/WilliamJoseph-Radioactive.mp3'),
				(err)=>{
					if (err)
						throw 'get file error';
					console.log('get file success');
				}) ,
			musicPause:false ,
			musicVolumn: 1 ,
			musicMuted: false ,
			listShow:true ,
		}
	}

}
