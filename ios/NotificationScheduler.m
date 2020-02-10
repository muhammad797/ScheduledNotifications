//
//  NotificationScheduler.m
//  ScheduledNotifications
//
//  Created by Muhammad Ali on 10/02/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(NotificationScheduler, NSObject)

RCT_EXTERN_METHOD(scheduleNotification:(NSString *)uuid message:(NSString *)message datetime:(nonnull NSNumber *)datetime)

RCT_EXTERN_METHOD(removeNotification:(NSString *)uuid)

@end
