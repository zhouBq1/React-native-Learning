/**
 * Created by zhoubao on 2017/7/18.
 */
import {
	AsyncStorage ,
} from 'react-native';
import Storage from 'react-native-storage';
import  SYNC from './SYNC'

//Storage options

const RN_STORAGE_SIZE = 1000;
const RN_STORAGE_DEFAULT_EXPIRES = 1000 * 60 * 60 * 24;


//	outter functions
//定义为static则只能通过类来进行访问，而不能在非静态方法中使用this访问，
 class RN_Storage{
	static _getStorage(){
		if (rnStorage == null || rnStorage == undefined)
		{
			rnStorage = Storage({
				//最大容量 ，默认1000 跳循环进行访问、
				size:RN_STORAGE_SIZE ,
				//// 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
				// 如果不指定则数据只会保存在内存中，重启后即丢失
				storageBackend:AsyncStorage ,
				//设置数据默认过期时间， 默认为一天，设置为null则永不过期
				defaultExpires:RN_STORAGE_DEFAULT_EXPIRES ,
				//读写在内存中缓存使用，默认开启
				enableCache:true ,

				// 如果storage中没有相应数据，或数据已过期，
				// 则会调用相应的sync方法，无缝返回最新数据。
				// sync方法的具体说明会在后文提到
				// 你可以在构造函数这里就写好sync的方法
				// 或是写到另一个文件里，这里require引入
				// 或是在任何时候，直接对storage.sync进行赋值修改
				sync: SYNC  // 这个sync文件是要你自己写的
			});
		}
		return rnStorage;
	}

	static _save3(key ,value ,expire){
		this._isInited();
		rnStorage.save({
			key:key ,
			data:value ,
			expires:expire ,
		})
	}

	static _save(key ,value){
		this._save3(key ,value ,null);
	}

	static _remove(key){
		this._isInited();
		rnStorage.remove({
			key:key ,
		})
	}
	//清除所有数据
	static _removeAll(){
		this._isInited();
		rnStorage.clearMap();
	}
	//清除键下的所有数据。
	static _clearDataByKey(key){
		this._isInited();
		rnStorage.clearMapForKey(key);
	}

	/**
	 查询数据
	 */

	static _load(key,callBack){
		this._load3(key,null,null,callBack);
	}


	static _load3(key,params,someFlag,callBack){

		this._isInited();
		rnStorage.load({
			key: key,
			// autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
			autoSync: true,
			// syncInBackground(默认为true)意味着如果数据过期，
			// 在调用sync方法的同时先返回已经过期的数据。
			// 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
			syncInBackground: true,

			// 你还可以给sync方法传递额外的参数
			syncParams:{ params,
				someFlag: someFlag,
			},
		}).then(ret => {

			callBack(ret);
			return ret;
		}).catch(err => {
			//如果没有找到数据且没有sync方法，
			//或者有其他异常，则在catch中返回
			console.warn(err.message);
			switch (err.name) {
				case 'NotFoundError':
					// TODO;
					break;
				case 'ExpiredError':
					// TODO
					break;
			}
		});
	}

	static _isInited(){
		if (rnStorage == null || rnStorage == undefined)
		{
			throw 'need to call _getStorage to initialize and do some cofigure';
		}
	}
}


global.rnStorage = new RN_Storage() ;
 module.exports = RN_Storage;