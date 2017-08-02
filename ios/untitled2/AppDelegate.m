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
#import "TestManager.h"
#import "EventEmitterManager.h"
#import <MapKit/MapKit.h>

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
  
  NSURL *jsCodeLocation;
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  jsCodeLocation = [NSURL URLWithString:@"http://192.168.0.177:8081/index.ios.bundle?plateform=ios"];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"untitled2"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
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
