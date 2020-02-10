//
//  NotificationScheduler.swift
//  ScheduledNotifications
//
//  Created by Muhammad Ali on 10/02/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation

@objc(NotificationScheduler)
class NotificationSchedular: NSObject {
  
  @objc
  func scheduleNotification(_ uuid: String, message: String, datetime: NSNumber) -> Void {
    print("@RNSN -> Schedule Notification: ", message, uuid, datetime)
  }
  
  @objc
  func removeNotification(_ uuid: String) -> Void {
    print("@RNSN -> Remove notification with ID: ", uuid)
  }
}
