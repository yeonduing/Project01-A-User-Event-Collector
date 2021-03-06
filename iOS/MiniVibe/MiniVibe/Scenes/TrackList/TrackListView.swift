//
//  TrackListView.swift
//  DemoTrackView
//
//  Created by 강병민 on 2020/11/22.
//

import SwiftUI

struct TrackListView: View {
    @EnvironmentObject var nowPlayingViewModel: PlayerViewModel
    private let layout = [GridItem(.flexible())]
    private let tracks: [Track]
    
    init(tracks: [Track]) {
        self.tracks = tracks
    }
    
    var body: some View {
        let headerView = TrackListButtonView(
            didPressPlayButton: { [weak nowPlayingViewModel = self.nowPlayingViewModel] in
                nowPlayingViewModel?.update(with: tracks)
            },
            didPressShuffleButton: { [weak nowPlayingViewModel = self.nowPlayingViewModel] in
                nowPlayingViewModel?.update(with: tracks, isShuffled: true)
            }
        )
        Section(header: headerView) {
            LazyVGrid(columns: layout) {
                ForEach(tracks) { track -> TrackCellView in
                    TrackCellView(hasHeartAccessory: true, track: track)
                }
                Rectangle()
                    .clearBottom()
            }
        }
    }
}
