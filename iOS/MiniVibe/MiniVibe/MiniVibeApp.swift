//
//  MiniVibeApp.swift
//  MiniVibe
//
//  Created by 류연수 on 2020/11/20.
//

import SwiftUI

@main
struct MiniVibeApp: App {
    
    let manager = AnalyticsManager(engine: MockAnalyticsEngine())

    var body: some Scene {
        WindowGroup {
            CustomTabView(manager: manager)
        }
    }
}