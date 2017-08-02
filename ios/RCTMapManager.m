//
//  ViewManager.m
//  untitled2
//
//  Created by zhouBao on 2017/8/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RCTMapManager.h"
#import <MapKit/MapKit.h>

@interface RCTMapManager()<MKMapViewDelegate>
@property (nonatomic ,strong) MKMapView * mpView;
@end
@implementation RCTMapManager
RCT_EXPORT_MODULE() ;

-(UIView *) view
{
  return self.mpView;
}

-(MKMapView *) mpView
{
  if (!_mpView) {
    _mpView = [[MKMapView alloc] init];
    _mpView.delegate = self;
    _mpView.mapType = MKMapTypeStandard;
  }
  return _mpView;
}

#pragma mark ----MKMapViewDelegate
#pragma mark ----

@end
