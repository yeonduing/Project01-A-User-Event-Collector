//
//  PlayerControlView.swift
//  MiniVibe
//
//  Created by 강병민 on 2020/12/07.
//

import SwiftUI

struct PlayerControlView: View {
    @ObservedObject var viewModel: PlayerViewModel
    @State var isFavorite = false
    var didPressQueueButton: (() -> Void)?
    
    var body: some View {
        VStack { [weak viewModel = self.viewModel] in
            if let viewModel = viewModel {
                HStack {
                    ToggleableImage(isEnabled: $viewModel.isRepeat,
                                    imageWhenTrue: "repeat", colorWhenTrue: .red,
                                    imageWhenFalse: "repeat", colorWhenFalse: .gray,
                                    size: .medium)
                        .accessibility(identifier: "Repeat")
                    Spacer()
                    ToggleableImage(isEnabled: .constant(true),
                                    imageWhenTrue: "paperplane", colorWhenTrue: .gray,
                                    imageWhenFalse: "paperplane", colorWhenFalse: .gray, size: .large) {
                        viewModel.manager.log(PlayerEvent.sendTouched)
                    }
                    Spacer()
                    ToggleableImage(isEnabled: $viewModel.isPlaying,
                                    imageWhenTrue: "pause", colorWhenTrue: .gray,
                                    imageWhenFalse: "play", colorWhenFalse: .gray,
                                    size: .large)
                        .accessibility(identifier: "PauseOrPlay")
                        .accentColor(.primary)
                    Spacer()
                    ToggleableImage(isEnabled: $viewModel.isFavorite,
                                    imageWhenTrue: "heart.fill", colorWhenTrue: .red,
                                    imageWhenFalse: "heart", colorWhenFalse: .red,
                                    size: .large) {
                        viewModel.manager.log(PlayerEvent.isFavorite(viewModel.isFavorite,
                                                                     trackID: viewModel.currentTrack?.id ?? 0))
                    }
                    .accessibility(identifier: "Heart")
                    .accentColor(.red)
                    Spacer()
                    ToggleableImage(isEnabled: $viewModel.isShuffle,
                                    imageWhenTrue: "shuffle", colorWhenTrue: .red,
                                    imageWhenFalse: "shuffle", colorWhenFalse: .gray,
                                    size: .medium)
                        .accessibility(identifier: "Shuffle")
                }
                .padding(.vertical, 10)
                HStack(alignment: .bottom) {
                    Button(action: { [weak viewModel = self.viewModel] in
                        viewModel?.manager.log(PlayerEvent.airPlayTouched)
                    }, label: {
                        Image(systemName: "airplayaudio")
                            .accesoryModifier(color: .gray, size: .medium)
                    })
                    
                    Spacer()
                    Text("미리듣기 중")
                        .foregroundColor(.red)
                    Spacer()
                    Button(action: { [weak viewModel = self.viewModel] in
                        didPressQueueButton?()
                        viewModel?.manager.log(PlayerEvent.queuelistTouched)
                    }, label: {
                        Image(systemName: "music.note.list")
                            .accesoryModifier(color: .gray, size: .medium)
                    })
                }
                .padding(.top, 20)
                .padding(.bottom, 10)
            }
        }
    }
    
}
