//
//  ThumbnailListView.swift
//  MiniVibe
//
//  Created by 류연수 on 2020/11/25.
//

import SwiftUI

struct ThumbnailListView: View {
    
    @StateObject private var viewModel = ThumbnailListViewModel()
    
    private let router: ThumbnailRouter
    private let layout = [GridItem(.flexible())]
    
    init(router: ThumbnailRouter) {
        self.router = router
    }
    
    var body: some View {
        guard let title = router.title() else { return AnyView(ErrorView()) }
        
        return AnyView(
            ScrollView(showsIndicators: false) { [weak viewModel = self.viewModel,
                                                  weak router = self.router] in
                if let viewModel = viewModel,
                   let router = router {
                    LazyVGrid(columns: layout) {
                        ForEach(viewModel.thumbnails, id: \.id) { thumbnail in
                            MemorySafeNavigationLink(
                                contentView: ThumbnailCellView(thumbnail: thumbnail),
                                destination: router.getDestination(id: thumbnail.id)
                            )
                        }
                        Rectangle()
                            .clearBottom()
                    }
                    .modifier(NavigationBarStyle(title: title))
                    .onAppear {
                        viewModel.fetch(type: router.routingStarter)
                    }
                }
            }
            .padding()
        )
    }
}
