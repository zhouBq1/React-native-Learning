//
//  EventEmitterManager.h
//  untitled2
//
//  Created by zhouBao on 2017/7/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTEventEmitter.h>

@interface EventEmitterManager : RCTEventEmitter<RCTBridgeModule>
-(void) emitterEvent;
@end
