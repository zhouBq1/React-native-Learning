//
//  TestManager.m
//  untitled2
//
//  Created by zhouBao on 2017/7/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "TestManager.h"


@implementation TestManager
//导出组件
RCT_EXPORT_MODULE();
//导出方法
/**
 当我们写RCT_EXPORT_METHOD()宏的时候，写导出给JS的函数的时候，如果参数中含有successcallback，errorcallback，切记把这种callback block放在最后，千万不要，把其他类型的参数放在block之后。
 
 原因是在JS代码一侧有last arg，second arg的判断，当callbackblock 不是以倒数第二第一的位置出现的时候，JS会报exception
 */
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSDictionary *)testDic)
{
//  NSLog(@"the rct_export_method : name is ->%@ ,location is -> %@" ,name ,location);
  //从js中桥接过来的结果用于本地端的ui输入。
  RCTLog(@"the test Dic original form is %@" ,testDic);
//  NSString *loc_in_dic = [RCTConvert NSString:testDic[@"location"]];
//  NSInteger pro_in_dic = [[RCTConvert NSNumber:testDic[@"property"]] integerValue];
//  RCTLog(@"the rct_export_method : name is ->%@ ,location is -> %@ ,test properyt -> %ld" ,name ,loc_in_dic ,pro_in_dic);
  NSArray * testDicKeys = [testDic allKeys];
  for (id key  in testDicKeys) {
    RCTLog(@"the testDic key and value pair : %@->%@" ,key ,testDic[key]);
  }
}
// block 参数
RCT_EXPORT_METHOD(addBlockEvent:(RCTResponseSenderBlock)block){
  RCTLog(@"now you are in the block of ios");
  NSArray * events = @[@"sdf" ,@"sdf" ,@"fdf"];
//  NSError * err = [NSError errorWithDomain:@"testError Domain" code:20 userInfo:@{@"usrInfo1":@"value1"}];
  block(@[[NSNull null] ,events]);
}
////promise 类型参数
#pragma mark ---注意
#pragma mark 不能同时调用resolve 和 reject 函数， 否则js模块出错， 显示已经注册 ，不能重复注册callback方法。
RCT_REMAP_METHOD(addPromiseFun,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  
  NSArray * events = @[@"promiseEVT1" ,@"promiseEVT2" ,@"promiseEVT3"];
  if (events) {
    [NSThread sleepForTimeInterval:10];
    resolve(events);
  }
  else
  {
    NSError * err = [NSError errorWithDomain:@"the promise error domain" code:20 userInfo:@{@"promiseErrKey":@"value1"}];
    reject(@"200" ,@"promise reject message" ,err);
  }
  RCTLog(@"do the find Event");
}

- (NSDictionary<NSString *, id> *)constantsToExport
{
  return @{@"testExportedConstant":@"constToExport"};
}

@end
