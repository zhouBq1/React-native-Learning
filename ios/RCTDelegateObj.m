//
//  RCTDelegateObj.m
//  untitled2
//
//  Created by zhouBao on 2017/8/9.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTDelegateObj.h"

@implementation RCTDelegateObj

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  NSURL *jsCodeLocation;
  jsCodeLocation = [NSURL URLWithString:@"http://192.168.0.177:8081/index.ios.bundle?plateform=ios"];

  return jsCodeLocation;
}

@end
