//  InputView.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/13/24.
//

import SwiftUI

struct InputView: View {
    @ObservedObject var viewModel: WheelSectorViewModel // ViewModel instance
    var inputRadius: CGFloat = 25

    var body: some View {
        VStack(spacing: 10) {
            Spacer()
            Image(systemName: "chevron.up")
            Text("Entered items")
                .foregroundStyle(.pink)
            List {
                ForEach(viewModel.segments, id: \.label) { label in
                    InputListRowView(item: label)
                }
                .onDelete(perform: viewModel.deleteItem)
            }
            .listStyle(.plain)
        }
        .frame(maxWidth: .infinity)
        .background(Color(#colorLiteral(red: 0.9764741063, green: 0.9568442702, blue: 0.9490130544, alpha: 0.7636589404)))
        .cornerRadius(inputRadius)
    }
}

struct InputView_Previews: PreviewProvider {
    static var previews: some View {
        let viewModel = WheelSectorViewModel(label: "you're awesome")
        InputView(viewModel: viewModel)
    }
}
