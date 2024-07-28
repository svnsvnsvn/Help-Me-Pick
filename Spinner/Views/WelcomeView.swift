//  WelcomeView.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/12/24.
//

import SwiftUI

struct WelcomeView: View {
    var body: some View {
        NavigationStack {
            VStack {
                Text("Welcome to Spinnie!")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundStyle(.gray)
                    .fontDesign(.serif)
                    .padding()
                NavigationLink(destination: MainView(viewModel: WheelSectorViewModel())) {
                    Image(systemName: "heart.fill")
                        .resizable()
                        .foregroundStyle(Color(#colorLiteral(red: 1, green: 0.8511019349, blue: 1, alpha: 1)))
                        .frame(width: 300, height: 300, alignment: .center)
                        .overlay(
                            Text("Get Started...")
                                .bold()
                                .fontDesign(.serif)
                                .foregroundStyle(.gray)
                        )
                }
                
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(#colorLiteral(red: 0.9764741063, green: 0.9568442702, blue: 0.9490130544, alpha: 1)))
        }
    }
}

struct ListView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            WelcomeView()
        }
    }
}

#Preview {
    WelcomeView()
}
