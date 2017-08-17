/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AVFoundation/AVFoundation.h>
#import <MapKit/MapKit.h>
#import "TestManager.h"
#import "EventEmitterManager.h"


#import "RCTDelegateObj.h"




@interface AppDelegate ()<MKMapViewDelegate>
@property (nonatomic ,strong) MKMapView * mpView;
@end
@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  _mpView = [[MKMapView alloc] initWithFrame:CGRectMake(0, 0, 300, 300)];
  _mpView.delegate = self;
  _mpView.mapType = MKMapTypeStandard;


  AVAudioSession *audioSession = [AVAudioSession sharedInstance];
  NSError *setCategoryError = nil;
  BOOL success = [audioSession setCategory:AVAudioSessionCategoryPlayback error:&setCategoryError];
  if (!success) {
    NSLog(@"the audio session setting error :%@" ,setCategoryError);
  }
  
//  使用bridge来进行RNViewController的初始化，用于RN与源生项目的整合，节约RN代码带来的开支 ,项目中所有的js代码在同一个bridge上进行交互，rctRootView=初始化时候， 并不需要进行额外的开销
 
  RCTDelegateObj * RctDelObj = [RCTDelegateObj new];
  RCTBridge * bridge = [[RCTBridge alloc] initWithDelegate:RctDelObj launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"untitled2" initialProperties:nil];
  
//  NSURL *jsCodeLocation;
//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.0.177:8081/index.ios.bundle?plateform=ios"];
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                      moduleName:@"untitled2"
//                                               initialProperties:nil
//                                                   launchOptions:launchOptions];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  
  _mpView = [[MKMapView alloc] initWithFrame:CGRectMake(0, 0, 300, 300)];
  _mpView.delegate = self;
  _mpView.mapType = MKMapTypeStandard;
  _mpView.backgroundColor = [UIColor grayColor];

  
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
//  EventEmitterManager * evtMgr = [[EventEmitterManager alloc] init];
//  [evtMgr emitterEvent];
  
  return YES;
}

@end
