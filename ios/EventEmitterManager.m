//
//  EventEmitterManager.m
//  untitled2
//
//  Created by zhouBao on 2017/7/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "EventEmitterManager.h"
#import <React/RCTLog.h>
#define EMITTER_FUNC_NAME @"subscrib_func"

@implementation EventEmitterManager

RCT_EXPORT_MODULE();
#pragma mark ---注意
#pragma mark --- EventEmitterManager不能使用alloc init方法来进行初始化，会报错：bridge not set，需要实现addobserver等方法来实现实例方法的添加 ，但是可以调用类方法 ，来进行相应的操作。
- (void)startObserving{
  RCTLog(@"the function :%s" , __func__);
  [self emitterEvent];
}
- (void)stopObserving{
  RCTLog(@"the function : %s" ,__func__);
}

- (void)addListener:(NSString *)eventName
{
  RCTLog(@"the function : %s" ,__func__);
}
- (void)removeListeners:(NSInteger)count
{
  RCTLog(@"the function : %s" ,__func__);
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[EMITTER_FUNC_NAME];
}

-(void) emitterEvent
{
  [self sendEventWithName:EMITTER_FUNC_NAME body:@{@"testKey":@"testValue"}];
}

@end
