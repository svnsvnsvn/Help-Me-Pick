//
//  itemView.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/13/24.
//

import SwiftUI

struct InputListRowView: View {
    
    let item: PieSegment
    
    var body: some View {
        HStack{
            Image(systemName: "heart")
                .foregroundColor(.red)
                .padding(6)
            Text(item.label)
            Spacer()
        }
        .font(.title3)
        .fontDesign(.serif)
        .padding(.vertical, 3)
    }
}

struct InputListRowView_Previews: PreviewProvider {
    static var item1 = PieSegment(color: .blue, label: "This is a choice")
    
    static var previews: some View
    {
       
        InputListRowView(item: item1)

    }
}
