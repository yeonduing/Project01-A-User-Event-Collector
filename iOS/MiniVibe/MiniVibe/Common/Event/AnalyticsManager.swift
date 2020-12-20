//
//  AnalyticsManager.swift
//  TodoApp
//
//  Created by 강병민 on 2020/12/06.
//

import Foundation

class AnalyticsManager {
    private var currentEngine: AnalyticsPostEngine?
    private let serverEngine: AnalyticsPostEngine?
    private let backupEngine: AnalyticsEngine?
    private let alertEngine: AnalyticsPostEngine?
    
    init(serverEngine: AnalyticsPostEngine?,
         backupEngine: AnalyticsEngine?,
         alertEngine: AnalyticsPostEngine?) {
        self.serverEngine = serverEngine
        self.backupEngine = backupEngine
        self.alertEngine = alertEngine
        try? addReachabilityObserver()
        setupEngine()
    }
    
    deinit {
        removeReachabilityObserver()
    }
    
    private func setupEngine() {
        currentEngine = backupEngine
    }
    
    func log<T: AnalyticsEvent>(_ event: T) {
        guard let currentEngine = currentEngine else { return }
        currentEngine.send(event)
        alertEngine?.send(event)
    }
    
    private func switchToServerEngine() {
        if currentEngine !== serverEngine {
            currentEngine = serverEngine
            guard let events = backupEngine?.fetch() else { return }
            events.forEach {
                currentEngine?.send($0)
            }
        }
    }
    
    private func switchToBackupEngine() {
        if currentEngine !== backupEngine {
            currentEngine = backupEngine
        }
    }
    
}

extension AnalyticsManager: ReachabilityObserverDelegate {
    
    internal func reachabilityChanged(_ isReachable: Bool) {
        if isReachable {
            switchToServerEngine()
        } else {
            switchToBackupEngine()
        }
    }
    
}
